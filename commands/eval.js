exports.run = async (bot, message, args) => {

    if (message.author.id !== bot.config.ownerID) return message.reply('You do not have permission to do this');

    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
 
      message.channel.send(bot.clean(evaled), {code:"js"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${bot.clean(err)}\n\`\`\``);
    }
};

exports.help = {
    name: 'eval'
};
