let timeDifference = require('../miku.js').timeDifference;
const sendEmbed = require('../misc/embeds.js');
module.exports = async bot => {
    cmd = '';
    cmd = cmd.concat(`=============================================\n`);
    cmd = cmd.concat(`${Date().toString().substring(0, Date().toString().length-22)} JST: Junbi OK! \n`);
    timeDifference.push(Date.now());
    cmd = cmd.concat(`Mikubot Online.\n`);
    cmd = cmd.concat(`It took me ${(timeDifference[1] - timeDifference [0])} ms to start.\n`)
    cmd = cmd.concat(`Name: ${bot.user.username}#${bot.user.discriminator}\n`);
    cmd = cmd.concat(`ID: ${bot.user.id}\n`);
    cmd = cmd.concat(`I am currently in: ${bot.guilds.cache.array().length} guild(s).\n`);
    cmd = cmd.concat(`みくみくにしてあげる～\n`);
    cmd = cmd.concat(`=============================================\n`);
    console.log(cmd);
    bot.user.setActivity(`Me being developed!`, {type: "WATCHING"});
        if(bot.user.id === '712728285305503744'){
        channelLog = bot.guilds.cache.get('683182971850981485').channels.cache.get('712965630130782236');
        sendEmbed.send(channelLog, "Mikubot Startup Log:", cmd);
    }
}