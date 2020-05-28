const Discord = require('discord.js');
module.exports =  {
    send(channel, title, description) {
            embed = new Discord.MessageEmbed;
            embed.setTitle(title);
            embed.setColor("BLUE")
            embed.setDescription(description)
            embed.setFooter(Date().toString().substring(0, Date().toString().length-22))
            channel.send(embed=embed)
        }
    };