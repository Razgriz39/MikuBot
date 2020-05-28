timeDifference = require('../miku.js');
const Discord = require('discord.js');
module.exports = {
    send(args, message) {
        if(((args.includes('hello'))||(args.includes('hey'))||(args.includes('hi'))) &&
            (args.includes('miku'))){
                message.channel.send('Hello Master!');
        }
        if(((args.includes('gonna'))||(args.includes('go'))||(args.includes('imma'))||(args.includes('i\'ll'))) &&
            (args.includes('sleep'))){
            message.channel.send('Sleep well!\nHave a sweet dream!');
        }
        if(((args.includes('thank'))||(args.includes('thanks'))) &&
            (args.includes('miku'))){
            message.channel.send('Ehehe~');
        }
        if((args.includes('kiss')) && (args.includes('miku'))){
            message.channel.send(`(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄`);
        }
    }
}