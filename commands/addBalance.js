//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!** Use: \`${prefix} addBalance value\`.`);
		return ;
	}

	//Check user input unexpected behaviours.
	const	addedMoney = parseInt(args[0], 10);

	if (Number.isNaN(addedMoney) || addedMoney < 1)
	{
		message.channel.send(`**Error:** invalid amount requested.`);
		return ;
	}

	const	newPurse = Database.updatePurse(message.guild.id, addedMoney);

	message.channel.send(`You've just added **${addedMoney}P** to the server purse. The purse now contains **${newPurse}P**.`);
}
