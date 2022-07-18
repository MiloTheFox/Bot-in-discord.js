const Discord = require('discord.js')

module.exports = {
    name: "number-filter",
    aliases: ["nf", "numbers", "number", "num", "numbers-filter", "number-filter"],
    description: "Filter out numbers from a message.",
    usage: "ds!number-filter [message]",
    category: "utility",
    nsfw: false,
    run: async (client, message, args) => {
        try {
            let msg = args.join(" ");
            if (!msg) return message.channel.send("Please enter a message to filter!");
            let filtered = msg.replace(/[^0-9]/g, "");
            let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ format: "png", dynamic: true })}` })
                .setTitle("Numbers filtered!")
                .setDescription(`Message: \`${message}\`\n\nFiltered: \`${filtered ? filtered : 0}\`\n\nLength: \`${filtered.length ? filtered.length : "No Numbers have been found!"}\``)
                .setFooter({ text: `${Date.now() - message.createdTimestamp} ms`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
                .setTimestamp();
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    }
};
