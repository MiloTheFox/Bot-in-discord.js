const Spotify = require('node-spotify-api');
const Discord = require('discord.js');

const spotify = new Spotify({
    id: '',
    secret: ''
});

module.exports = {
    name: 'play',
    description: 'Plays a song from the Spotify API.',
    usage: 'ds!play <song>',
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

        if(!msg.guild.me.permissions.has('CONNECT')) {
            return msg.channel.send('I do not have the permission to join your voice channel!');
        }
            
        if (!args[0]) {
            msg.channel.send('Please provide a song to play!');
            return;
        }
            spotify.search({
            type: 'track',
            query: args.join(' ')
        }, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
                
            if (!data.tracks.items[0]) {
                msg.channel.send('Unable to find the song!');
                return;
            }
            const track = data.tracks.items[0];
            const trackURL = track.external_urls.spotify;
            const trackName = track.name;
            const trackAlbum = track.album.name;
            const trackArtist = track.artists[0].name;
            const trackImage = track.album.images[0].url;
            const trackPreview = track.preview_url;
            const trackDuration = track.duration_ms;
            const trackDurationMinutes = Math.floor(trackDuration / 60000);
            const trackDurationSeconds = Math.floor((trackDuration % 60000) / 1000);
            const trackDurationFormatted = `${trackDurationMinutes}:${trackDurationSeconds}`;
            const trackEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Now Playing: ${trackName}`)
                .setURL(trackURL)
                .setThumbnail(trackImage)
                .addField('Album', trackAlbum, true)
                .addField('Artist', trackArtist, true)
                .addField('Duration', trackDurationFormatted, true)
                .setFooter({text: 'Use ds!skip to skip the song.'})
                .setTimestamp();
            msg.channel.send({ embeds: [trackEmbed] });
            msg.member.voice.channel.join().then(connection => {
                connection.play(trackPreview);
            });
        });
    } catch(err) {
        console.log(err);
    }
    }
};
