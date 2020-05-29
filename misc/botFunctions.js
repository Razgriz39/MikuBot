const mongoose = require('mongoose');
const Guild = require('../model/guild.js')

module.exports = bot => {

    /*
    PERMS FUNCTION
     */

    bot.permlevel = message => {
        let permLevel = 0;
        const permOrder = bot.config.permLevels.slice(0).sort((low, high) => low.level < high.level ? 1 : -1);

        while(permOrder.length){
            const currentLevel = permOrder.shift();
            if(message.guild && currentLevel.guildOnly) continue;
            if(currentLevel.check(message)){
                permLevel = currentLevel.level;
                break;
            }
        }
        return permLevel;
    };

    /*
    GUILD DEFAULT
     */

    const defaultSettings = {
        "prefix": "+",
        "modLogChannel": "mod-log",
        "moderatorRole": "Moderator",
        "adminRole": "Administrator",
        "systemNotice": "true",
        "welcomeChannel": "welcome",
        "welcomeMessage": "Welcome to {{guild}} {{user}}, enjoy your stay!",
        "welcomeEnabled": "false"
    };

    /*
    GUILD SETTINGS
     */

    bot.getGuild = async (guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return bot.config.defaultSettings;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    bot.createGuild = async (settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.config.defaultSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

    /*
    SINGLE LINE AWAIT
     */

    bot.awaitReply = async (message, question, limit = 60000) => {
        const filter = messages => messages.author.id === message.author.id;
        await message.channel.send(question);
        try{
            const collected = await message.channel.awaitMessages(filter, {max: 1, time: limit, errors: ['time']});
            return collected.first().content;
        } catch (err) {
            return false;
        }
    };

    /*
    LOAD AND UNLOAD COMMANDS
     */

    bot.loadCommand = commandName => {
        try{
            bot.logger.log(`Loading Command: ${commandName}`);
            const props = require (`../commands/${commandName}`);
            if(props.init){
                props.init(bot);
            }
            bot.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (err) {
            return `Unable to load ${commandName}: ${err}`;
        }
    };

    bot.unloadCommand = async commandName => {
        let command;
        if(bot.command.has(commandName)){
            command = bot.commands.get(commandName);
        } else if(bot.aliases.has(commandName)) {
            command = bot.commands.get(bot.aliases.get(commandName));
        }
        if(!command) return `${commandName} is not a command nor an alias.`;

        if (command.shutdown) {
            await command.shutdown(bot);
        }
        const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
        delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

    bot.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    },


    process.on("unhandledRejection", err => {
        console.error(`Unhandled rejection: ${err}`);
        console.error(err);
    });
}