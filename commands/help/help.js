const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  showHelp: false,
  usage: "{prefix}help",

  run: async(client, message, args) => {
    try {
      const embed = new MessageEmbed();

      embed.setColor("BLUE");
      embed.setTitle(client.user.username);
      embed.setThumbnail(client.user.displayAvatarURL());
      const commands = client.commands.filter((x) => x.showHelp !== false);
      if (args.length === 0) {
        embed.setDescription(
          "**Commands:**\n" +
            commands
            .map((x) => `\`(${x.name})\` - ${x.description}`)
            .join("\n")
        );
      } else {
        // print the help for the command that is provided
        const command = commands.find((x) => x.name === args[0]);
        if (command) {
          embed.setDescription(
            `**Command:** \`(${command.name})\`\n**Aliases:** [${command.aliases}]\n**Description:** ${command.description}\n**Utilisation:** ${command.usage}`
          );
        } else {
          embed.setDescription(
            `**Command:** \`(${args[0]})\`\n**Description:** Command not found!`
          );
        }
      }
      embed.setTimestamp();
      embed.setFooter({
        iconURL: message.author.avatarURL({ dynamic: true }),
      });
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
