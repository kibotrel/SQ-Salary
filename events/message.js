//Load database informations.
const	Database = require("../database.js");

module.exports = (client, message) => {
	//Ignore bot, direct and "not a command" messages.
	if (message.author.bot || message.channel.type == "dm")
	{
		return ;
	}

	//Ensure that sever data is set up.
	Database.addServer(message.guild.id, message.guild.name);

	//Retrieve the right prefix sequence.
	const	prefix = Database.getPrefix(message.guild.id);

	if (!message.content.startsWith(prefix))
	{
		return ;
	}

	//Arguments array and command resolving.
	const	args = message.content.slice(prefix.length).trim().split(/ +/g);
	const	command = args.shift();

	//Grab the command data from the stored Enmap data and run it.
	const request = client.commands.get(command);

	if (!request)
	{
		message.channel.send(`**Undefined command!** Use \`${prefix} help\` for more informations about the bot.`);
		return ;
	}
	request.run(client, message, args);
};
