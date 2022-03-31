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
            if (isNaN(math.evaluate(args.join(' ')))) {
                const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setColor('BLUE')
                .setTitle('Operation completed')
                .setDescription(`**Input:** \`\`\`js\n${args.join(' ')}\n\`\`\`\n**Output:**\`\`\`js\nNot a Number I guess... ¯\\_(ツ)_/¯\`\`\``)
                .setTimestamp();
                return message.reply({embeds: [embed]});
            } else if (math.evaluate(args.join(' ')) === Infinity) {
                const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setColor('BLUE')
                .setTitle('Operation completed')
                .setDescription(`**Input:** \`\`\`js\n${args.join(' ')}\n\`\`\`\n**Output:**\`\`\`js\nInfinity\`\`\``)
                .setTimestamp();
                return message.reply({embeds: [embed]});
            }
            const embed = new MessageEmbed()
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setColor('BLUE')
            .setTitle('Operation completed')
            .setDescription(`**Input:** \`\`\`js\n${args.join(' ')}\n\`\`\`\n**Output:**\`\`\`js\n${math.evaluate(args.join(' '))}\`\`\``)
            .setTimestamp();
            return message.reply({embeds: [embed]});
        } catch(error) {
            console.log(error);
        }
    }
};
