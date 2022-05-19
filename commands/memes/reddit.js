const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
    description: 'Get a random meme',
    usage: 'ds!meme',
    category: 'memes',
    aliases: ['meme'],
    run: async (client, message, args) => {
        try {
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
            let words = shuffle(['technoblade', 'programminghorror', 'memes', 'cursedcomments'])
            let random = Math.floor(Math.random() * words.length);
            let word = words[random];
            got(`https://www.reddit.com/r/${word}/random/.json`).then(response => {
                let content = JSON.parse(response.body);
                let permalink = content[0].data.children[0].data.permalink;
                let memeURL = `https://www.reddit.com${permalink}`;
                let memeTitle = content[0].data.children[0].data.title;
                let memeDescription = content[0].data.children[0].data.selftext;
                let memeAuthor = content[0].data.children[0].data.author;
                let memeImage = content[0].data.children[0].data.url;
                let upvotes = content[0].data.children[0].data.ups;
                let downvotes = content[0].data.children[0].data.downs;
                let comments = content[0].data.children[0].data.num_comments;
                let uploadedutc = content[0].data.children[0].data.created_utc;
                // if the meme is NSFW, don't send it
                if (content[0].data.children[0].data.over_18) {
                    return message.channel.send('There was an error fetching a meme.');
                }
                // if the picture has a video, don't send it
                if (content[0].data.children[0].data.media) {
                    return message.channel.send('There was an error fetching a meme.');
                }

                let memeEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${memeTitle}`)
                    .setDescription(`${memeDescription}\n\nUploaded at: **<t:${uploadedutc}:F> - <t:${uploadedutc}:R>**`)
                    .setURL(`${memeURL}`)
                    .setImage(`${memeImage}`)
                    .setFooter({ text: `👍 ${upvotes} | 👎 ${downvotes} | 💬 ${comments} | Submitted by ${memeAuthor}` })
                return message.channel.send({ embeds: [memeEmbed] });
            }).catch(err => {
                console.log(err);
            });
        } catch (e) { console.log(e) }
    }
};
