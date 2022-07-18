const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
    name: 'math',
    description: 'Evaluates a mathematical expression.',
    usage: 'ds!math <expression>',
    run: async (client, message, args) => {
        try {
            if (args.length < 1) {
                message.channel.send('Please provide an Math Expression:\n\nExample: **ds!math 2^3**\n**ds!math sqrt(4)**');
                return;
            }
            let input = args.join(' ');
            let output = math.evaluate(input);
            if (isNaN(output)) {
                let embed = new MessageEmbed()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setTitle('Math Error')
                    .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Result:**\`\`\`js\nNot a Number\`\`\``)
                    .setTimestamp();
                return message.reply({ embeds: [embed] });
            } else if (output === Infinity) {
                let embed = new MessageEmbed()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('RED')
                    .setTitle('Math Error')
                    .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Result:**\`\`\`js\nInfinity\`\`\``)
                    .setTimestamp();
                return message.reply({ embeds: [embed] });
            }
            let embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setColor('BLUE')
                .setTitle('Math Result')
                .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Result:**\`\`\`js\n${output}\`\`\``)
                .setTimestamp();
            return message.reply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    }
};
