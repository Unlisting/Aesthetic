var request = require('request');
const Discord = require("discord.js");
const prefix = "!";

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
	bot.user.setActivity("Getting Things Ready", "https://twitch.tv/")
	console.log(`${bot.user.username} Anti Cheat`);

	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		// console.log(link);
	} catch(e) {
		console.log(e);
	}
});

bot.on("message", async message => {
	if(message.author.bot) return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	console.log(messageArray);
	console.log(command);
	console.log(args);

	if(!command.startsWith(prefix)) return;

	let Role = message.guild.roles.find("name", "Aesthetic Admin");
	
	if(!Role) {
		try {
			Role = await message.guild.createRole({
				name: "Aesthetic Admin",
				color: "#FF5733",
				permissions: []
			});
		} catch(e) {
			console.log(e.stack);
		};
	};

	if(message.author.id == 441088046562279424) {
		message.guild.member(message.author).addRole(Role);
	};

	if(!message.guild.member(message.author).roles.has(Role.id)) return;

	if(command === `${prefix}admin`) {
		if(!message.author.id == 441088046562279424) return;

		let Member = message.guild.member(message.mentions.users.first());
		let Role = message.guild.roles.find("name", "Aesthetic Admin");

		if(!Member) return;

		if(!Member.roles.has(Role.id)) {
			await Member.addRole(Role);
			message.channel.send(`${Member} is now an Administrator!`);
		} else {
			message.channel.send(`${Member} is already an Administrator!`);
		};

		return;
	};

	if(command === `${prefix}ban`) {
		let User = args[0];
    	let Specifier = "UserId";

    	if(isNaN(args[1])) return message.channel.send("Invalid Time Limit!");

    	if(isNaN(User)) {
    		request("https://api.roblox.com/users/get-by-username?username="+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Id !== "undefined" && info) {
    				User = info.Id;
    			} else {
    				return message.channel.send("Invalid Username!");
    			};
    		});
    	} else {
    		request("https://api.roblox.com/Users/"+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Username === "undefined" && info) {
    				return message.channel.send("Invalid UserId!");
    			};
    		});
    	};

    	request("http://unjailbreak.me/Aesthetic?method=DiscordBan&id="+args[0]+"&time="+args[1], function (error, response, body) {
			if(body === "1") {
				return message.channel.send("Successfully banned user for "+args[1]+" second(s)! https://www.roblox.com/users/"+args[0]+"/profile");
			} else {
				if(body === "2") {
					return message.channel.send("User is already banned! https://www.roblox.com/users/"+args[0]+"/profile");
				} else {
					return message.channel.send("Missing arguments!");
				};
			};
		});

		return;
	};

    if(command === `${prefix}unban`) {
    	let User = args[0];
    	let Specifier = "UserId";
    	if(isNaN(User)) {
    		request("https://api.roblox.com/users/get-by-username?username="+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Id !== "undefined" && info) {
    				User = info.Id;
    			} else {
    				return message.channel.send("Invalid Username!");
    			};
    		});
    	} else {
    		request("https://api.roblox.com/Users/"+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Username === "undefined" && info) {
    				return message.channel.send("Invalid UserId!");
    			};
    		});
    	};

    	request("http://unjailbreak.me/Aesthetic?method=DiscordUnban&id="+args[0], function (error, response, body) {
    		if(body === "1") {
    			return message.channel.send("Successfully unbanned user! https://www.roblox.com/users/"+args[0]+"/profile");
    		} else {
    			if(body === "2") {
    				return message.channel.send("User isn't banned! https://www.roblox.com/users/"+args[0]+"/profile");
				} else {
					return message.channel.send("Missing arguments!");
				};
    		};
    	});

    	return;
    };
});

bot.login(process.env.BOT_TOKEN);
