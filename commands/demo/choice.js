const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('choice')
        .setDescription('Choice command')
        .addStringOption(option =>
        option.setName('choice_reply')
            .setDescription('Choose one of these options')
            .setRequired(true)
            .addChoice('Apple', 'This is an apple :apple')
            .addChoice('Banana', 'This is a banana :banana:')
            .addChoice('Peach', 'This is a peach :peach:')
            .addChoice('PZH', `PZH ??? That's not a fruit, but my creator ! :star_struck:`)),
    
    async execute(interaction) {
        
        await interaction.reply(interaction.options.getString('choice_reply'));
        
    },
    
};
