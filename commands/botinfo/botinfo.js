const { MessageEmbed } = require('discord.js');
const os = require('os');
const { version } = require('discord.js');
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: 'botinfo',
    aliases: ['about', 'clientinfo'],
    usage: "ds!botinfo",
    description: 'Prints the bot\'s info (name, id, etc.)',
    run: async(client, message, args) => {
        try{
        // get the bot's info
        const botowner = await client.users.fetch('705557092802625576');
        let ptfm = os.platform().replace('linux', 'Linux')
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTitle('About')
            .addFields(
                {name: 'Bot Name:', value: client.user.username, inline: true},
                {name: 'Bot ID:', value: client.user.id, inline: true},
                {name: 'discord.js Version:', value: version, inline: true},
                {name: 'Node Version:', value: process.version, inline: true},
                {name: 'OS:', value: ptfm, inline: true},
                {name: 'Uptime:', value: `${prettyMilliseconds(client.uptime)}`, inline: true},
            )
        	.setFooter({text: `Made with ❤️ by ${botowner.tag}`, iconURL: botowner.displayAvatarURL()})
            .setTimestamp();
        // send the embed
        return message.channel.send({embeds: [embed]});
        } catch(err){
            console.log(err);
        }
    }
};
