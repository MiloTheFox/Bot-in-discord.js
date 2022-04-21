const { MessageEmbed } = require('discord.js');
const Spotify = require('node-spotify-api');

module.exports = {
    name: 'skip',
    description: 'Skips the current song.',
    usage: 'ds!skip',
    run: async(client, msg, args) => {
        try{
            if (!msg.member.permissions.has('SPEAK')) {
                msg.channel.send('You do not have the permission to use this command!');
                return;
            }
            if (!msg.guild.me.permissions.has('SPEAK')) {
                msg.channel.send('I do not have the permission to use this command!');
                return;
            }
            if (!client.queue[msg.guild.id]) {
                msg.channel.send('There is nothing playing!');
                return;
            }
            // search for the song
            Spotify.search({
                type: 'track',
                query: args.join(' ')
            }, (error, data) => {
                if(error){
                    console.log(error);
                } else if (!data.tracks.items[0]) {
                    msg.channel.send('Unable to find the song!');
                    return;
                }
            const track = data.tracks.items[0];
            const trackURL = track.external_urls.spotify;
            const trackName = track.name;
            const trackAlbum = track.album.name;
            const trackArtist = track.artists[0].name;
            const trackImage = track.album.images[0].url;
            const trackDuration = track.duration_ms;
            const trackDurationMinutes = Math.floor(trackDuration / 60000);
            const trackDurationSeconds = Math.floor((trackDuration % 60000) / 1000);
            const trackDurationFormatted = `${trackDurationMinutes}:${trackDurationSeconds}`;
            const skippedEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Skipped Song')
                .addFields({ name: 'Song', value: `${trackName}`, inline: true },
                { name: 'Album', value: `${trackAlbum}`, inline: true },
                { name: 'Artist', value: `${trackArtist}`, inline: true },
                { name: 'Duration', value: `${trackDurationFormatted}`, inline: true},
                {name: 'URL', value: `[Click Here](${trackURL})`, inline: true})
                .setThumbnail(trackImage)
                .setTimestamp()
                .setFooter({text: 'Powered by Spotify', iconURL: 'https://i.imgur.com/wSTFkRM.png'});
                return msg.channel.send({embeds: [skippedEmbed]});
            });
        }
        catch(err){
            console.log(err);
        }
    }
};
