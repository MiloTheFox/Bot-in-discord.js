const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'npm',
  description: 'Fetches an npm package.',
  usage: 'ds!npm [package]',
  category: 'utility',
  run: async (client, message, args) => {
    try {
      let package = args[0];
      if (!package)
        return message.channel.send('Please enter a valid package!');
      let res = await fetch(`https://api.npms.io/v2/package/${package}`).then(
        (res) => res.json()
      );
      if (res.status == 404) return message.channel.send('Package not found!');
      let name = res.collected.metadata.name;
      let description = res.collected.metadata.description;
      let version = res.collected.metadata.version;
      let author = res.collected.metadata.publisher.username;
      let license = res.collected.metadata.license;
      let keywords = res.collected.metadata.keywords;
      let homepage = res.collected.metadata.links.homepage;
      let repository = res.collected.metadata.links.repository;
      let bugs = res.collected.metadata.links.bugs;

      // create the embed
      let embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${name}`)
        .setURL(`${repository}`)
        .setDescription(
          `${description}\nVersion: ${version}\nAuthor: ${author}\nLicense: ${license}\nKeywords: ${keywords}\nHomepage: [Click here for their Homepage](${homepage})\nRepository: [Click here for their Repository](${repository})\nBugs: [Click Here to report Bugs](${bugs})`
        )
        .setThumbnail(`https://img.shields.io/npm/v/${name}.svg`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
