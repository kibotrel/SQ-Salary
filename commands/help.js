//Load Discord API.
const	Discord = require("discord.js");

exports.run = (client, message, args) =>
{
	//Create an embedded message to display how to use the bot.
	var	embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://github.com/kibotrel/SQ-Salary")
	.setFooter(`Bot v${client.config.version} Alpha`)
	.setTimestamp()
	.setTitle("Help pannel")
	.setDescription(`Here are the possible **commands**, arguments in brackets are optional:\n\n\
	- Register a new instance in the database\n\`${client.config.prefix} newInstance player1-player2-...-playerN [runAmount]\`\n\n\
	- Edit the drop worth of a player\n\`${client.config.prefix} addWorth playerName value\`\n\n\
	- Edit the balance value\n\`${client.config.prefix} addBalance value\`\n\n\
	- Modify the prefix tag\n\`${client.config.prefix} changePrefix newPrefix\`\n\n\
	- Use RNG to roll a dice\n\`${client.config.prefix} diceRoll player1-player2-...-playerN [diceSides]\`\n\n\
	- Get a quick recap of the week\n\`${client.config.prefix} weekOverview\``);
	message.channel.send(embeddedMessage);
}
