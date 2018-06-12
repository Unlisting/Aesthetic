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
	let server = bot.guilds.get("423348154352664586");

	console.log(messageArray);
	console.log(command);
	console.log(args);

	if(!command.startsWith(prefix)) return;
	if(!message.author.id == 441088046562279424) return;

	if(command === `${prefix}ban`) {
		if(isNaN(args[0]) && isNaN(args[1]) && typeof args[0] !== "undefined" && typeof args[1] !== "undefined") {
			request("https://api.roblox.com/users/get-by-username?username="+args[0], function (error, response, body) {
				let info = JSON.parse(body);
				if(typeof info.Id !== "undefined" && info) {
					request("http://unjailbreak.me/Aesthetic?method=DiscordBan&id="+info.Id+"&time="+args[1], function (error, response, body) {
						if(body === "1") {
							return message.channel.send("Successfully banned user for "+args[1]+" seconds! https://www.roblox.com/users/"+info.Id+"/profile");
						} else {
							if(body === "2") {
								return message.channel.send("User is already banned! https://www.roblox.com/users/"+info.Id+"/profile");
							} else {
								return message.channel.send("Missing arguments!");
							};
						};
					});
				} else {
					return message.channel.send("Invalid Username!");
				};
			});
		} else {
			request("https://api.roblox.com/Users/"+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Username !== "undefined" && info) {
    				request("http://unjailbreak.me/Aesthetic?method=DiscordBan&id="+args[0]+"&time="+args[1], function (error, response, body) {
						if(body === "1") {
							return message.channel.send("Successfully banned user for "+args[1]+" seconds! https://www.roblox.com/users/"+args[0]+"/profile");
						} else {
							if(body === "2") {
								return message.channel.send("User is already banned! https://www.roblox.com/users/"+args[0]+"/profile");
							} else {
								return message.channel.send("Missing arguments!");
							};
						};
					});
    			} else {
    				return message.channel.send("Invalid UserId!");
    			};
    		});
		};
	};

    if(command === `${prefix}unban`) {
    	if(isNaN(args[0]) && typeof args[0] !== "undefined") {
    		request("https://api.roblox.com/users/get-by-username?username="+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Id !== "undefined" && info) {
    				request("http://unjailbreak.me/Aesthetic?method=DiscordUnban&id="+info.Id, function (error, response, body) {
			    		if(body === "1") {
			    			return message.channel.send("Successfully unbanned user! https://www.roblox.com/users/"+info.Id+"/profile");
			    		} else {
			    			return message.channel.send("Missing arguments!");
			    		};
			    	});
    			} else {
    				return message.channel.send("Invalid Username!");
    			};
    		});
    	} else {
    		request("https://api.roblox.com/Users/"+args[0], function (error, response, body) {
    			let info = JSON.parse(body);
    			if(typeof info.Username !== "undefined" && info) {
    				request("http://unjailbreak.me/Aesthetic?method=DiscordUnban&id="+args[0], function (error, response, body) {
			    		if(body === "1") {
			    			return message.channel.send("Successfully unbanned user! https://www.roblox.com/users/"+args[0]+"/profile");
			    		} else {
			    			return message.channel.send("Missing arguments!");
			    		};
			    	});
    			} else {
    				return message.channel.send("Invalid UserId!");
    			};
    		});
    	};
    };
});

bot.login(process.env.BOT_TOKEN);
