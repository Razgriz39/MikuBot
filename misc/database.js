const mongoose = require('mongoose');
const db = require('../bruh.json');

module.exports = {
    init: () => {
        const databaseOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4 
        };

        mongoose.connect(`mongodb://${db.User}:${db.Pass}@discord-guild-shard-00-00-fbghz.gcp.mongodb.net:27017,discord-guild-shard-00-01-fbghz.gcp.mongodb.net:27017,discord-guild-shard-00-02-fbghz.gcp.mongodb.net:27017/Discord?ssl=true&replicaSet=Discord-Guild-shard-0&authSource=admin&retryWrites=true&w=majority`, databaseOption);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Connection established with the database cluster.');
        });
        
        mongoose.connection.on('err', err => {
            console.error(`Error while connecting to database cluster:\n${err.stack}`);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Connection lost with the database cluster.');
        });
    }
}