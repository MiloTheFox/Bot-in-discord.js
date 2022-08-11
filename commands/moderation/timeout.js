const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'timeout',
    aliases: ["tm", "add-timeout", "atimeout", "atm"],
    description: 'Timeouts the specified user for the specified amount of time. Timeout limit is 28 Days due to Discord Limitations!',
    usage: 'ds!timeout <user> <time> (optional) <reason>',
    run: async (client, msg, args) => {
        try {
            let time = args[1];
            let reason = args.slice(2).join(' ') || 'No reason specified!';
            let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || await msg.guild.members.fetch(args[0]);
            if (!time || !user) {
                return msg.channel.send('You must specify a user and the time!');
            }
            let milliseconds = ms(time);
            if (user.permissions.has('ADMINISTRATOR')) {
                return msg.channel.send('You do not have the permission to timeout this user as they are an Administrator!');
            }
            else if (!msg.member.permissions.has('MODERATE_MEMBERS')) {
                return msg.channel.send('You do not have the Moderate Members permission to use this Command!')
            }
            else if (user.id === msg.guild.ownerId) {
                return msg.channel.send('You cannot timeout the owner of the server!');
            }
            else if (!msg.guild.me.permissions.has('MODERATE_MEMBERS')) {
                return msg.channel.send('I do not have the permission to timeout this user!');
            }
            else if (user.id === client.user.id) {
                return msg.channel.send('I cannot timeout myself!');
            }
            else if (milliseconds > 28 * 24 * 60 * 60 * 1000) {
                return msg.channel.send('The timeout limit is 28 Days due to Discord Limitations!');
            }
            else if (!user.isCommunicationDisabled()) {
                await user.timeout(milliseconds, reason);
                let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('BLUE')
                    .setTitle('Timeout')
                    .setDescription(`**User:** ${user.user.tag}\n**Time:** **<t:${Math.round(parseInt(Date.now() + milliseconds) / 1000)}:R>**\n**Reason:** ${reason}`)
                    .setTimestamp();
                return msg.channel.send({ embeds: [embed] });
            } else {
                return msg.channel.send("The User is already timeouted")
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }
};
