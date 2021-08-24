const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config/config');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

client.once('ready', () => { console.log('Connected !') });

const cmd_folders= fs.readdirSync('./commands');
for (const f of cmd_folders) {

    const cmd_files = fs.readdirSync(`./commands/${f}`).filter(file => file.endsWith('.js'));

    for (const file of cmd_files) {

        const cmd = require(`./commands/${f}/${file}`);
        client.commands.set(cmd.data.name, cmd);

    }

}

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    try {

        await cmd.execute(interaction);

    } catch(e) {

        console.error(e);
        await interaction.reply({ content: 'Oops ! Something went wrong.', ephemeral: true });

    }

});


client.login(token);
