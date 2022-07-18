const log = (arg) => console.log(arg);

const Discord = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment')

module.exports = {
    name: 'github-info',
    description: 'Gets information about a github user.',
    usage: 'ds!github-info <user>',
    run: async(client, msg, args) => {
        try{
            let user = args[0];
            let github = await fetch(`https://api.github.com/users/${user}`).then(res => res.json());
            if (github.error) {
                return msg.channel.send('Unable to find user! Check your Input and try again!');
            }
            let embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(github.avatar_url)
                .setAuthor({name: `${github.name}`, iconURL: github.avatar_url})
                .setTitle('Github-Info')
                .addFields(
                    {name: 'Name', value: `${github.name}`, inline: true},
                    {name: 'Company', value: `${github.company}`, inline: true},
                    {name: 'Location', value: `${github.location}`, inline: true},
                    {name: 'Followers', value: `${github.followers.toLocaleString()}`, inline: true},
                    {name: 'Following', value: `${github.following.toLocaleString()}`, inline: true},
                    {name: 'Public Repos', value: `${github.public_repos}`, inline: true},
                    {name: 'Public Gists', value: `${github.public_gists}`, inline: true},
                    {name: 'Created', value: `${moment(github.created_at).format('MMMM Do YYYY, h:mm:ss a')}`, inline: true},
                    {name: 'Bio', value: github.bio ? `${github.bio}` : 'No bio set!', inline: true},
                    {name: 'Twitter', value: github.twitter_username ? `${github.twitter_username}` : 'No twitter username set!', inline: true},
                    {name: 'Github URL', value: `[Click Here](${github.html_url})`, inline: true},
                )
                .setTimestamp();
            return msg.channel.send({embeds: [embed]});
        } catch(error) {
            log(error);
            return;
        }
    }
};
