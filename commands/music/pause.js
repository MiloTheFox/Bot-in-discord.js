module.exports = {
    name: "pause",
    aliases: [],
    description: "Pauses the Music",
    utilisation: "{prefix}pause",
    voiceChannel: true,

    run: async (client, message) => {
        try {
            let queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing)
                return message.channel.send({
                    content: `${message.author}, There is no music currently playing!. ❌`,
                });

            let success = queue.setPaused(true);

            return message.channel.send({
                content: success
                    ? `The currently playing music named **${queue.current.title}** has stopped ✅`
                    : `${message.author}, Something went wrong. ❌`,
            });
        } catch (e) {
            console.log(e);
        }
    },
};
