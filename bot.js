require('dotenv').config();

var		major			= "0";
var		minor			= ".0.1";
var		prefix			= "!salary";
const	Discord			= require('discord.js');
const	client  		= new Discord.Client();

client.on('ready', () => {
    console.log("Salary Bot started Successfuly !");
});

client.on('message', message => {
	var request			= message.content.substring(prefix.length).trim().split(" ");
	var	description		= [];
	var	embedMessage	= new Discord.MessageEmbed();

	embedMessage.setColor("#010101")
				.setTitle("Salary Overview")
				.setURL("https://github.com/kibotrel/SQ-Salary")
				.setFooter("Bot v" + major + minor)
				.setTimestamp();
	if (message.content.startsWith(prefix))
	{
		for (i = 0; i < request.length; i++)
		{
			if (request[i] == 0)
			{
				request.splice(i, 1);
				i = 0;
			}
		}
		if (!request.length)
			message.channel.send("**Undefined command!**. Use: `" + prefix + " help`");
	}
});
client.login(process.env.DISCORD_TOKEN);
