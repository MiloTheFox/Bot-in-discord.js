const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'facebook',
    description: 'Get a random meme from Facebook',
    usage: 'ds!facebook',
    aliases: ['fb'],
    category: 'memes',
    run: async (client, message, args) => {
        try {
            let url = await fetch("https://www.reddit.com/r/facebook/hot.json?limit=100").then(res => res.json());
            let random = Math.floor(Math.random() * url.data.children.length);
            let post = url.data.children[random].data;
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${post.title}`)
                .setURL(`${post.url}`)
                .setImage(`${post.url}`)
                .setFooter({ text: `Submitted by ${post.author}` })
            message.channel.send({ embeds: [embed] });
        }
        catch (err) {
            console.log(err)
        }
    }
};
