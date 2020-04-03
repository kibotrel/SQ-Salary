//Load Discord API.
const	Discord = require("discord.js");

exports.run = (client, message, args) =>
{
	//Create an embedded message to display roll results.
	var	embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://github.com/kibotrel/SQ-Salary")
	.setFooter(`Bot v${client.config.version} Alpha`)
	.setTimestamp()
	.setTitle("Roll results");

	//Check if the user provided a name list.
	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!**. Use: \`${client.config.prefix} player1-player2-...-playerN [diceSides]\`.`);
		return ;
	}

	//Split the list of player and define the number of faces on the dice.
	const	users = args[0].split(/\-+/g);
	const	possibilities = (typeof args[1] === "undefined" ? 100 : parseInt(args[1]));

	//Analyze user input to avoid unexpected behaviours.
	if (users.length <= 2)
	{
		message.channel.send(`**Error:** specify at least two players.`);
		return ;
	}
	if (possibilities <= 1)
	{
		message.channel.send(`**Error:** the dice should have at least two sides.`);
		return ;
	}

	//Roll the dice, find the winner and fill the results in the embedded message fields.
	var		bestRoll = 0;
	var		winner = "";
	var		rollResults = [];

	for (i = 0; i < users.length; i++)
	{
		let	roll = Math.random() * (possibilities + 1);

		rollResults.push(Math.round(roll));
		if (roll > bestRoll)
		{
			winner = users[i];
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
