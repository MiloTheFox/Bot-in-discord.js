const log = (arg) => console.log(arg);

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Gets information about a user.',
    usage: 'ds!userinfo <user>',
    aliases: ['user', 'u-info', 'uinfo', 'user-info', ' userinfo', ' user', ' u-info', ' uinfo', ' user-info'],
    run: async (client, msg, args) => {
        try {
            let member = msg.mentions.members.first() || await msg.guild.members.fetch(args[0]) || msg.guild.members.get(args[0]);
            if (!args[0]) {
                console.log('Number 1')
                member = msg.member;
                let authorEmbed = new MessageEmbed()
                    .setAuthor({ name: `${member.user.tag}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                    .setColor('BLUE')
                    .setTitle('User Info')
                    .addFields(
                        { name: 'Tag', value: `${member.user.tag}`, inline: true },
                        { name: 'ID', value: `${member.id}`, inline: true },
                        { name: 'Bot', value: `${member.bot ? "✅" : "❌"}`, inline: true },
                        { name: 'Created At', value: `**<t:${Math.round(parseInt(member.user.createdTimestamp) / 1000)}:F>**`, inline: true },
                        { name: 'Joined At', value: `**<t:${Math.round(parseInt(member.joinedTimestamp) / 1000)}:F>**`, inline: true },
                        { name: 'Roles', value: `${member.roles.cache.map(r => r.name).join('\n')}`, inline: false },
                        { name: 'Admin', value: `${member.permissions.has('ADMINISTRATOR') ? "✅" : "❌"}`, inline: true }
                    )
                    .setTimestamp();
                return msg.channel.send({ embeds: [authorEmbed] });
            } else {
                console.log('Number 2')
                let memberEmbed = new MessageEmbed()
                    .setAuthor({ name: `${member.user.tag}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                    .setColor('BLUE')
                    .setTitle('User Info')
                    .addFields(
                        { name: 'Tag', value: `${member.user.tag}`, inline: true },
                        { name: 'ID', value: `${member.id}`, inline: true },
                        { name: 'Bot', value: `${member.bot ? "✅" : "❌"}`, inline: true },
                        { name: 'Created At', value: `**<t:${Math.round(parseInt(member.user.createdTimestamp) / 1000)}:F>**`, inline: true },
                        { name: 'Joined At', value: `**<t:${Math.round(parseInt(member.joinedTimestamp) / 1000)}:F>**`, inline: true },
                        { name: 'Roles', value: `${member.roles.cache.map(r => r.name).join('\n')}`, inline: false },
                        { name: 'Admin', value: `${member.permissions.has('ADMINISTRATOR') ? "✅" : "❌"}`, inline: true }
                    )
                    .setTimestamp();
                return msg.channel.send({ embeds: [memberEmbed] });
            }
        } catch (err) {
            console.log('Number 3')
            await client.users.fetch(args[0]).then((fetching) => {
                let userInfo = new MessageEmbed()
                    .setAuthor({ name: `${fetching.tag}`, iconURL: fetching.displayAvatarURL({ dynamic: true }) })
                    .setColor('BLUE')
                    .setThumbnail(fetching.displayAvatarURL({ dynamic: true }))
                    .setTitle('User Info')
                    .addFields(
                        { name: 'Tag', value: `${fetching.tag}`, inline: true },
                        { name: 'ID', value: `${fetching.id}`, inline: true },
                        { name: 'Bot', value: `${fetching.bot ? "✅" : "❌"}`, inline: true },
                        { name: 'Created At', value: `**<t:${Math.round(parseInt(fetching.createdTimestamp) / 1000)}:F>**`, inline: true },
                    )
                    .setTimestamp();
                return msg.channel.send({ embeds: [userInfo] });
            }).catch((err) => {
                log(err)
                return msg.channel.send('User not found! Check your Input!');
            });
        }
    }
};
