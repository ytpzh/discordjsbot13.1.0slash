const { SlashCommandBuilder } = require('@discordjs/builders');
const superagent = require('superagent');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('poke')
        .setDescription('Poke a user')
        .addUserOption(option => option.setName('user').setDescription('User to poke').setRequired(true)),

    async execute(interaction) {

        try {

            const { body } = await superagent.get("https://nekos.life/api/v2/img/poke");

            const poke_embed = {
                color: 0x21C180,
                description: `:point_right: **${interaction.user.username}** pokes **${interaction.options.getMember('user').user.username}**`,
                image: {url: body.url},
                timestamp: new Date()
            };

            await interaction.reply({ embeds: [poke_embed] });

        }catch(e){

            console.error(e);

        }

    },

};
