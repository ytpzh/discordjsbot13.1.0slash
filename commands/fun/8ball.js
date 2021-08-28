const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Play 8ball !')
        .addStringOption(option =>
        option.setName('text')
            .setRequired(true)
            .setDescription('Ask your question')),

    async execute(interaction) {

        let rep = ['Yes.', 'No.', 'Probably.', 'I think not.', 'Certainly.', 'Can you ask again your question please ?', 'Never !', 'Maybe.', 'I\'m sure !'];
        let result = Math.floor(Math.random() * rep.length);

        await interaction.reply(`*${interaction.options.getString('text')}*\nMy answer is: **${rep[result]}**`);
      
    },
  
};
