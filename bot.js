require('dotenv').config();

//ROLL DICE COMMAND
//MODIFY PREFIX
//ADD MULTIPLE RETRY INSTANCE

var		major			= "0";
var		minor			= ".3.0";
var		prefix			= "!salary";

var		purse			= 0;
var		player			= [];
var		instanceID		= 0;
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
				.setFooter("Bot v" + major + minor + " Alpha")
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
			message.channel.send("**Undefined command!**. Use: `" + prefix + " help`.");
		else if (request[0] === "help")
		{
			embedMessage.setDescription(`Here are the possible **commands** :\n\n\
			- Register a new instance in the database\n\`${prefix} newInstance [player1-player2-...-playerN]\`\n\n\
			- Edit the drop worth of a player\n\`${prefix} addWorth playerName value\`\n\n\
			- Edit the balance value\n\`${prefix} addBalance value\``);
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
						player.push({name:username, instanceCount:1, grossWorth:0, netWorth:0});
					}
					else
						player[userIndex].instanceCount++;
				}
				message.channel.send("Instance **#" + instanceID + "** created!");
				instanceID++;
			}
			else
				message.channel.send("**Undefined argument(s)!** Use: `" + prefix + " newInstance [player1-player2-...-playerN]`.");
		}

		else if (request[0] === "addWorth")
		{
			if (typeof request[1] !== "undefined")
			{
				var userIndex	= playerList.indexOf(request[1]);

				if (userIndex === -1)
					message.channel.send("**Error:** The requested user didn't take part in any dungeon this week.");
				else
				{
					if (typeof request[2] !== "undefined")
					{
						var	addedMoney = parseInt(request[2], 10);
						player[userIndex].grossWorth += addedMoney;
						message.channel.send("Player **" + request[1] + " **gained **" + addedMoney + "P** worth of drop. This user's week gross worth is now **" + player[userIndex].grossWorth + "P**.");
					}
					else
						message.channel.send("**Undefined argument(s)!** Use: `" + prefix + " addWorth playerName value`.");
				}
			}
			else
				message.channel.send("**Undefined argument(s)!** Use: `" + prefix + " addWorth playerName value`.");
		}
		else if (request[0] === "weekOverview")
		{
			if (playerList.length > 0)
			{
				var playerDescription	= "";
				var salaryDescription	= "";
				var instanceDescription = "";
				for (i = 0; i < playerList.length; i++)
				{
					playerDescription	+= (player[i].name + "\n");
					instanceDescription += (player[i].instanceCount + "\n");
					salaryDescription	+= "\u200B\n";
				}
				embedMessage.addFields(
					{name:"Player", value:playerDescription, inline:true},
					{name:"Instance participation", value:instanceDescription, inline:true},
					{name:"Salary", value:salaryDescription, inline:true},
					{name:"Week purse", value:purse + "P"},
				)
				message.channel.send(embedMessage);
			}
			else
				message.channel.send("**Error:** No data found for the on-going week.");
		}
		else if (request[0] === "addBalance")
		{
			if (typeof request[1] !== "undefined")
			{
				var	addedMoney = parseInt(request[1], 10);

				purse += addedMoney;
				message.channel.send("You've just added **" + addedMoney + "P** to the global purse. The purse now contains **" + purse + "P**.");
			}
			else
				message.channel.send("**Undefined argument(s)!** Use: `" + prefix + " addBalance value`.");
		}
		else
			message.channel.send("**Undefined command!**. Use: `" + prefix + " help`.");
	}
});
client.login(process.env.DISCORD_TOKEN);
