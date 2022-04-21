const Discord = require('discord.js')

module.exports = {
    name: 'howgay',
    description: 'Gives a Percentage of how gay someone is (for legal reasons it\'s just for fun)',
    aliases: ['hg'],
    showHelp: true,
    usage: "ds!howgay (optional: Member)",
    run: async (client, message, args) => {
        try{
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) {
                let fetching = await client.users.fetch(args[0]);
                if (!fetching) {
                        return msg.channel.send('Unable to find user! Check the ID and try again!');
                    }
                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setThumbnail(fetching.displayAvatarURL({dynamic: true}))
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setDescription(`🏳️‍🌈 ${fetching.tag} is ${Math.floor(Math.random() * 100)}% Gay 🏳️‍🌈`)
                    .setFooter({text: `${Date.now() - message.createdTimestamp} ms`, iconURL: message.member.displayAvatarURL({dynamic: true})})
                    .setTimestamp()
                    return message.channel.send({embeds: [embed]})
            }
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
            	.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                .setAuthor({name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL({dynamic: true})})
                .setDescription(`🏳️‍🌈 ${member.user.tag} is ${Math.floor(Math.random() * 100)}% Gay 🏳️‍🌈`)
                .setFooter({text: `${Date.now() - message.createdTimestamp} ms`, iconURL: message.member.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                return message.channel.send({embeds: [embed]})
        } catch(err) {
            console.log(err);
            return;
        }
    }
};
