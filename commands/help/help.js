const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'help',
    description: 'Gets all bot commands.',
    usage: 'ds!help',
    run: async(client, msg, args) => {
        // initialize the help command
        try {
            const help = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help Command')
                .setDescription(`**Commands**\n\`\`\`fix\n${client.commands.map(cmd => `${cmd.name} - ${cmd.description}`).join('\n')}\`\`\`\n\n**Commands Usage**\n\`\`\`fix\n${client.commands.map(cmd => `${cmd.name} - ${cmd.usage}`).join('\n')}\`\`\``)
                .setTimestamp();
            // send the embed
            return msg.channel.send({embeds: [help]});
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
