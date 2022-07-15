let log = (arg) => console.log(arg);

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Gets information about a user.',
    usage: 'ds!userinfo <user>',
    aliases: ['user', 'u-info', 'uinfo', 'user-info'],
    run: async (client, msg, args) => {
        try {
            let member = msg.mentions.members.first();
            if (!member) {
                try {
                    member = await msg.guild.members.fetch(args[0]);
                } catch (err) {
                    let fetching = await client.users.fetch(args[0]).then((fetching) => {
                        let userInfo = new MessageEmbed()
                            .setAuthor({ name: `${fetching.tag}`, iconURL: fetching.user.displayAvatarURL({ dynamic: true }) })
                            .setColor('BLUE')
                            .setThumbnail(fetching.displayAvatarURL({ dynamic: true }))
                            .setTitle('User Info')
                            .setDescription(`**Tag:** ${fetching.tag}\n**ID:** ${fetching.id}\n**Bot:** ${fetching.bot ? "✅" : "❌"}\n**Joined At: <t:${Math.round(parseInt(fetching.createdTimestamp) / 1000)}:F>**`)
                            .setTimestamp();
                        return msg.channel.send({ embeds: [userInfo] });
                    });
                }
            let userEmbed = new MessageEmbed()
                .setAuthor({ name: `${member.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setColor('BLUE')
                .setTitle('User Info')
                .setDescription(`**Tag:** ${member.tag}\n**ID:** ${member.user.id}\n**Bot:** ${member.user.bot ? "✅" : "❌"}\n**Created At: <t:${Math.round(parseInt(member.user.createdTimestamp) / 1000)}:F>**\n**Joined At: <t:${Math.round(parseInt(member.joinedTimestamp) / 1000)}:F>**`)
                .setTimestamp();
            return msg.channel.send({ embeds: [userEmbed] });
        }
    } catch (error) { log(error); }
}
}
