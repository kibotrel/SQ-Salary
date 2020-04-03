exports.run = (client, message, args) =>
{
	//Check if a new prefix is sent by the user and update it.
	if (typeof args[0] === "undefined")
	{
		message.channel.send(`**Undefined argument(s)!** Use: \`${client.config.prefix} changePrefix newPrefix\`.`);
		return ;
	}
	else
	{
		client.config.prefix = args[0];
		message.channel.send(`**Command prefix Successfuly updated!** Use \`${client.config.prefix}\` to interract with the bot now.`);
	}
}
