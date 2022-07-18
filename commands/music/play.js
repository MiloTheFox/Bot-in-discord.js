const { QueryType } = require("discord-player");

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Plays Music",
    utilisation: "{prefix}play [song name/URL]",
    voiceChannel: true,

    run: async (client, message, args) => {
        try {
            if (!args[0])
                return message.channel.send({
                    content: `${message.author}, Write the name of the music you want to search. ❌`,
                });

            let res = await client.player.search(args.join(" "), {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO,
            });

            if (!res || !res.tracks.length)
                return message.channel.send({
                    content: `${message.author}, No results found! ❌`,
                });

            let queue = await client.player.createQueue(message.guild, {
                metadata: message.channel,
            });

            try {
                if (!queue.connection)
                    await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send({
                    content: `${message.author}, I can't join audio channel. ❌`,
                });
            }

            await message.channel.send({
                content: `Your ${res.playlist ? "Playlist" : "Track"} Loading... 🎧`,
            });

            if (client.config.opt.selfDeaf === false) {
                let channel = message.member.voice.channel;
                let { joinVoiceChannel } = require("@discordjs/voice");
                let connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true,
                });
            }

            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

            if (!queue.playing) await queue.play();
        } catch (e) {
            console.log(e);
        }
    },
};
