//Load Discord API and database informations.
const	Discord = require("discord.js");
const	Database = require("../database.js");

exports.run = (client, message) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	//Create an embedded message to display how to use the bot.
	var	embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://www.patreon.com/demonwaves")
	.setFooter(`Bot v${client.botVersion} Beta`)
	.setTimestamp()
	.setTitle("Help pannel")
	.setDescription(`Here are the possible **commands**, arguments in brackets are optional:\n\n\
	- Register a new instance in the database\n\`${prefix} newInstance player1-player2-...-playerN [runAmount]\`\n\n\
	- Edit the drop worth of a player\n\`${prefix} addWorth playerName value\`\n\n\
	- Edit the balance value\n\`${prefix} addBalance value\`\n\n\
	- Modify the prefix tag\n\`${prefix} changePrefix newPrefix\`\n\n\
	- Use RNG to roll a dice\n\`${prefix} diceRoll player1-player2-...-playerN [diceSides]\`\n\n\
	- Get a quick recap of the week\n\`${prefix} weekOverview\`\n\n\
	- Configure the participation threshold\n\`${prefix} setParticipation value\`\n\n\
	- Wipe the current week informations\n\`${prefix} resetData\`\n\n\
	- Get informations on the bot availability\n\`${prefix} patreon\``);
	message.channel.send(embeddedMessage);
}
