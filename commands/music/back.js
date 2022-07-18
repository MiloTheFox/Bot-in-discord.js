module.exports = {
    name: "back",
    aliases: [],
    description: "Returns to the last played track",
    utilisation: "{prefix}back",
    voiceChannel: true,

    run: async (client, message) => {
        try {
            let queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing)
                return message.channel.send({
                    content: `${message.author}, No music queued! ❌`,
                });

            if (!queue.previousTracks[1])
                return message.channel.send({
                    content: `${message.author}, There was no music playing before ❌`,
                });

            await queue.back();

            message.channel.send({ content: `Previous music started playing... ✅` });
        } catch (e) {
            console.log(e);
        }
    },
};
