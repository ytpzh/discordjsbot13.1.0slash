const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const cd = new Set();

module.exports = {

    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('Play Rock Paper Scissors !'),

    async execute(interaction) {

        // Cooldown
        if (cd.has(interaction.user.id)) return interaction.reply({content: `Hey ! You already have a game in progress.`, ephemeral: true});
        cd.add(interaction.user.id);
        setTimeout(() => { cd.delete(interaction.user.id) }, 180000);

        //Button
        const button = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('rock').setStyle('SECONDARY').setEmoji('🪨'),
            new MessageButton().setCustomId('paper').setStyle('SECONDARY').setEmoji('📄'),
            new MessageButton().setCustomId('scissors').setStyle('SECONDARY').setEmoji('✂️'));

        //Collector
        const rps = i => i.user.id === interaction.user.id && i.customId === 'rock' && i.customId === 'paper' && i.customId === 'scissors';
        const collector = interaction.channel.createMessageComponentCollector({ rps, time: 180000 });

        // Infos
        let score_u = 0;
        let score_b = 0;

        let rep = ['rock', 'paper', 'scissors'];
        let repdisplay = {'rock':'🪨','paper':'📄','scissors':'✂️'};

        const embed = {
            color: 0x21C180,
            author:{name:`Rock Paper Scissors`, icon_url: interaction.user.avatarURL()},
            timestamp: new Date()
        };

        embed.description = `Party starts !\nYou have 3 minutes to beat the bot.\nGet 3 points to win.`;
        await interaction.reply({embeds: [embed], components: [button]});

        //Collector event
        collector.on('collect', async i => {

            if (i.user.id === interaction.user.id) {

                let result = Math.floor(Math.random() * rep.length);

                if (rep[result] === i.customId) {

                    embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**Equality !**\n\nScore: **${score_u}**-**${score_b}**`;
                    await i.update({embeds: [embed]});

                } else if (rep[result] === rep[0]) {

                    if (i.customId === rep[1]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You won !**\n\nScore: **${++score_u}**-**${score_b}**`;
                        await i.update({embeds: [embed]});

                    }

                    if (i.customId === rep[2]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You lose...**\n\nScore: **${score_u}**-**${++score_b}**`;
                        await i.update({embeds: [embed]});

                    }

                } else if (rep[result] === rep[1]) {

                    if (i.customId === rep[2]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You won !**\n\nScore: **${++score_u}**-**${score_b}**`;
                        await i.update({embeds: [embed]});

                    }

                    if (i.customId === rep[0]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You lose...**\n\nScore: **${score_u}**-**${++score_b}**`;
                        await i.update({embeds: [embed]});


                    }

                } else if (rep[result] === rep[2]) {

                    if (i.customId === rep[1]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You lose...**\n\nScore: **${score_u}**-**${++score_b}**`;
                        await i.update({embeds: [embed]});

                    }

                    if (i.customId === rep[0]) {

                        embed.description = `Bot chooses: ${repdisplay[rep[result]]}\nYou choose: ${repdisplay[i.customId]}\n**You won !**\n\nScore: **${++score_u}**-**${score_b}**`;
                        await i.update({embeds: [embed]});

                    }

                }

                if (score_u === 3) { collector.stop(); cd.delete(interaction.user.id); }
                if (score_b === 3) { collector.stop(); cd.delete(interaction.user.id); }

            }

        })

        collector.on('end', () => {

            if (score_u+score_b === 0) {

                if ((embed.description).includes("starts")) {

                    embed.description = ':warning: Too late ! Please do `/rockpaperscissors` again.';
                    return interaction.editReply({embeds: [embed], components: []});

                } else {

                    return interaction.editReply({content: '**Game over** !\n\n**__Equality__** !', components: []});

                }

            }

            if (score_u+score_b > 0) {

                if (score_u === score_b) {

                    cd.delete(interaction.user.id);
                    return interaction.editReply({content: '**Game over** !\n\n**__Equality__** !', components: []});
                }

            }

            if (score_u > score_b) {

                cd.delete(interaction.user.id);
                return interaction.editReply({content: `**Game over !\n\n${interaction.user.username}** won ! :trophy:`, components: [] });

            } else {

                cd.delete(interaction.user.id);
                return interaction.editReply({content: `**Game over !\n\nThe bot** won ! :trophy:`, components: [] });

            }

        });

    },

};
