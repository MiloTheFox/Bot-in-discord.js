const warns = require('/home/container/commands/moderation/warns.json');
const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'deletewarns',
    description: 'Delete a user\'s warns',
    usage: 'deletewarns <user> <amount>',
    category: 'moderation',
    guildOnly: true,
    run: async (client, message, args) => {
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command.');
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply('I do not have permission to use this command.');
            if (!args[0]) return message.reply('Please specify a user to delete warns from.');
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.reply('Please specify a valid user to delete warns from.');
            if (!args[1]) return message.reply('Please specify how many warns to delete.');
            let amount = parseInt(args[1]);
            if (isNaN(amount)) return message.reply('Please specify a valid number of warns to delete.');
            if (amount > warns[user.id].length) return message.reply('That user has less than that many warns.');
            let warnEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Warned User')
                .setDescription(`**User:** ${user.tag} (${user.id})\n**Warns Deleted:**\n${warns[user.id].splice(0, amount).map(warn => `**Moderator:** ${client.users.cache.get(warn.moderator).tag} (${warn.moderator})\n**Reason:** ${warn.reason}\n**Date:** ${warn.date}`).join('\n')}`)
                .setTimestamp();
            message.channel.send({ embeds: [warnEmbed] });
            fs.writeFile('./warns.json', JSON.stringify(warns, 2), (err) => {
                if (err) console.log(err);
            });
        } catch (err) { console.log(err) }
    }
}
