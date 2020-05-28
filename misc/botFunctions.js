module.exports = bot => {

    /*
    PERMS FUNCTION
     */

    bot.permlevel = message => {
        let permLevel = 0;
        const permOrder = client.config.permLevels.slice(0).sort((low, high) => low.level < high.level ? 1 : -1);

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
            "welcomeMessage": "Welcome {{user}}, enjoy your stay!",
            "welcomeEnabled": "false"
    };

    /*
    GUILD SETTINGS
     */

    bot.getSettings = guild => {
        bot.settings.ensure('default', defaultSettings);
        if(!guild) return bot.settings.get('default');
        const guildConf = client.settings.get(guild.id) || {};
        return ({...client.settings.get("default"), ...guildConf});

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

    process.on("unhandledRejection", err => {
        bot.logger.error(`Unhandled rejection: ${err}`);
        console.error(err);
    });
}