//Load database informations.
const	Database = require("../database.js");

exports.run = (client, message) => {
	Database.resetServer(message.guild.id);
	message.channel.send(`Registered data successfully cleared!`);
}
