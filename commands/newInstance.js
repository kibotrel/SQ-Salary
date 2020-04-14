//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!**. Use: \`${prefix} newInstance player1-player2-...-playerN [runAmount]\`.`);
		return ;
	}

	//Split the list of players and determine instance count.
	var		instanceTry = 1;
	const	users = args[0].split(/-+/g);

	if (typeof args[1] !== "undefined")
	{
		instanceTry = parseInt(args[1], 10);
		if (Number.isNaN(instanceTry) || instanceTry < 1)
		{
			message.channel.send(`**Error:** invalid dungeon amount.`);
			return;
		}
	}

	//Update each player informations. Create a new profile if no information is found.
	var		name;

	for (name of users)
	{
		Database.updatePlayer(message.guild.id, name, instanceTry);
	}
	
	const	oldRun = Database.getTotalDungeons(message.guild.id);
	const	newRun = oldRun + instanceTry - 1;

	if (instanceTry > 1)
	{
		message.channel.send(`Instance **#${oldRun}** to **#${newRun}** created!`);
	}
	else
	{
		message.channel.send(`Instance **#${oldRun}** created!`);
	}
	Database.updateDungeons(message.guild.id, instanceTry);
}
