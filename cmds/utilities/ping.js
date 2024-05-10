const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns \'Pong\', and the latency'),
    async execute(interaction) {
        await interaction.reply('Pong! The latency is ' + (Date.now() - interaction.createdTimestamp) + 'ms');
    },
}