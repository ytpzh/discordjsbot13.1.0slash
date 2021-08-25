# Discord.JS 13.1.0 Bot (Slash Commands)
This is a Demo Bot of Discord JS v13.1.0 . You can adjust or edit the bot as you want.

### Prerequisites
Install [Node v16 (or newer)](https://nodejs.org/en/) and [Git](https://git-scm.com/download/)

### Installation
1. Clone the repo with git
```bash
git clone https://github.com/ytpzh/discordjsbot13.1.0slash
```

2. Go to the repo
```bash
cd discordjsbot13.1.0slash
```
3. Init npm
```bash
npm init
```

4. Install discord.js
```bash
npm i discord.js@latest
```

5. Install modules for discord.js
```bash
npm i @discordjs/builders @discordjs/rest discord-api-types fs superagent
```
6. (Optional) Install pm2 module
```bash
npm i -g pm2
```

### Start the bot
1. Edit the `config.json` file on the `config` folder with your informations.
```JSON
{
  "token":"ENTER YOUR BOT TOKEN HERE",
  "guild_id":"ENTER YOUR GUILD ID HERE",
  "client_id":"ENTER THE CLIENT ID HERE"
}
```
2. To reload or deploy slash commands, run the file `commands.js`.
```JS
node commands
```
3. Run the bot on a command prompt with pm2
```bash
pm2 start index.js
```
Or, if you don't have the pm2 module, run the `index.js` file with node directly.
```bash
node index
```

## FREQUENT QUESTIONS

#### - My slash commands don't appear on Discord...
> Just run the `commands.js` file, and retry.
> Check for any errors in your command files.

## Your problem is not listed ?
> Just contact me on Discord: **PZH#0666** , or send me a mail at contact@pzh.fr
