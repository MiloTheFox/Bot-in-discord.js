const log = (arg) => console.log(arg);
// import the necessary modules
const Discord = require('discord.js');
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    name: 'userinfo',
    description: 'Gets information about a user.',
    usage: 'ds!userinfo <user>',
    aliases: ['user', 'u-info', 'uinfo', 'user-info'],
    run: async(client, msg, args) => {
        try{
            const toTimestamp = (strDate) => {  
                const dt = moment(strDate).unix();  
                return dt;
            };
            let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
            if(!user) {
                    let fetching = await client.users.fetch(args[0]);
                    if (!fetching) {
                        return msg.channel.send('Unable to find user! Check the ID and try again!');
                    }
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setThumbnail(fetching.displayAvatarURL({dynamic: true}))
                        .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                        .setTitle('User-Info')
                        .addFields(
                            {name: 'Username + Discriminator:', value: `${fetching.tag}`, inline: true},
                            {name: 'Created at:', value: `**<t:${toTimestamp(moment.utc(fetching.createdTimestamp))}:F>**`, inline: true},
                            {name: 'User-ID:', value: `${fetching.id}`, inline: true},
                        )
                        .setTimestamp();
                        return msg.channel.send({embeds: [embed]});
                    }
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
                .setAuthor({name:  `${msg.author.tag}`, iconURL: user.displayAvatarURL({dynamic: true})})
                .setTitle('User-Info')
                .addFields(
                    {name: 'Joined at:', value: `**<t:${toTimestamp(moment.utc(user.joinedTimestamp))}:F>**`, inline: true},
                    {name: 'Created at:', value: `**<t:${toTimestamp(moment.utc(user.createdTimestamp))}:F>**`, inline: true},
                    {name: 'User ID:', value: user.id, inline: true},
                    {name: 'Highest Role:', value: user.roles.highest.name, inline: true},
                    {name: 'Status:', value: `${status[user.presence.status]}` , inline: true},
                    {name: 'Game:', value: `${user.presence.activities[0]}` ? `${user.presence.activities[0].state}` : `This Member doesn't play anything at the moment!`, inline: true},
                )
                .setTimestamp();
            return msg.channel.send({embeds: [embed]});
        } catch(error) {log(error);}
    }
};
