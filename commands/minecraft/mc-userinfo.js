const Discord = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');

module.exports = {
    name: 'mc-userinfo',
    description: 'Gets information about an Minecraft user.',
    usage: 'ds!mc-userinfo username (optional: uuid)',
    run: async(client, msg, args) => {
        try{
            let username = args.slice(0).join(' ');
            let uuid = args.slice(1).join(' ');
            if(!username) {
                return msg.channel.send('You must specify a username!');
            }
            if(!uuid) {
                uuid = username.replace(/[^0-9]/g, '');
            }
            let userInfo = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`).then(res => res.json());
            let userInfoEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
            .setColor('BLUE')
            .setTitle('Minecraft User Info')
            .setDescription(`**Name:** ${userInfo.name}\n**UUID:** ${userInfo.id}`)
            .setTimestamp();
            return msg.channel.send({embeds: [userInfoEmbed]});
        } catch(err){console.log(err)}
    }
};
