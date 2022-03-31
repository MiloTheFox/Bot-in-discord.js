const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    usage: 'ds!kick <user> <reason>',
    run: async(client, msg, args) => {
        try{
            if (!msg.guild.member(msg.author).hasPermission('KICK_MEMBERS')) {
                msg.channel.send('You do not have the permission to kick members!');
                return;
            }
            if (msg.member.roles.highest.position >= msg.guild.member(args[0]).roles.highest.position) {
                msg.channel.send('You cannot kick this user!');
                return;
            }
            if (msg.guild.member(msg.author).roles.highest.position <= msg.guild.member(client.user).roles.highest.position) {
                msg.channel.send('I cannot kick this user!');
                return;
            }
            if (!msg.guild.me.hasPermission('KICK_MEMBERS')) {
                msg.channel.send('I do not have the permission to kick members!');
                return;
            }
            const member = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);

            if (!member) return await msg.channel.send('Unable to find member!');
            const reason = args.slice(1).join(' ') || 'No reason provided';
            await member.kick({reason: reason});
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                .setTitle('User Kicked!')
                .setDescription(`**User:** ${member.user.tag} - ${member.id}\n**Kicked by:** ${msg.author.tag}\n**Reason:** ${reason}`)
                .setTimestamp();
                return msg.channel.send({embeds: [embed]});
        } catch(error) {console.log(error);}
    }
};
