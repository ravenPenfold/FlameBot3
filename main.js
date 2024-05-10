/*
                Flame Discord Bot Version 3
                by Ryan Penfold

                (c) 2024 Ryan Penfold | Flame Branding (c) 2019 - 2024 Ryan Penfold

                Licensed under the Apache 2.0
*/

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js'); // Install the Discord.JS Plugin

const { token } = require('./config.json'); // the Config.json holds all needed configuration - THIS SHOULD NOT BE DISTRIBUTED!!!

const fs = require('node:fs');
const path = require('node:path');

// Let's create a new client instance

const client = new Client({intents: [GatewayIntentBits.Guilds]});

// When client is ready, run the following code (But only once)

client.once(Events.ClientReady, readyClient => {
    console.log('Flame 3 has logged in as ${readyClient.user.tag}, and is ready. Programmed by Ryan Penfold');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'cmds');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
            console.log("Added command '" + command.data.name + "'")
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Login to Discord
client.login(token);