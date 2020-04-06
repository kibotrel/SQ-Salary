//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message, args) => {
	Database.resetServer(message.guild.id);
	message.channel.send(`Registered data successfully cleared!`);
}
