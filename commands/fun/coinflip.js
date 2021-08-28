const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin to get Heads or Tails !')
        .addStringOption(option =>
        option.setName('choice')
            .setDescription('Choose Heads or Tails (optional)')
            .addChoice('Heads', 'Heads')
            .addChoice('Tails', 'Tails')),

    async execute(interaction) {

        const choice = interaction.options.getString('choice');
        let rep = ['Heads !', 'Tails !'];
        let result = Math.floor(Math.random() * rep.length);

        if (!choice) {

            await interaction.reply(`Outcome: **${rep[result]}**`);

        } else {

            await interaction.reply(`Bet: **${choice}**\nOutcome: **${rep[result]}**`);

        }
      
    },
  
};
