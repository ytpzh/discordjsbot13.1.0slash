const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color')
        .setDescription('Choose your favorite color !')
        .addStringOption(option =>
        option.setName('color')
            .setDescription('choose one of the three colors')
            .setRequired(true)
            .addChoice('Blue', 'Your favorite color is blue ? Me too ! :\D')
            .addChoice('White', 'Your favorite color is white ? Me too ! :\D')
            .addChoice('Red', 'Your favorite color is red ? Me too ! :\D')
            .addChoice('All of these', `All of these colors ?? Look's like the French flag :flag_fr:`)),
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('color'));
    },
};
