const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user !')
        .addStringOption(option => option.setName('user').setDescription('Enter the ID / Username / Tag of user to unban.').setRequired(true)),

    async execute(interaction) {

        const user = interaction.options.getString('user');
        const bans = await interaction.guild.bans.fetch();

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `You don't have the permission \`ADMINISTRATOR\` to do this command.`, ephemeral: true});

        const user_ban = bans.find(u => u.user.tag === user || u.user.id === user || u.user.username === user);

        if(!user_ban) return interaction.reply({content: `Unknown user / User is not banned.`, ephemeral: true});

        let display_user = user_ban.user.tag || "Some user";

        await interaction.guild.bans.remove(user_ban.user.id);
        await interaction.reply(`Successfully unbanned **${display_user}**.`);

    }

};
