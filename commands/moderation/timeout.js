const Discord = require('discord.js');
const fetch = require('node-fetch');
const ms = require('ms');

// initialize the timeout command
module.exports = {
    name: 'timeout',
    description: 'Mutes the specified user for the specified amount of time. The limit is 28 Days due to Discord Limitations!',
    usage: 'ds!timeout <user> <time> (optinal)<reason>',
    run: async(client, msg, args) => {
        try{
            const time = args.slice(1).join(' ');
            let reason = args.slice(2).join(' ');
            const milliseconds = ms(time);
            const user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(member => member.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase());
            if(!time) {
                return msg.channel.send('You must specify a time!');
            }
            if(!user) {
                return msg.channel.send('You must specify a user!');
            }
            if(user.permissions.has('ADMINISTRATOR')) {
                return msg.channel.send('You do not have the permission to timeout this user!');
            }
            if(!msg.guild.me.permissions.has('MODERATE_MEMBERS')) {
                return msg.channel.send('I do not have the permission to timeout this user!');
            }
            if(user.id === msg.guild.ownerId) {
                return msg.channel.send('You cannot timeout the owner of the server!');
            }
            if(user.id === client.user.id) {
                return msg.channel.send('I cannot timeout myself!');
            }
            if(!reason) {
                reason = 'No reason specified!';
            }
            const iosTime = new Date(Date.now() + milliseconds).toISOString();
            if(iosTime >= 2419200) {
                return msg.channel.send('The timeout limit is 28 Days due to Discord Limitations!');
            }
            await fetch(`https://discordapp.com/api/guilds/${msg.guild.id}/members/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ communication_disabled_until: iosTime }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${client.token}`,
                },
            });
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
            .setColor('BLUE')
            .setTitle('Timeout')
            .setDescription(`**User:** ${user.user.tag}\n**Time:** ${time}\n**Reason:** ${reason}`)
            .setTimestamp();
            return msg.channel.send({embeds: [embed]});
        } catch(error) {
            console.log(error);
        }
    }
};
