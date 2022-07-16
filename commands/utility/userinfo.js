const log = (arg) => console.log(arg);

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Gets information about a user.',
    usage: 'ds!userinfo <user>',
    aliases: ['user', 'u-info', 'uinfo', 'user-info', ' userinfo', ' user', ' u-info', ' uinfo', ' user-info'],
    run: async (client, msg, args) => {
        try {
            let member = msg.mentions.members.first();
            if (!args[0]) {
                member = msg.member;
                const authorEmbed = new MessageEmbed()
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
                        { name: 'Roles', value: `${member.roles.cache.map(r => r.name).join(' ')}`, inline: false },
                        { name: 'Admin', value: `${member.permissions.has('ADMINISTRATOR') ? "✅" : "❌"}`, inline: true }
                    )
                    .setTimestamp();
                return msg.channel.send({ embeds: [authorEmbed] });
            } else if (member) {
                const memberEmbed = new MessageEmbed()
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
                        { name: 'Roles', value: `${member.roles.cache.map(r => r.name).join(' ')}`, inline: false },
                        { name: 'Admin', value: `${member.permissions.has('ADMINISTRATOR') ? "✅" : "❌"}`, inline: true }
                    )
                    .setTimestamp();
                return msg.channel.send({ embeds: [memberEmbed] });
            } else {
                try {
                    member = await msg.guild.members.fetch(args[0]);
                    const userEmbed = new MessageEmbed()
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
                        { name: 'Roles', value: `${member.roles.cache.map(r => r.name).join(' ')}`, inline: false },
                        { name: 'Admin', value: `${member.permissions.has('ADMINISTRATOR') ? "✅" : "❌"}`, inline: true }
                    )
                        .setTimestamp();
                    return msg.channel.send({ embeds: [userEmbed] });
                } catch (err) {
                    await client.users.fetch(args[0]).then((fetching) => {
                        const userInfo = new MessageEmbed()
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
        } catch (err) { log(err); }
    }
}
