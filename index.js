const { Client, Collection } = require('discord.js');
const client = new Client({ 
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'EMOJI', 'MESSAGE_REACTION', 'VOICE_STATE', 'WEBHOOK', 'INVITE', 'TYPING_START', 'PRESENCE'],
    intents: 32767,
 });
const config = require('./config.json');
const fs = require('fs');

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity(`${config.prefix}ping`, { type: 'PLAYING' });
});

client.categories = fs.readdirSync('./commands');

// load the files
['command'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
client.login(config.token);
