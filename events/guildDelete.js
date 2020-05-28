const sendEmbed = require('../misc/embeds.js');
module.exports = async (bot, guild) => {
    cmd = "";
    cmd = cmd.concat("=============================================\n")
    cmd = cmd.concat(`${Date().toString().substring(0, Date().toString().length - 22)} JST:\n`);
    cmd = cmd.concat(`I was removed from ${guild.name} or the server was deleted.\n`);
    cmd = cmd.concat(`Owner: ${guild.owner.user.tag}.\n`);
    cmd = cmd.concat(`I am now in: ${bot.guilds.cache.array().length} guild(s).\n`)
    cmd = cmd.concat("=============================================\n")
    console.log(cmd);
    channelLog = bot.guilds.cache.get("683182971850981485").channels.cache.get("712965630130782236");
    sendEmbed.send(channelLog, "Runtime log", cmd)
}