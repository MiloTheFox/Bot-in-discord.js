const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Gets information about the server.',
    usage: 'ds!serverinfo',
    run: async(client, msg, args) => {
        try {
        let serverinfo = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${msg.guild.name} Server Information`)
            .setThumbnail(msg.guild.iconURL({dynamic: true}))
            .addField('Server Name', `${msg.guild.name}`)
            .addField('Server ID', `${msg.guild.id}`)
            .addField('Server Creation Date', `**<t:${Math.round(parseInt(msg.guild.createdTimestamp) / 1000)}:F>**`)
            .addField('Server Owner', `<@!${msg.guild.ownerId}> - \`(${msg.guild.ownerId})\``)	
            .addField('Server Region', `${msg.guild.preferredLocale}`)
            .addField('Server Members', `${msg.guild.memberCount}`)
            .addField('Server Channels', `${msg.guild.channels.cache.size}`)
            .addField('Server Roles', `${msg.guild.roles.cache.size}`)
            .setTimestamp();
        return msg.channel.send({embeds: [serverinfo]});
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
