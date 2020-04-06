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
client.botVersion = package.version;
client.commands = new Enmap();

//Modular setup.
client.settings = new Enmap({
	name:"settings",
	fetchAll:false,
	autofetch:true,
	cloneLevel:"deep"
})

//Load event handlers.
fs.readdir("./events/", (error, files) => {
	console.log(`Loading event handlers...\n`);
	if (error)
	{
		return console.error(error);
	}
	files.forEach(file => {
    	if (!file.endsWith(".js"))
		{
			return ;
		}

		var		option = file.split(".")[0];
    	const	event = require(`./events/${file}`);

    	client.on(option, event.bind(null, client));
    	delete require.cache[require.resolve(`./events/${file}`)];
		console.log(`\t${option} handler: OK.`);
	});
});

//Load command functions.
fs.readdir("./commands/", (error, files) => {
	console.log(`\nLoading command definitions...\n`);
	if (error)
	{
		return console.error(error);
	}
	files.forEach(file => {
    	if (!file.endsWith(".js"))
		{
			return ;
		}

    	var	command = file.split(".")[0];
    	var	definition = require(`./commands/${file}`);

    	client.commands.set(command, definition);
		console.log(`\t${command} definition: OK.`);
	});
});

//Login the bot into the requested server.
client.login(config.token);
