/*
!!!!!!

RUN THIS FILE ONLY WHEN YOU HAVE TO RELOAD OR DEPLOY NEW COMMANDS TO YOUR BOT

!!!!!!

*/

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { client_id, guild_id, token } = require('./config/config.json');

const cmds = [];
const cmd_folders = fs.readdirSync('./commands');

for (const f of cmd_folders) {

    const cmd_files = fs.readdirSync(`./commands/${f}`).filter(file => file.endsWith('.js'));

    for (const file of cmd_files) {
        const cmd = require(`./commands/${f}/${file}`);
        cmds.push(cmd.data.toJSON());
    }

}

const rest = new REST({ version: '9' }).setToken(token);
(async () => {

    try {

        await rest.put(
            Routes.applicationGuildCommands(client_id, guild_id),
            /*
            By default, the slash commands are in Guild mode. 
            To have the global slash commands, just replace
            " Routes.applicationGuildCommands(client_id, guild_id), " by
            " Routes.applicationCommands(client_id) "
            */
            { body: cmds },
        );

        console.log('Slash commands successfully deployed !');

    } catch (e) {

        console.error(e);
    }

})();
