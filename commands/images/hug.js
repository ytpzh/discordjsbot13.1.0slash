const { SlashCommandBuilder } = require('@discordjs/builders');
const superagent = require('superagent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug a user')
        .addUserOption(option => option.setName('user').setDescription('User to hug').setRequired(true)),

    async execute(interaction) {

        try {

            const { body } = await superagent.get("https://nekos.life/api/v2/img/cuddle");

            const hug_embed = {
                color: 0x21C180,
                description: `:kissing_smiling_eyes: **${interaction.user.username}** hugs **${interaction.options.getMember('user').user.username}**`,
                image: {url: body.url},
                timestamp: new Date()
            };

            await interaction.reply({ embeds: [hug_embed] });

        }catch(e){

            console.error(e);
          
        }
      
    },
  
};
