const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user !')
        .addUserOption(option => option.setName('user').setDescription('The user').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Set a reason')),

    async execute(interaction) {

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if(!user) return interaction.reply({content: `Can't find this user.`, ephemeral: true});

        const userRoleRawPos = user.roles.highest.rawPosition;
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition;

        if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({content: `You don't have the permission \`KICK_MEMBERS\` to do this command.`, ephemeral: true});

        if(user.user.id === interaction.user.id) return interaction.reply({content: `You can't kick yourself !`, ephemeral: true});

        if(userRoleRawPos >= memberRoleRawPos) return interaction.reply({content: `You can't kick this user.`, ephemeral: true});

        if(!user.kickable) return interaction.reply({content: `This user can't be kicked. It is either because they are a moderator/admin, or their role is higher than the bot role.`, ephemeral: true});

        await user.kick();
        await interaction.reply(`Successfully kicked **${user.user.username}** (${user.user.id}) for the reason: **${reason !== null ? `${reason}` : 'No reason specified'}**`);
      
    }
  
};
