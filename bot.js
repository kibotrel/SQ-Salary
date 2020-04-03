//Read filesystem to find events and command handlers.
const	fs = require("fs");

//Data structure to store informations.
const	Enmap = require("enmap");

//Store usefull onfiguration infos and bot token.
const	config = require("./private/config.json");
const	package = require("./package.json");

//Setup the Discord interface to communicate with.
const	Discord = require("discord.js");
const	client = new Discord.Client();
client.config = config;
client.config.version = package.version;
client.commands = new Enmap();

//Modular setup.
client.settings = new Enmap({
	name:"settings",
	fetchAll:false,
	autofetch:true,
	cloneLevel:"deep"
})

//Load event handlers.
fs.readdir("./events/", (error, files) =>
{
	if (error)
		return console.error(error);
	files.forEach(file =>
	{
    	if (!file.endsWith(".js"))
			return ;

    	const	event = require(`./events/${file}`);
		var		option = file.split(".")[0];

		console.log(`Loading ${option} handler.`);
    	client.on(option, event.bind(null, client));
    	delete require.cache[require.resolve(`./events/${file}`)];
	});
});

//Load command functions.
fs.readdir("./commands/", (error, files) =>
{
	if (error)
		return console.error(error);
	files.forEach(file =>
	{
    	if (!file.endsWith(".js"))
			return ;

    	var	definition = require(`./commands/${file}`);
    	let	command = file.split(".")[0];

		console.log(`Loading ${command} definition.`);
    	client.commands.set(command, definition);
	});
});

//Login the bot into the requested server.
client.login(config.token);
