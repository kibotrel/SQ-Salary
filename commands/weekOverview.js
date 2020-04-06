//Load Discord API and database informations
const	Discord = require("discord.js");
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	//Check if there are informations for the current server loaded in database
	const	serverID = Database.getServer(message.guild.id);

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
	var		salaryPercent;

	for (i = 0; i < Database.table[serverID].player.length; i++)
	{
		salaryPercent = Database.table[serverID].player[i].runs / Database.table[serverID].totalParticipation;
		Database.updateNetWorth(message.guild.id,  Database.table[serverID].player[i].name, salaryPercent);
	}
	embeddedMessage.addFields(
	{name:"Player", value: `**${Database.table[serverID].player.map(e => e.name).join("\n")}**`, inline:true},
	{name:"Instance participation", value: `**${Database.table[serverID].player.map(e => e.runs).join("\n")}**`, inline:true},
	{name:"Salary", value: `**${Database.table[serverID].player.map(e => e.netWorth).join("\n")}**`, inline:true},
	{name:"\u200B", value:"\u200B"},
	{name:"Week purse", value: `**${Database.table[serverID].purse}**`, inline:true},
	{name:"Total participation", value: `**${Database.table[serverID].totalParticipation}**`, inline:true},
	)
	message.channel.send(embeddedMessage);
}
