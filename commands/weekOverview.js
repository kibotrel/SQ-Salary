//Load Discord API and database informations.
const	Discord = require("discord.js");
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Check if there are informations for the current server loaded in database.
	const	serverID = Database.getServerIndex(message.guild.id);

	if (Database.table[serverID].player.length === 0)
	{
		message.channel.send("**Error:** No data found for the on-going week.");
		return ;
	}

	//Create an embedded message to display the on-going week data.
	var		embeddedMessage = new Discord.MessageEmbed();

	embeddedMessage.setColor("#010101")
	.setURL("https://github.com/kibotrel/SQ-Salary")
	.setFooter(`Bot v${client.botVersion} Alpha`)
	.setTimestamp()
	.setTitle("Salary Overview");

	//Compute salary for each player registered in the server database.
	for (i = 0; i < Database.table[serverID].player.length; i++)
	{
		Database.updateNetWorth(message.guild.id, Database.table[serverID].player[i].name);
	}

	//Sort the player list by personnal participation then bt ASCII order and display the results.
	const	server = Database.getServer(message.guild.id);
	const	playerList = Database.getPlayerList(message.guild.id);

	playerList.sort((a, b) => (a.runs < b.runs) ? 1 : (a.runs === b.runs) ? ((a.name > b.name) ? 1 : -1) : -1);
	embeddedMessage.addFields(
	{name:"Player", value: `**${playerList.map(e => e.name).join("\n")}**`, inline:true},
	{name:"Instance participation", value: `**${playerList.map(e => e.runs).join("\n")}**`, inline:true},
	{name:"Salary", value: `**${playerList.map(e => `${e.netWorth}P`).join("\n")}**`, inline:true},
	{name:"\u200B", value:"\u200B"},
	{name:"Week purse", value: `**${server.purse}P**`, inline:true},
	{name:"Total participation", value: `**${server.totalParticipation}**`, inline:true},
	)
	message.channel.send(embeddedMessage);
}
