module.exports = (bot, message) => {
    //Ignores other bot
    if (message.author.bot) return;

    //Argument/command name definition.
    botPing = "<@!" + bot.user.id + ">"; //Makes bot ping variable
    if(message.content.startsWith(bot.config.prefix)) { //If message starts with prefix.
        args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if(message.content.startsWith(botPing)) { //If message starts with a ping.
        args = message.content.slice(botPing.length + 1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if(message.author.id === bot.config.ownerID) { //If i'm the one sending a message.
        args = message.content.toLowerCase().trim().split(/ +/g);
        mikuReply.send(args, message); //Stupid stuff you don't need to know.
        return;
    } else {
        return;
    }

    // Grab the command data from the bot.commands Enmap
    const cmd = bot.commands.get(command);

    // If that command doesn't exist do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(bot, message, args);
};