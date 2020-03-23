require('dotenv').config();

var		major			= "0";
var		minor			= ".0.2";
var		prefix			= "!salary";

var		instanceID		= 0;
var		player			= [];
var		playerList		= [];
const	Discord			= require('discord.js');
const	client  		= new Discord.Client();

client.on('ready', () => {
    console.log("Salary Bot started Successfuly !");
});

client.on('message', message => {
	var	embedMessage	= new Discord.MessageEmbed();

	embedMessage.setColor("#010101")
				.setTitle("Salary Overview")
				.setURL("https://github.com/kibotrel/SQ-Salary")
				.setFooter("Bot v" + major + minor)
				.setTimestamp();
	if (message.content.startsWith(prefix))
	{
		var request	= message.content.substring(prefix.length).trim().split(" ");

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
		else if (request[0] === "help")
		{
			embedMessage.setDescription(`Here are the possible **commands** :\n\n\
			- Register a new instance in the database\n\`${prefix} newInstance [player1-player2-...-playerN]\`\n\n\
			- Edit the drop worth of a player\n\`${prefix} addWorth playerName value\``);
			message.channel.send(embedMessage);
		}
		else if (request[0] === "newInstance")
		{
			if (typeof request[1] !== "undefined")
			{
				var	user	= request[1].split("-");
				for (i = 0; i < user.length; i++)
				{
					if (user[i] == 0)
					{
						user.splice(i, 1);
						i = 0;
					}
				}
				var username;
				for (username of user)
				{
					var userIndex	= playerList.indexOf(username);
					if (userIndex === -1)
					{
						playerList.push(username);
						player.push({name:username, instanceCount:1, balanceWorth:0});
					}
					else
						player[userIndex].instanceCount++;
				}
				message.channel.send("Instance **#" + instanceID + "** created!");
				instanceID++;
			}
		}
	}
});
client.login(process.env.DISCORD_TOKEN);
