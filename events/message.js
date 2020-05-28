const mikuReply = require('../misc/replies.js');
module.exports = async (bot, message) => {
    botPing = `<@${bot.user.id}>`;
    if(message.author.bot) return;

    if(message.content.startsWith(bot.config.prefix)) {
        args = message.content.slice(bot.config.prefix).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if(message.content.startsWith(botPing)) {
        args = message.content.slice(botPing.length + 1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
    } else if(message.author.id === bot.config.ownerID) {
        args = message.content.toLowerCase().trim().split(/ +/g);
        mikuReply.send(args, message);
        return;
    } else {
        return;
    }

    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if(!cmd) return;

    cmd.run(bot, message, args);
};