//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Retrieve the right prefix sequence.
	const	oldPrefix = Database.getPrefix(message.guild.id);

	//Check if a new prefix is sent.
	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!** Use: \`${oldPrefix} changePrefix newPrefix\`.`);
		return ;
	}

	//Update prefix.
	const	newPrefix = Database.changePrefix(message.guild.id, args[0]);

	message.channel.send(`**Command prefix Successfuly updated!** Use \`${newPrefix}\` to interract with the bot now.`);
}
