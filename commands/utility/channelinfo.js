const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'channelinfo',
    description: 'Gets information about the channel.',
    usage: 'ds!channelinfo',
    run: async(client, msg, args) => {
        try {
            const toTimestamp = (strDate) => {
                const dt = moment(strDate).unix();
                return dt;
            };
            const channelinfo = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${msg.channel.name} Channel Information`)
                .setThumbnail(msg.guild.iconURL({dynamic: true}))
                .addField('Channel Name', `${msg.channel.name}`)
                .addField('Channel ID', `${msg.channel.id}`)
                .addField('Channel Creation Date', `**<t:${toTimestamp(moment.utc(msg.channel.createdTimestamp))}:F>**`)
                .addField('Channel Type', `${msg.channel.type}`)
                .addField('Channel Topic', `${msg.channel.topic}`)
                .addField('Channel Position', `${msg.channel.position}`)
                .setTimestamp();
            return msg.channel.send({embeds: [channelinfo]});
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
