const log = (arg) => console.log(arg);

const Discord = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'github-info',
    description: 'Gets information about a github user.',
    usage: 'ds!github-info <user>',
    run: async(client, msg, args) => {
        try{
            const toTimestamp = (strDate) => {
                const dt = moment(strDate).unix();
                return dt;
            };

            let user = args[0];
            let github = await fetch(`https://api.popcat.xyz/github/${user}`).then(res => res.json());
            if (github.error) {
                return msg.channel.send('Unable to find user! Check your Input and try again!');
            }
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setThumbnail(github.avatar)
                .setAuthor({name: `${github.name}`, iconURL: github.avatar})
                .setTitle('Github-Info')
                .addFields(
                    {name: 'Repositories:', value: `${github.public_repos}`, inline: true},
                    {name: 'Followers:', value: `${github.followers}`, inline: true},
                    {name: 'Following:', value: `${github.following}`, inline: true},
                    {name: 'Github URL:', value: `${github.url}`, inline: true},
                    {name: 'Bio:', value: `${github.bio}`, inline: true},
                    {name: 'Company:', value: `${github.company}`, inline: true},
                    {name: 'Location:', value: `${github.location}`, inline: true},
                    {name: 'Account Type:', value: `${github.account_type}`, inline: true},
                    {name: 'Created at:', value: `**<t:${toTimestamp(moment.utc(github.created_at))}:F>**`, inline: true},
                )
                .setTimestamp();
            return msg.channel.send({embeds: [embed]});
        } catch(error) {
            log(error);
            return;
        }
    }
};
