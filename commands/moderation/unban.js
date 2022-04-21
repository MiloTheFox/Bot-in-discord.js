const { MessageEmbed } = require('discord.js');
const rgx = /^(?:<@!?)?(\d+)>?$/;	

module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server.',
    usage: 'ds!unban <userid> (optional: reason)',
    run: async(client, msg, args) => {
        try{
            if(!msg.member.permissions.has('BAN_MEMBERS') || !msg.guild.me.permissions.has('BAN_MEMBERS')) {
                return msg.channel.send('No Permissions to unban members!');
            }
           const id = args[0];
           if(!rgx.test(id)) return msg.channel.send('Invalid user ID!');
           const bnnedUsers = await msg.guild.bans.fetch();
           const user = bnnedUsers.get(id).user;
           if(!user) return msg.channel.send('User not found!');
           if(!bnnedUsers.has(id)) return msg.channel.send(`User ID ${id} is not banned!`);
           let reason = args.slice(1).join(' ');
           if(!reason) reason = "None";
           if(!reason.length > 1024) reason = reason.slice(0, 1022) + '...';
           await msg.guild.members.unban( user, reason )
           const embed = new MessageEmbed()
              .setColor('GREEN')
                .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                .setTitle('User Unbanned!')
                .setDescription(`**User:** ${user.tag} - ${user.id}\n**Unbanned by:** ${msg.author.tag}\n**Reason:** ${reason}`)
                .setTimestamp();
                return msg.channel.send({embeds: [embed]});
            } catch(err) {
                console.log(err);
                return;
            }
    }
};
