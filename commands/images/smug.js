const { SlashCommandBuilder } = require('@discordjs/builders');
const superagent = require('superagent');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('smug')
        .setDescription('Smug image'),

    async execute(interaction) {

        try {

            const { body } = await superagent.get("https://nekos.life/api/v2/img/smug");

            const smug_embed = {
                color: 0x21C180,
                description: `:slight_smile: **${interaction.user.username}** smugs`,
                image: {url: body.url},
                timestamp: new Date()
            };

            await interaction.reply({ embeds: [smug_embed] });

        }catch(e){

            console.error(e);

        }

    },

};
