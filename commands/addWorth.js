//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	//Check user inputs to avoid unexpected behaviours.
	if (typeof args[0] === "undefined" || typeof args[1] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!** Use: \`${prefix} addWorth playerName value\`.`);
		return ;
	}

	//Check if the player is registered in the database.
	const	playerIndex = Database.getPlayerIndex(message.guild.id, args[0]);

	if (playerIndex === -1)
	{
		message.channel.send(`**Error:** The requested user didn't take part in any dungeon this week.`);
		return ;
	}

	//Check user input once again to avoid unexpected behaviours.
	const	addedMoney = parseInt(args[1], 10);

	if (Number.isNaN(addedMoney) || addedMoney < 1)
	{
		message.channel.send(`**Error:** invalid amount requested.`);
		return ;
	}

	const	newWorth = Database.updateGrossWorth(message.guild.id, args[0], addedMoney);

	message.channel.send(`Player **${args[0]}** gained **${addedMoney}P** worth of drop. This user's week gross worth is now **${newWorth}P**.`);
}
