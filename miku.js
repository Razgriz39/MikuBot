let timeDifference = [];
cmd = '';
cmd = cmd.concat(`${Date().toString().substring(0, Date().toString().length-22)} JST: Starting... \n`);
console.log(cmd);
timeDifference.push(Date.now());
exports.timeDifference = timeDifference;

const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();
const token = require("./bruh.json");
bot.config = require("./config.js");
bot.mongoose = require("./misc/database.js")
bot.sendEmbed = require('./misc/embeds.js');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
require('./misc/botFunctions.js')(bot);

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        bot.commands.set(commandName, props);
    });
});

bot.mongoose.init();
bot.login(token.miku);
