const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('integer')
        .setDescription('Integer command')
        .addIntegerOption(option => option.setName('integer').setDescription('Enter an integer')),

    async execute(interaction) {

        let result = interaction.options.getInteger('integer');

        if((result) < 0 || (result) > 5 ) return interaction.reply({content: `Choose a number between 0 and 5.`, ephemeral: true});

        let roll = Math.floor(Math.random() * 6);

        if(roll === result) {
            await interaction.reply(`We choose the same number !! The number **${roll}**`);

        } else {
            await interaction.reply(`We don't choose the same number. :\( You choose **${result}** and me **${roll}**.`);

        };

    },

};
