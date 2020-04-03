# SQ-Salary

[![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/sq-salary/badge)](https://www.codefactor.io/repository/github/kibotrel/sq-salary) ![GitHub](https://img.shields.io/github/license/kibotrel/SQ-Salary) ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/kibotrel/SQ-Salary?include_prereleases)

This project is a DiscordBot application built using few **node.js** modules ([discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) of course, [better-sqlite3](https://www.npmjs.com/package/better-sqlite3/v/4.1.2), [enmap](https://www.npmjs.com/package/enmap) and [node.js filesystem](https://nodejs.org/api/fs.html#fs_file_system)) meant to simplify dungeon profits splitting between people.

## Install

First clone the repository using:

```shell
$> git clone https://github.com/kibotrel/SQ-Salary.git
$> cd SQ-Salary
```

If you want to host this bot on your own you need an extra file that isn't uploaded here for security purposes : a file named `config.json` in a directory called `private` that stores the **Bot API Token** and some other stuff. You need to fill this file as follow:

```json
{
	"token": "INSERT DISCORD BOT TOKEN HERE",
	"prefix": "!salary",
	"version": "0.0.0"
}
```

How do you get **token**? Fist, follow [this guide](https://discordpy.readthedocs.io/en/latest/discord.html) to create a new Discord application, attach a bot user and add it to a server. Then on [Discord Developer Portal](https://discordapp.com/developers/applications) under your brand new application settings menu, go back to the **Bot** sub-section and copy-paste **Token** to `./private/config.json` to the right field. Don't touch to **version** field, it will be replaced by the package version afterwards. If you know what you're doing, you can modify **prefix** to anything you want, it is used to interract with the bot and reduce the amount of data the bot need to deal with.

![API Token](/screenshots/screen0.png)

Once you cloned the repository and retrieved the API Token, the next step is to check if **node.js** is installed on your computer. Open up your terminal (macOS/Linux) or cammand line (Windows) and run `node -v`. If the command doesn't work, you must [install node](https://nodejs.org/en/download/). When it's done you can finally build dependencies:

```shell
$> npm install
```

## Usage

### Run the application

**This application must stay active if you want to keep data**. If by any chance to program crashes or is terminated, everything is lost. I recommand you to launch the following command on a dedicated server or something like that.

```shell
$> node bot.js
```

### Features

You can see what can interract with the bot using message based commands. Each command is prefixed by a string to avoid being recognized by other applications **(You must be administrator to interract with the bot for now on)**, by default this prefix is set to `!salary` and can be changed through interractions with the bot. Here is the list of available commands:

![commands](/screenshots/screen1.png)

this list is retrievable by sending `!salary help` by default in any channel of the server where the bot is.

## Credits

* [Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
* [Simple discordBot tutorial](https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b)
* [W3Schools javascript ressources](https://www.w3schools.com/js/)
* [Node.js v13.12.0 documentation](https://nodejs.org/docs/latest-v13.x/api/)
* [Enmap tutorial](https://enmap.evie.dev/install)
* [Javascript modules](https://js.evie.dev/modules)
