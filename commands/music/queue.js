const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Sends the current Music Queue",
    utilisation: "{prefix}queue",
    voiceChannel: true,

    run: async (client, message, args) => {
        try {
            let queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing)
                return message.channel.send({
                    content: `${message.author}, There is no music currently playing!. ❌`,
                });

            if (!queue.tracks[0])
                return message.channel.send({
                    content: `${message.author}, No music in queue after current. ❌`,
                });

            let embed = new MessageEmbed();
            let methods = ["🔁", "🔂"];

            embed.setColor("RED");
            embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
            embed.setTitle(
                `Server Music List - ${message.guild.name} ${methods[queue.repeatMode]}`
            );

            let tracks = queue.tracks.map(
                (track, i) =>
                    `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track.requestedBy.id
                    }>)`
            );

            let songs = queue.tracks.length;
            let nextSongs =
                songs > 5
                    ? `And **${songs - 5}** Other Song...`
                    : `There are **${songs}** Songs in the List.`;

            embed.setDescription(
                `Currently Playing: \`${queue.current.title}\`\n\n${tracks
                    .slice(0, 5)
                    .join("\n")}\n\n${nextSongs}`
            );

            embed.setTimestamp();
            embed.setFooter({
                text: "",
                iconURL: message.author.avatarURL({ dynamic: true }),
            });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    },
};
