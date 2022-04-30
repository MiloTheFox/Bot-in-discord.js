const Discord = require('discord.js');

module.exports = {
    name: 'id-filter',
    description: 'extracts ids from a string of text',
    usage: 'ds!id-filter <text>',
    aliases: ['idf'],
    showHelp: true,
    run: async (client, message, args) => {
        try{
            if(!args[0]) return message.channel.send('Please provide some text to extract ID\'s from.');
            const text = args.join(' ');
            const ids = text.match(/\d{17,19}/g);
            if(!ids) return message.channel.send('No ID\'s found.');
            const idList = ids.join('\n');
            const idListEmbed = new Discord.MessageEmbed()
                .setTitle('Extracted ID\'s')
                .setDescription(`${idList}`)
                .setColor('#ff0000')
                .setFooter({text:`${ids.length} ID's found.`});
            return message.channel.send({embeds: [idListEmbed]});
        } catch(error) {
            console.log(error);
        }
    }
}
