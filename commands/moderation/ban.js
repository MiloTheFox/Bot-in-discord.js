const log = (arg) => console.log(arg);

const Discord = require('discord.js');

module.exports = {
     name: 'ban',
     description: 'Bans a user from the server.',
     usage: 'ds!ban <user> <reason>',
     run: async(client, msg, args) => {
    try {
            const user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(member => member.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase());

            const reason = args.slice(1).join(' ');
            if (!msg.member.permissions.has('BAN_MEMBERS')) {
                msg.channel.send('You do not have the permission to ban members!');
                return;
            }

            if (!msg.guild.me.permissions.has('BAN_MEMBERS')) {
                msg.channel.send('I do not have the permission to ban members!');
                return;
            }
            if (!user) {
                try {
                let fetching = await client.users.fetch(args[0]);
                if(!fetching) {
                    return msg.channel.send('Unable to find user! Check the ID and try again!');
                }
                msg.guild.members.ban(fetching.id, {reason: reason});
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                    .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setTitle('User Banned!')
                    .setDescription(`**User:** ${fetching.tag} - ${fetching.id}\n**Banned by:** ${msg.author.tag}\n**Reason:** ${reason}`)
                    .setTimestamp();
                    return msg.channel.send({embeds: [embed]});
                } catch(error) {
                    log(error);
                }
            }
                if (user) {
                    if (user.id === msg.guild.ownerId) {
                        msg.channel.send('You cannot ban the owner of the server!');
                        return;
                    }

                    if (user.id === client.user.id) {
                        msg.channel.send('I cannot ban myself!');
                        return;
                    }
                    msg.guild.members.ban(user.id, {reason: reason});
                    const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                        .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                        .setTitle('User Banned!')
                        .setDescription(`**User:** ${user.user.tag} - ${user.id}\n**Banned by:** ${msg.author.tag} - ${msg.author.id}\n**Reason:** ${reason}`)
                        .setTimestamp();
                        return msg.channel.send({embeds: [embed]});
            }
         } catch (error) {
                log(error);
                return msg.channel.send('An error occurred! Please try again!');
            }
    }
};
