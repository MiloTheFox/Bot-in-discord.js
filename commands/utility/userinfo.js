const log = (arg) => console.log(arg);

// import the necessary modules
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Gets information about a user.',
    usage: 'ds!userinfo <user>',
    aliases: ['user', 'u-info', 'uinfo', 'user-info'],
    run: async (client, msg, args) => {
        try {
            let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(member => member.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase());
            if (member) {
                try {
                    const userInfo = new MessageEmbed()
                        .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                        .setColor('BLUE')
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle('User Info')
                        .setDescription(`**Tag:** ${member.user.tag}\n**ID:** ${member.user.id}\n**Bot:** ${member.user.bot ? "✅" : "❌"}\n**Created At: <t:${Math.round(parseInt(member.user.createdTimestamp) / 1000)}:F>**\n**Joined At: <t:${Math.round(parseInt(member.joinedTimestamp) / 1000)}:F>**`)
                        .setTimestamp();
                    return msg.channel.send({ embeds: [userInfo] });
                } catch (err) {
                    log(err);
                    return
                }
            } else {
                try {
                    let fetching = await client.users.fetch(args[0]);
                    const userInfo = new MessageEmbed()
                        .setAuthor({ name: `${fetching.tag}`, iconURL: fetching.avatarURL({ dynamic: true }) })
                        .setColor('BLUE')
                        .setThumbnail(fetching.displayAvatarURL({ dynamic: true }))
                        .setTitle('User Info')
                        .setDescription(`**Tag:** ${fetching.tag}\n**ID:** ${fetching.id}\n**Bot:** ${fetching.bot ? "✅" : "❌"}\n**Joined At: <t:${Math.round(parseInt(fetching.createdTimestamp) / 1000)}:F>**`)
                        .setTimestamp();
                    return msg.channel.send({ embeds: [userInfo] });
                } catch (err) {
                    log(err);
                    return
                }
            }
        } catch (error) { log(error); }
    }
};
