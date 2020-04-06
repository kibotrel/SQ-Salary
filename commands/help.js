//Load Discord API and database informations.
const	Discord = require("discord.js");
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	//Create an embedded message to display how to use the bot.
	var	embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://github.com/kibotrel/SQ-Salary")
	.setFooter(`Bot v${client.botVersion} Alpha`)
	.setTimestamp()
	.setTitle("Help pannel")
	.setDescription(`Here are the possible **commands**, arguments in brackets are optional:\n\n\
	- Register a new instance in the database\n\`${prefix} newInstance player1-player2-...-playerN [runAmount]\`\n\n\
	- Edit the drop worth of a player\n\`${prefix} addWorth playerName value\`\n\n\
	- Edit the balance value\n\`${prefix} addBalance value\`\n\n\
	- Modify the prefix tag\n\`${prefix} changePrefix newPrefix\`\n\n\
	- Use RNG to roll a dice\n\`${prefix} diceRoll player1-player2-...-playerN [diceSides]\`\n\n\
	- Get a quick recap of the week\n\`${prefix} weekOverview\``);
	message.channel.send(embeddedMessage);
}
