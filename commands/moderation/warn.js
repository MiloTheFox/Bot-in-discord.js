const Discord = require('discord.js');
const warns = require('./warns.json');
const fs = require('fs')

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    usage: 'ds!warn <user> <reason>',
    category: 'moderation',
    run: async (client, message, args) => {
        try {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('You do not have permission to use this command.');
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply('I do not have permission to use this command.');
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await message.guild.members.fetch(args[0]);
            if (!user) return message.reply('Please specify a valid user to warn.');
            if (!args[1]) return message.reply('Please specify a reason for the warn.');
            if (!warns[user.id]) warns[user.id] = [];
            const warn = {
                moderator: message.author.id,
                reason: args.slice(1).join(' '),
                date: Math.round(parseInt(Date.now()) / 1000)
            };
            warns[user.id].push(warn);
            fs.writeFile('./warns.json', JSON.stringify(warns, 2), (err) => {
                if (err) console.log(err);
            });
            const warnEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Warned User')
                .setDescription(`**User:** ${user.user.tag} (${user.id})\n**Warn:**\n**Moderator:** ${client.users.cache.get(warn.moderator).tag} (${warn.moderator})\n**Reason:** ${warn.reason}\n**Date:** <t:${warn.date}:F>`)
                .setTimestamp();
            return message.channel.send({ embeds: [warnEmbed] });
        } catch (err) {
            console.log(err);
        }
    }
}
