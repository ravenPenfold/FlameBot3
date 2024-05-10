const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .addStringOption(option =>
            option.setName('question')
            .setDescription('What would you like to ask the 8-Ball?')
            .setRequired(true))
        .setDescription('Randomly generates a response based off your prompt'),
    async execute(interaction) {
        var awns = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply Hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no',
            'Outlook not so good.',
            'Very doubtful.',
            'No.',
            ];
        await interaction.reply(awns[Math.floor(Math.random() * 21 + 1)]);
    },
}