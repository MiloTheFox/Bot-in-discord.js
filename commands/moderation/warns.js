const warns = require('/home/container/commands/moderation/warns.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    usage: 'warn <user> <reason>',
    category: 'moderation',
    guildOnly: true,
    run: async (client, message, args) => {
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command.');
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply('I do not have permission to use this command.');
            if (!args[0]) return message.reply('Please specify a user to warn.');
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            let reason = args.slice(1).join(' ') || 'No reason given.';
            let warnEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Warned User')
                .setDescription(`**User:** ${user.tag} (${user.id})\n**Warned By:** ${message.author.tag} (${message.author.id})\n**Reason:** ${reason}`)
                .setTimestamp();
            message.channel.send({ embeds: [warnEmbed] });
            if (!warns[user.id]) warns[user.id] = [];
            warns[message.guild.id].push({
                moderator: message.author.id,
                reason: reason,
                date: new Date(),
                guildid: message.guild.id
            });
            fs.writeFile('./warns.json', JSON.stringify(warns, 2), (err) => {
                if (err) console.log(err);
            }
            );
        } catch (err) { console.log(err) }
    }
};
