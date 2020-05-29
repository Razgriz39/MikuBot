const mikuReply = require('../misc/replies.js')
module.exports = async (bot, message) => {

    //Ignores other bot.
    if (message.author.bot) return;

    //Get server specific settings from the database.
    let settings;
    bot.settings = await bot.getGuild(message.guild);

    //Argument/command name definition.
    botPing = `<@!${bot.user.id}>`; //Makes bot ping variable.
    miku = 'miku';
    if(message.content.startsWith(bot.settings.prefix)) { //If message starts with prefix.
        args = message.content.slice(bot.settings.prefix.length).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if(message.content.startsWith(botPing)) { //If message starts with a ping.
        args = message.content.slice(botPing.length + 1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if((!message.content.startsWith(miku)) && (message.author.id === bot.config.ownerID)) { //If i'm sending a message that does not start with 'miku'.
        args = message.content.toLowerCase().trim().split(/ +/g);
        mikuReply.send(args, message); //Stupid stuff you don't need to know.
        return;
    } else if(message.content.startsWith(miku)) { //If the message starts with miku.
        args = message.content.slice(miku.length + 1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else {
        return;
    }

    // Grab the command data from the bot.commands.
    const cmd = bot.commands.get(command);

    // If that command doesn't exist do nothing.
    if (!cmd) return;

    // Run the command.
    cmd.run(bot, message, args, settings);
};