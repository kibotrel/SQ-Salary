//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!** Use: \`${prefix} setParticipation value\`.`)
		return ;
	}

	const	value = parseInt(args[0], 10);

	//Check user inputs to avoid unexpected behaviours.
	if (Number.isNaN(value) || value < 0)
	{
		message.channel.send(`**Error:** invalid amount requested.`);
		return ;
	}
	const	participation = Database.updateMinimumParticipartion(message.guild.id, value);

	message.channel.send(`Successfully updated minimum participation. Each player need to complete at least **${participation}** dungeon(s) to earn a salary.`);
}
