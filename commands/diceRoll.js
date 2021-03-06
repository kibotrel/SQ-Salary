//Load Discord API and database informations.
const	Discord = require("discord.js");
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	//Check if the user provided a name list.
	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!**. Use: \`${prefix} diceRoll player1-player2-...-playerN [diceSides]\`.`);
		return ;
	}

	//Split the list of player and define the number of faces on the dice.
	const	users = args[0].split(/-+/g);
	const	possibilities = (typeof args[1] === "undefined" ? 100 : parseInt(args[1]));

	//Analyze user input to avoid unexpected behaviours.
	if (users.length < 2)
	{
		message.channel.send(`**Error:** specify at least two players.`);
		return ;
	}
	if (Number.isNaN(possibilities) || possibilities < 2)
	{
		message.channel.send(`**Error:** invalid sides amount.`);
		return;
	}

	//Create an embedded message to display roll results.
	var	embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://www.patreon.com/demonwaves")
	.setFooter(`Bot v${client.botVersion} Beta`)
	.setTimestamp()
	.setTitle("Roll results");


	//Roll the dice, find the winner and fill the results in the embedded message fields.
	var		bestRoll = 0;
	var		winner = "";
	var		rollResults = [];

	for (name of users)
	{
		let	roll = Math.random() * (possibilities + 1);

		rollResults.push(Math.round(roll));
		if (roll > bestRoll)
		{
			winner = name;
			bestRoll = roll;
		}
	}
	embeddedMessage.addFields(
		{name:"Players", value:users.join("\n"), inline:true},
		{name:"Rolls", value:rollResults.join("\n"), inline:true},
		{name:"\u200B", value:"\u200B"},
		{name:"Dice Range", value:`**0 to ${possibilities}**`, inline:true},
		{name:"Winner", value: `**${winner}**`, inline:true},
	)
	message.channel.send(embeddedMessage);
}
