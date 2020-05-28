const config = {
    'ownerID': '190308487316766720',

    'defaultSettings': {
        'prefix': '+',
        'modLogChannel': 'mod-log',
        'modRole': 'Moderator',
        'adminrole': 'Admin',
        'sysNotice': 'true',
        'welcomeChannel': 'Welcome',
        "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
        "welcomeEnabled": "false"
    },

    permLevels: [
        { level: 0,
            name: "User",
            check: () => true
        },

        { level: 2,
            name: "Moderator",
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(role => role.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },

        { level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(role => role.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }
        },

        { level: 4,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },

        { level: 5,
            name: "Bot Owner",
            check: (message) => message.bot.config.ownerID === message.author.id
        }
    ]

};

module.exports = config;