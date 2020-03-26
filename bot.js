require('dotenv').config();

//BALANCE REDISTRIBUTION

var		major			= "0";
var		minor			= ".7.1";
var		prefix			= "!salary";

var		purse			= 0;
var		player			= [];
var		instanceID		= 0;
var		instanceEntries	= 0;
var		playerList		= [];
const	Discord			= require('discord.js');
const	client  		= new Discord.Client();

client.on('ready', () => {
    console.log("Salary Bot started Successfuly !");
});

client.on('message', message => {
	var	embedMessage	= new Discord.MessageEmbed();

	embedMessage.setColor("#010101")
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
			embedMessage.setDescription(`Here are the possible **commands**, arguments in brackets are optional:\n\n\
			- Register a new instance in the database\n\`${prefix} newInstance player1-player2-...-playerN [runAmount]\`\n\n\
			- Edit the drop worth of a player\n\`${prefix} addWorth playerName value\`\n\n\
			- Edit the balance value\n\`${prefix} addBalance value\`\n\n\
			- Modify the prefix tag\n\`${prefix} changePrefix newPrefix\`\n\n\
			- Use RNG to roll a dice\n\`${prefix} diceRoll player1-player2-...-playerN [diceSides]\`\n\n\
			- Get an quick recap of the week\n\`${prefix} weekOverview\``);
			message.channel.send(embedMessage);
		}
		else if (request[0] === "newInstance")
		{
			var	user		= [];
			var username	= "";
			var userIndex	= 0;
			var	instanceTry	= 1;

			if (typeof request[1] !== "undefined")
			{
				user = request[1].split("-");
				for (i = 0; i < user.length; i++)
				{
					if (user[i] == 0)
					{
						user.splice(i, 1);
						i = 0;
					}
				}
				for (username of user)
				{
					userIndex = playerList.indexOf(username);
					if (typeof request[2] !== "undefined")
						instanceTry = parseInt(request[2]);
					if (instanceTry > 1)
					{
						if (userIndex === -1)
						{
							playerList.push(username);
							player.push({name:username, instanceCount:instanceTry, grossWorth:0, netWorth:0});
						}
						else
							player[userIndex].instanceCount += instanceTry;
						instanceEntries += instanceTry;
					}
					else
					{
						if (userIndex === -1)
						{
							playerList.push(username);
							player.push({name:username, instanceCount:1, grossWorth:0, netWorth:0});
						}
						else
							player[userIndex].instanceCount++;
						instanceEntries++;
					}
				}
				if (instanceTry > 1)
					message.channel.send("Instance **#" + instanceID + "** to **#" + (instanceID + instanceTry) + "** created!");
				else
					message.channel.send("Instance **#" + instanceID + "** created!");
				instanceID += instanceTry;
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
				var salaryPercent			= 0;
				var playerDescription		= "";
				var salaryDescription		= "";
				var instanceDescription		= "";
				var	participationPercent	= 0;

				for (i = 0; i < playerList.length; i++)
				{
					salaryPercent = player[i].instanceCount / instanceEntries;
					participationPercent = (player[i].instanceCount / instanceID) * 100;
					player[i].netWorth = Math.floor(purse * salaryPercent) - player[i].grossWorth;
					if (player[i].netWorth < 0)
						player[i].netWorth = 0;
					playerDescription	+= (player[i].name + "\n");
					instanceDescription += ("**" + player[i].instanceCount + "** (" + participationPercent.toFixed(2) + "%)\n");
					salaryDescription	+= ("**" + player[i].netWorth.toFixed() + "P**\n");
				}
				embedMessage.addFields(
					{name:"Player", value:playerDescription, inline:true},
					{name:"Instance participation", value:instanceDescription, inline:true},
					{name:"Salary", value:salaryDescription, inline:true},
					{name:"\u200B", value:"\u200B"},
					{name:"Week purse", value: "**" + purse + "P**", inline:true},
					{name:"Instances completed", value: "**" + instanceID + "**", inline:true},
				)
				.setTitle("Salary Overview");
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
		else if (request[0] === "changePrefix")
		{
			if (typeof request[1] !== "undefined")
			{
				message.channel.send("**Command prefix Successfuly updated!** Use `" + request[1] + "` to interract with the bot now.");
				prefix = request[1];
			}
			else
				message.channel.send("**Undefined argument(s)!** Use: `" + prefix + " changePrefix newPrefix`.");
		}
		else if (request[0] === "diceRoll")
		{
			var	user		= [];
			var roll		= 0;
			var	winner		= "";
			var	savedRoll	= 0;
			var	numSides	= 100;
			var username	= "";
			var	rollValue	= "";
			var	rollPlayers	= "";

			if (typeof request[1] !== "undefined")
			{
				user		= request[1].split("-");
				for (i = 0; i < user.length; i++)
				{
					if (user[i] == 0)
					{
						user.splice(i, 1);
						i = 0;
					}
				}
				if (typeof request[2] !== "undefined")
					numSides = parseInt(request[2]);
				for (username of user)
				{
					roll = Math.round(Math.random() * (numSides + 1));
					rollValue += (roll + "\n");
					rollPlayers += (username + "\n");
					if (roll > savedRoll)
					{
					 	savedRoll = roll;
						winner = username;
					}
				}
				embedMessage.addFields(
					{name:"Player", value:rollPlayers, inline:true},
					{name:"Roll", value:rollValue, inline:true},
					{name:"\u200B", value:"\u200B"},
					{name:"Dice Range", value: "**0 to " + numSides + "**", inline:true},
					{name:"Winner", value: "**" + winner + "**", inline:true},
				)
				.setTitle("Roll results");
				message.channel.send(embedMessage);
			}
			else
				message.channel.send("**Undefined argument(s)!**. Use: `" + prefix + " player1-player2-...-playerN [diceSides]`.");
		}
		else
			message.channel.send("**Undefined command!**. Use: `" + prefix + " help`.");
	}
});
client.login(process.env.DISCORD_TOKEN);
