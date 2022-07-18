const warns = require('/home/container/commands/moderation/warns.json');
const Discord = require('discord.js');

module.exports = {
    name: 'checkwarns',
    description: 'Check a user\'s warns',
    usage: 'checkwarns <user>',
    category: 'moderation',
    run: async (client, message, args) => {
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command.');
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply('I do not have permission to use this command.');
            if (!args[0]) return message.reply('Please specify a user to check.');
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Please specify a valid user to check.');
            if (!warns[user.id]) return message.reply('That user has no warns.');
            let warnEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Warned User')
                .setDescription(`**User:** ${user.tag} (${user.id})\n**Warns:**\n${warns[user.id].map(warn => `**Moderator:** ${client.users.cache.get(warn.moderator).tag} (${warn.moderator})\n**Reason:** ${warn.reason}\n**Date:** ${warn.date}`).join('\n')}`)
                .setTimestamp();
            return message.channel.send({ embeds: [warnEmbed] });
        } catch (err) { console.log(err) }
    }
};
