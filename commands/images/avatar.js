const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display avatar of a user')
        .addUserOption(option => option.setName('user').setDescription('Enter user')),

    async execute(interaction) {

        let user_i = interaction.options.getMember('user') || interaction;
        let avatar = user_i.user.displayAvatarURL({dynamic : true});

        const avatar_embed = {
            color: 0x2c2f33,
            description: `[Link](${avatar}?size=4096)`,
            image: {url: `${avatar}?size=4096`},
            timestamp: new Date()
        };

        await interaction.reply({ embeds: [avatar_embed] });

    },

};
