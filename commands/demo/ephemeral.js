const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('ephemeral')
        .setDescription('Ephemeral command'),
    
    async execute(interaction) {
        
        await interaction.reply({content: 'Only you can see this message ! :\)', ephemeral: true});
        
    },
    
};
