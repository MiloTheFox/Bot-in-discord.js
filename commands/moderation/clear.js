const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clears the chat.',
    usage: 'ds!clear <amount>',
    aliases: ['purge', 'prune'],
    run: async(client, msg, args) => {
        try {
            if(!msg.member.permissions.has('MANAGE_MESSAGES') && !msg.guild.me.permissions.has('MANAGE_MESSAGES')) {
                return msg.channel.send('Missing Permission: `MANAGE_MESSAGES`');
            }
            if(!args[0]) return msg.channel.send('Please specify the amount of messages to delete!');
            else if(isNaN(args[0])) return msg.channel.send('Please specify a valid number!');
            else if(args[0] > 1000) return msg.channel.send('Please specify a number less than 1000!');
            else if(args[0] < 1) return msg.channel.send('Please specify a number greater than 1!');
            const amount = parseInt(args[0]);
            const time = Date.now();
            msg.channel.bulkDelete(amount + 1).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor({name: msg.author.tag, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setTitle('Messages Deleted')
                    .setDescription(`**Amount:** ${amount}\n**Channel:** ${msg.channel.name}`)
                    .setFooter({text: `${time - msg.createdTimestamp}ms`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setTimestamp();
                    msg.channel.send({embeds: [embed]}).then(msg => {
                        setTimeout(() => msg.delete(), 3000)}).catch()});
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
