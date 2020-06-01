const Discord = require('discord.js');
exports.run = async (bot, message, args, settings) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Only members with Administrator permission can change guild settings.');
    if(args[0] === undefined){
        setting = '';
    } else {
        setting = args[0].toLowerCase();
        updated = args.slice(1).join(' ');
    }

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    await bot.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(`I will now respond to this prefix \`${updated}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`There has been an error: **${error.message}**`);
                }
            }
            message.channel.send(`My current prefix is \`${bot.settings.prefix}\`.`);
            break;
        }
        case 'welcomechannel': {
            if (updated) {
                let channel = message.mentions.channels.first();
                if(!channel) return message.reply('You need to mention a channel!');
                try { 
                    await bot.updateGuild(message.guild, { welcomeChannel: updated });
                    return message.channel.send(`The welcome channel has been set to: ${updated}`);
                } catch (err){
                    console.error(err);
                    message.channel.send(`There has been an error: **${error.message}**`);
                }
                
            }
            message.channel.send(`This server's welcome channel is ${bot.settings.welcomeChannel}.`);
            break;
        }
        case 'welcomemessage': {
            if(updated){
                try {
                    await bot.updateGuild(message.guild, { welcomeMessage: updated });
                    return message.channel.send(`Welcome message has been set to: \`${updated}\``);
                } catch {
                    console.error(err);
                    message.channel.send(`There has been an error: **${error.message}**`);
                }
            }
            message.channel.send(`The current welcome message is: \`${bot.settings.welcomeMessage}\``);
            break;
        }
        case 'togglewelcome': {
            if(bot.settings.welcomeEnabled === true){
                await bot.updateGuild(message.guild, {welcomeEnabled: false});
                return message.channel.send('I will now stop greeting people');
            } else if (bot.settings.welcomeEnabled === false){
                await bot.updateGuild(message.guild, {welcomeEnabled: true});
                return message.channel.send(`I will start greeting people in ${bot.settings.welcomeChannel}`);
            }
            break;
        }
        case 'modchannel': {
            if (updated) {
                let channel = message.mentions.channels.first();
                if(!channel) return message.reply('You need to mention a channel!');
                try { 
                    await bot.updateGuild(message.guild, { modLogChannel: updated });
                    return message.channel.send(`The moderation channel has been set to: ${updated}`);
                } catch (err){
                    console.error(err);
                    message.channel.send(`There has been an error: **${error.message}**`);
                }
                
            }
            message.channel.send(`This server's moderation channel is ${bot.settings.modLogChannel}.`);
            break;
        }
        case 'modrole': {
            if(updated){
                let role = message.mentions.role.first();
                if(!role) return message.reply('You need to mention a role!');
                try { 
                    await bot.updateGuild(message.guild, { moderatorRole: updated });
                    return message.channel.send(`Moderator role has been set to: ${updated}`);
                } catch (err){
                    console.error(err);
                    message.channel.send(`There has been an error: **${error.message}**`);
            }
            message.channel.send(`The server moderator role is set to: ${bot.settings.moderatorRole}`);
            break;}
        }
        case 'adminRole': {
            if(updated){
                let role = message.mentions.role.first();
                if(!role) return message.reply('You need to mention a role!');
                if(!role.hasPermission('ADMINISTRATOR')) return message.channel.send('This role does not have administrator permission');
                try { 
                    await bot.updateGuild(message.guild, { adminRole: updated });
                    return message.channel.send(`Admin role has been set to: ${updated}`);
                } catch (err){
                    console.error(err);
                    message.channel.send(`There has been an error: **${error.message}**`);
                }
            }
            message.channel.send(`The server admin role is set to: ${bot.settings.adminRole}`);
            break;
        }
        default: {
            embed = new Discord.MessageEmbed;
            embed.setTitle('Server Settings');
            embed.setAuthor(message.guild.name, message.guild.iconURL())
            embed.setThumbnail(message.guild.iconURL({format:"png", size:1024}))
	        embed.addFields(
		        { name: 'Prefix:', value: bot.settings.prefix },
		        { name: '\u200B', value: '\u200B' },
		        { name: 'Welcome Channel:', value: bot.settings.welcomeChannel, inline: true },
                { name: 'Welcome Message:', value: bot.settings.welcomeMessage, inline: true },
                { name: 'Welcome Message Status:', value: bot.settings.welcomeEnabled, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Moderation Log Channel:', value: bot.settings.modLogChannel, inline: true },
                { name: 'Moderator Role:', value: bot.settings.moderatorRole, inline: true },
                { name: 'Administrator Role:', value: bot.settings.adminRole, inline: true },
            )
            message.channel.send(embed);
            break;
        }
    }
};

exports.help = {
    name: 'setserver'
};