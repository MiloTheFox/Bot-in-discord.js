const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports = {
    name: 'math',
    description: 'Evaluates a mathematical expression.',
    usage: 'ds!math <expression>',
    run: async(client, message, args) => {
        try{
            if (args.length < 1) {
                message.channel.send('You need to provide some code!');
                return;
            }
            const input = args.join(' ');
            const output = math.evaluate(input);
            if (isNaN(output)) {
                const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setColor('RED')
                .setTitle('Math Error')
                .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Output:**\`\`\`js\nNot a Number I guess... ¯\\_(ツ)_/¯\`\`\``)
                .setTimestamp();
                return message.reply({embeds: [embed]});
            } else if (output === Infinity) {
                const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setColor('RED')
                .setTitle('Math Error')
                .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Output:**\`\`\`js\nInfinity\`\`\``)
                .setTimestamp();
                return message.reply({embeds: [embed]});
            }
            const embed = new MessageEmbed()
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setColor('BLUE')
            .setTitle('Math Result')
            .setDescription(`**Math Expression:** \`\`\`js\n${input}\n\`\`\`\n**Result:**\`\`\`js\n${output}\`\`\``)
            .setTimestamp();
            return message.reply({embeds: [embed]});
        } catch(error) {
            console.log(error);
        }
    }
};
