exports.run = (bot, message, args) => {
    // If not bot author send reply.
    if(message.author.id !== bot.config.ownerID) return message.reply('You do not have permission to do this');

    // If there is no command specified send reply.
    if(!args || args.length < 1) return message.reply("Which command do you want me to reload? (・・ ) ?");
    const commandName = args[0];

    // Check if the command exists and is a thing.
    if(!bot.commands.has(commandName)) {
        return message.reply("I can't find that command (-ω-、)");
    }

    // The path is relative to the current folder.
    delete require.cache[require.resolve(`./${commandName}.js`)];

    // Deletes and reload the command from the bot.commands Enmap.
    bot.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    bot.commands.set(commandName, props);
    message.reply(`${commandName} has been reloaded ＼(￣▽￣)／`);
};
