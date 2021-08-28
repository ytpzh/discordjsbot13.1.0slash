const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('Play Rock Paper Scissors !')
        .addStringOption(option =>
        option.setName('choice')
            .setDescription('Choose Paper, Rock or Scissors.')
            .setRequired(true)
            .addChoice('Rock', '🪨')
            .addChoice('Paper', '📄')
            .addChoice('Scissors', `✂️`)),

    async execute(interaction) {

        let rep = ['🪨','📄','✂️'];
     /* rep[0] = 🪨 (rock)
        rep[1] = 📄 (paper)
        rep[2] = ✂️(scissors) */
        let result = Math.floor(Math.random() * rep.length);
        const choice = interaction.options.getString('choice');

        if (rep[result] === choice) {

            await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**Equality** !`);

        } else if (rep[result] === rep[0]) {

            if (choice === rep[1]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You won**...`);

            }

            if (choice === rep[2]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You lose** !`);

            }

        } else if (rep[result] === rep[1]) {

            if (choice === rep[2]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You won** !`);

            }

            if (choice === rep[0]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You lose**...`);

            }

        } else if (rep[result] === rep[2]) {

            if (choice === rep[1]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You lose** !`);

            }

            if (choice === rep[0]) {

                await interaction.reply(`Me: ${rep[result]}\nYou: ${choice}\n**You won** !`);

            }

        }


    },
};
