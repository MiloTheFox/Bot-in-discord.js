const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    usage: 'ds!kick <user> <reason>',
    run: async(client, msg, args) => {
        try{
            // check if the author has the permissions to kick the specified member
            if (!msg.guild.member(msg.author).hasPermission('KICK_MEMBERS')) {
                msg.channel.send('You do not have the permission to kick members!');
                return;
            }
            // check if the author is higher than the user to kick and if yes return an error message
            if (msg.member.roles.highest.position >= msg.guild.member(args[0]).roles.highest.position) {
                msg.channel.send('You cannot kick this user!');
                return;
            }
            // check if the user is higher than the bot. If yes return an error message
            if (msg.guild.member(msg.author).roles.highest.position <= msg.guild.member(client.user).roles.highest.position) {
                msg.channel.send('I cannot kick this user!');
                return;
            }
            // check if the bot has the permissions to kick members
            if (!msg.guild.me.hasPermission('KICK_MEMBERS')) {
                msg.channel.send('I do not have the permission to kick members!');
                return;
            }
            // initialize the user to kick (get the guild member)
            const member = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
            // return an error if the user to kick is not found
            if (!member) return await msg.channel.send('Unable to find member!');
            // initialize the reason
            const reason = args.slice(1).join(' ') || 'No reason provided';
            // kick the user
            await member.kick({reason: reason});
            // send an embed to the channel
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

