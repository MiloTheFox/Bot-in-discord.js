const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
  name: 'neko',
  description: 'Sends a random neko image. [non-NSFW] (optional: Amount)',
  usage: 'ds!neko [amount]',
  category: 'utility',
  nsfw: false,
  run: async (client, message, args) => {
    try {
      let neko = await fetch('https://nekos.best/api/v2/neko').then(response => response.json());
      let amount = args[0] ? args[0] : 1;
      if (isNaN(amount)) return message.channel.send('Please enter a valid number!');
      if (amount < 1) return message.channel.send('Please enter a number greater than 0!');
      // if amount contains a float, return an error
      if (amount % 1 !== 0) return message.channel.send('Please enter a whole number!');
      // if the amount is greater than 10, return an error
      if (amount > 10) return message.channel.send('Please enter a number less than 10!');
      // if the amount is empty or 1, send the image
      if (amount === '' || amount === 1) {
        // add buttons
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
        // send the image
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setImage(`${neko.results[0].url}`)
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
                neko = await fetch('https://nekos.best/api/v2/neko').then(response => response.json())
                embed.setColor('RANDOM')
                embed.setImage(`${neko.results[0].url}`)
                embed.setFooter({ text: 'Powered by nekos.best', icon_url: message.author.displayAvatarURL({ dynamic: true }) })
                embed.setTimestamp();
                await Message.edit({ embeds: [embed] });
                button
                  .reply({
                    content: "> **✅ Success** | Image reloaded!",
                    ephemeral: true,
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                break;
              case "del":
                col.stop(true);
                await Message.delete();
                button
                  .reply({
                    content: "> **✅ Success** | Image deleted!",
                    ephemeral: true,
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                break;
            }
          });
        });
      }
      // send the embeds in 1 message
      const embeds = [];
      for (let i = 0; i < amount; i++) {
        neko = await fetch('https://nekos.best/api/v2/neko').then(response => response.json())
        embeds.push(
          new MessageEmbed()
            .setColor('GREEN')
            .setImage(`${neko.results[0].url}`)
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
