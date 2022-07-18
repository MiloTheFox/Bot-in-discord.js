const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const { Client } = require('nekos-best.js');

module.exports = {
  name: 'neko',
  description: 'Sends a random neko image. [non-NSFW] (optional: Amount)',
  usage: 'ds!neko [amount]',
  category: 'utility',
  nsfw: false,
  run: async (client, message, args) => {
    const nekosBest = new Client();
    await nekosBest.init();
    try {
      let amount = args[0] ? args[0] : 1;
      if (isNaN(amount))
        return message.channel.send('Please enter a valid number!');
      if (amount < 1)
        return message.channel.send('Please enter a number greater than 0!');
      if (amount % 1 !== 0)
        return message.channel.send('Please enter a whole number!');
      if (amount > 10)
        return message.channel.send('Please enter a number less than 10!');
      if (amount === '' || amount === 1) {
        let button = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Reload 🔃")
            .setCustomId("reload"),
          new MessageButton()
            .setStyle("DANGER")
            .setLabel("Delete 🗑")
            .setCustomId("del")
        );
        let embed = new MessageEmbed()
          .setColor('RANDOM')
          .setImage((await nekosBest.fetchRandom('neko')).results[0].url)
          .setFooter({ text: 'Powered by nekos.best', icon_url: message.author.displayAvatarURL({ dynamic: true }) })
          .setTimestamp();
        return message.channel.send({ embeds: [embed], components: [button] }).then(async (Message) => {
          const filter = (i) => i.user.id === message.author.id;
          let col = await Message.createMessageComponentCollector({
            filter,
            time: 1200000,
          });
          col.on("collect", async (button) => {
            if (button.user.id !== message.author.id) return;
            switch (button.customId) {
              case "reload":
                embed.setColor('RANDOM')
                embed.setImage((await nekosBest.fetchRandom('neko')).results[0].url)
                embed.setFooter({ text: 'Powered by nekos.best', icon_url: message.author.displayAvatarURL({ dynamic: true }) })
                embed.setTimestamp();
                await Message.edit({ embeds: [embed] });
                button.reply({ content: "> **✅ Success** | Image reloaded!", ephemeral: true,
                  }).catch((e) => {
                    console.log(e);
                  });
                break;
              case "del":
                col.stop(true);
                await Message.delete();
                button.send({ content: "> **✅ Success** | Image deleted!", ephemeral: true,
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                break;
            }
          });
        });
      }
      let embeds = [];
      for (let i = 0; i < amount; i++) {
        embeds.push(
          new MessageEmbed()
            .setColor('GREEN')
            .setImage((await nekosBest.fetchRandom('neko')).results[0].url)
            .setFooter({ text: "Powered by nekos.best", iconURL: client.user.displayAvatarURL({ format: 'png', dynamic: true }) })
            .setTimestamp()
        );
      }
      return message.channel.send({ embeds: embeds });
    } catch (err) {
      console.log(err);
    }
  },
};
