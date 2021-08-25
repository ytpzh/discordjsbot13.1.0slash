const { SlashCommandBuilder } = require('@discordjs/builders');
const superagent = require('superagent');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a user')
        .addUserOption(option => option.setName('user').setDescription('User to slap').setRequired(true)),

    async execute(interaction) {

        try {

            const { body } = await superagent.get("https://nekos.life/api/v2/img/slap");

            const slap_embed = {
                color: 0x21C180,
                description: `:hand_splayed: **${interaction.user.username}** slaps **${interaction.options.getMember('user').user.username}**`,
                image: {url: body.url},
                timestamp: new Date()
            };

            await interaction.reply({ embeds: [slap_embed] });

        }catch(e){

            console.error(e);

        }

    },

};
