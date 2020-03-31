# SQ-Salary

[![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/sq-salary/badge)](https://www.codefactor.io/repository/github/kibotrel/sq-salary) ![GitHub](https://img.shields.io/github/license/kibotrel/SQ-Salary) ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/kibotrel/SQ-Salary?include_prereleases)

This project is a DiscordBot application built using few **node.js** modules ([discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) and [dotenv](https://www.npmjs.com/package/dotenv)) meant to simplify dungeon profits splitting between people.

## Install

First clone the repository using:

```shell
$> git clone https://github.com/kibotrel/SQ-Salary.git
$> cd SQ-Salary
```

If you want to host this bot on your own you need an extra file that isn't uploaded here for security purposes : a file named `.env` that stores the **Bot API Token**. You simply have to add this file at repository's root and add this line to it:

```
DISCORD_TOKEN='insert the bot token here'
```

How do you get this token ? Fist, follow [this guide](https://discordpy.readthedocs.io/en/latest/discord.html) to create a new Discord application, attach a bot user and add it to a server. Then on [Discord Developer Portal](https://discordapp.com/developers/applications) under your brand new application settings menu, go back to the **Bot** sub-section and copy-paste **Token** to `.env` where it belongs and keep this file private.

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

this list is retrievable by sending `PREXIF help` in any channel of the server.

## Credits

* [Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
* [Simple discordBot tutorial](https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b)
* [W3Schools javascript ressources](https://www.w3schools.com/js/)
* [Node.js v13.12.0 documentation](https://nodejs.org/docs/latest-v13.x/api/)
