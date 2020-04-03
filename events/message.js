module.exports = (client, message) =>
{
	//Ignore bot, direct and "not a command" messages.
	if (message.author.bot || message.channel.type == "dm" || !message.content.startsWith(client.config.prefix))
		return ;

	//Arguments array and command resolving.
	const	args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const	command = args.shift();

	//Grab the command data from the stored Enmap data and run it.
	const request = client.commands.get(command);

	if (!request)
	{
		message.channel.send(`**Undefined command!** Use \`${client.config.prefix} help\` for more informations about the bot.`);
		return ;
	}
	request.run(client, message, args);
};
