const Genius = require("genius-lyrics");
const Client = new Genius.Client();
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lyrics",
    description: "Searches for lyrics of a song",
    category: "music",
    usage: "ds!lyrics <song name>",
    aliases: ["lyric"],
    run: async (client, message, args) => {
        try {
            let fetching = await Client.songs.search(args.join(" "));
            // check if the song exists
            if (!fetching) return message.channel.send("Couldn't find any lyrics for that song!");
            let firstSong = fetching[0]
            if (!firstSong.lyrics) return message.channel.send("That song has no lyrics!");
            let lyrics = await firstSong.lyrics();
            if (lyrics.length > 4096) {
                for (let i = 0; i < lyrics.length; i += 4096) {
                    let embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Lyrics for ${firstSong.title}`)
                        .setDescription(lyrics.slice(i, i + 4096))
                        .setFooter({ text: `Requested by ${message.author.tag}` });
                    message.channel.send({ embeds: [embed] });
                }
            }
            else {
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Lyrics for ${firstSong.title}`)
                    .setDescription(lyrics)
                    .setFooter({ text: `Requested by ${message.author.tag}` });
                message.channel.send({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err);
        }
    }
};
