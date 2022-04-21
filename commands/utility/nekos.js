onst { MessageEmbed } = require('discord.js');
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
      // amount of images to send
      let amount = args[0] ? args[0] : 1;
      // if the amount is not a number, return an error
      if (isNaN(amount))
        return message.channel.send('Please enter a valid number!');
      // if the amount is less than 1, return an error
      if (amount < 1)
        return message.channel.send('Please enter a number greater than 0!');
      // if amount contains a float, return an error
      if (amount % 1 !== 0)
        return message.channel.send('Please enter a whole number!');
      // if the amount is greater than 10, return an error
      if (amount > 10)
        return message.channel.send('Please enter a number less than 10!');
      // if the amount is empty or 1, send the image
      if (amount === '' || amount === 1) {
        const embed = new MessageEmbed()
          .setColor('GREEN')
          .setThumbnail(
            `${client.user.displayAvatarURL({ format: 'png', dynamic: true })}`
          )
          .setImage((await nekosBest.fetchRandom('neko')).results[0].url)
          .setTimestamp();
        return message.channel.send({ embeds: [embed] });
      }
      // send the embeds in 1 message
      const embeds = [];
      for (let i = 0; i < amount; i++) {
        embeds.push(
          new MessageEmbed()
            .setColor('GREEN')
            .setImage((await nekosBest.fetchRandom('neko')).results[0].url)
            .setTimestamp()
        );
      }
      return message.channel.send({ embeds: embeds });
    } catch (err) {
      console.log(err);
    }
  },
};
