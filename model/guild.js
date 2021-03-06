const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerUsername: String,
    prefix: String,
    modLogChannel: String,
    moderatorRole: String,
    adminRole: String,
    systemNotice: Boolean,
    welcomeChannel: String,
    welcomeMessage: String,
    welcomeEnabled: String
    
});

module.exports = mongoose.model('Guild', guildSchema);