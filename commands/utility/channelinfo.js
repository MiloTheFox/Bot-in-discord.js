const Discord = require('discord.js');
const moment = require('moment');

// initialize the channelinfo command
module.exports = {
    name: 'channelinfo',
    description: 'Gets information about the channel.',
    usage: 'ds!channelinfo',
    run: async (client, msg, args) => {
        try {
            let channel = msg.guild.channels.cache.get(args[0]) || msg.channel;
            if (!channel) {
                return msg.channel.send('You must specify a channel!');
            }
            let channelinfo = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${msg.channel.name} Channel Information`)
                .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                .addField('Channel Name', `${msg.channel.name}`)
                .addField('Channel ID', `${msg.channel.id}`)
                .addField('Channel Creation Date', `**<t:${Math.round(parseInt(msg.channel.createdTimestamp) / 1000)}:F>**`)
                .addField('Channel Type', `${msg.channel.type}`)
                .addField('Channel Topic', `${msg.channel.topic}`)
                .addField('Channel Position', `${msg.channel.position}`)
                .setTimestamp();
            return msg.channel.send({ embeds: [channelinfo] });
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
