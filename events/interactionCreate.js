const Discord = require("discord.js");
module.exports = (client, int) => {
  try {
    if (!int.isButton()) return;

    let queue = client.player.getQueue(int.guildId);
    switch (int.customId) {
      case "saveTrack":
        {
          if (!queue || !queue.playing)
            return int.reply({
              content: `No music is currently playing. ❌`,
              ephemeral: true,
              components: [],
            });

          let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(client.user.username + " - Save Track")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
              { name: "Track", value: queue.current.title, inline: true },
              { name: "Duration", value: queue.current.duration, inline: true },
              { name: "URL", value: queue.current.url, inline: true },
              { name: "Saved Server", value: int.guild.name, inline: true },
              { name: "Requested by", value: int.author.tag, inline: true })
            .setTimestamp()
            .setFooter({
              text: "Dragon Serengeti",
              iconURL: int.user.displayAvatarURL({ dynamic: true }),
            });
          int.member
            .send({ embeds: [embed] })
            .then(() => {
              return int.reply({
                content: `I sent you the name of the music in a private message ✅`,
                ephemeral: true,
                components: [],
              });
            })
            .catch((error) => {
              console.log(error);
              return int.reply({
                content: `I cannot send you a private message. ❌`,
                ephemeral: true,
                components: [],
              });
            });
        }
        break;
      case "time": {
        if (!queue || !queue.playing)
          return int.reply({
            content: `No music is currently playing. ❌`,
            ephemeral: true,
            components: [],
          });

        let progress = queue.createProgressBar();
        let timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == "Infinity")
          return int.message.edit({
            content: `This song is live streaming, no duration data to display. 🎧`,
          });

        let embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setTitle(queue.current.title)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setDescription(`${progress} **(${timestamp.progress}%)**`)
          .setFooter({
            text: "Dragon Serengeti",
            iconURL: int.user.displayAvatarURL({ dynamic: true }),
          });
        int.message.edit({ content: ["Updated!"], embeds: [embed] });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
