//Load credentials.
const	Config = require("./private/config.json");

//Loop through the database to find right value for the given attribute.
function databaseIndex(database, attribute, value) {
	for (i = 0; i < database.length; i++)
	{
		if (database[i][attribute] === value)
		{
			return i;
		}
	}
	return -1;
}

//Database where everything is stored.
exports.table = [];

//Add a new server with default configuration into the database.
exports.addServer = (serverID, serverName) => {
	const	index = databaseIndex(this.table, "id", serverID);

	if (index === -1)
	{
		const	newServer = {
			id: serverID,
			name: serverName,
			prefix: Config.prefix,
			player: [],
			purse: 0,
			instanceCount: 0,
			totalParticipation: 0,
			minimumParticipation: 0
		}
		this.table.push(newServer);
	}
	return this.table[this.table.length - 1];
}

//Retrieve the current amount of dungeons cleared for the given server.
exports.getTotalDungeons = (serverID) => {
	return this.table[databaseIndex(this.table, "id", serverID)].instanceCount;
}

//Update per server player profile or create it if no information is found.
exports.updatePlayer = (serverID, username, instanceTry) => {
	const	serverIndex = databaseIndex(this.table, "id", serverID);
	const	playerIndex = databaseIndex(this.table[serverIndex].player, "name", username);

	if (playerIndex === -1)
	{
		const	newPlayer = {
			name: username,
			runs: instanceTry,
			grossWorth: 0,
			netWorth : 0
		}

		this.table[serverIndex].player.push(newPlayer);
	}
	else
	{
		this.table[serverIndex].player[playerIndex].runs += instanceTry;
	}

	//Update the global participation for salary computation.
	this.table[serverIndex].totalParticipation += instanceTry;
}

//Update the dungeon amount done on the requested server.
exports.updateDungeons = (serverID, instanceTry) => {
	const	index = databaseIndex(this.table, "id", serverID);

	this.table[index].instanceCount += instanceTry;
	return this.table[index].instanceCount;
}

//Retrieve the current prefix for the given server.
exports.getPrefix = (serverID) => {
	return this.table[databaseIndex(this.table, "id", serverID)].prefix;
}

//Update the requested server prefix.
exports.changePrefix = (serverID, newPrefix) => {
	const	index = databaseIndex(this.table, "id", serverID);

	this.table[index].prefix = newPrefix;
	return this.table[index].prefix;
}
