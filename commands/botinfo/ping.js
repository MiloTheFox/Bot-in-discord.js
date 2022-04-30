const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ["latency"],
    description: 'Returns the Bot\'s latency!',
    run: async (client, message, args) => {
        try{
        const start = Date.now();
        message.channel.send('Ping!').then(m => {
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(client.user.username + " - Pong!")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`Message Ping`, `\`${Date.now() - start}ms\` 🛰️`)
                .addField(`Message Latency`, `\`${m.createdTimestamp - start}ms\` 🛰️`)
                .addField(`API Latency`, `\`${Math.round(client.ws.ping)}ms\` 🛰️`)
                .setTimestamp()
                .setFooter({ text: `Made by ${client.users.cache.get('705557092802625576').tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
            m.edit({ embeds: [embed] });
        });
        } catch(error){
            console.log(error);
        }
    }
};
