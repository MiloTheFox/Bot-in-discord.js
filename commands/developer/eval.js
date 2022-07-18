const Discord = require('discord.js');
const { inspect } = require('util');
const Buffer = require('buffer').Buffer;

module.exports = {
    name: 'eval',
    description: '(Dev only) Evaluates JavaScript Code.',
    usage: 'ds!eval <code>',
    run: async (client, msg, args) => {
        try {
            let command = args.join(' ');
            if (msg.author.id !== '705557092802625576') {
                msg.channel.send('You are not the Bot Owner!');
                return;
            }
            if (args.length < 1) {
                msg.channel.send('You need to provide some code!');
                return;
            }
            if (command.includes('.token') || command.includes('.TOKEN')) {
                msg.channel.send('You cannot execute commands containing .token!');
                return;
            }
            let evaled = eval(command);
            let type = typeof evaled;
            let typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
            let embed = new Discord.MessageEmbed()
            embed.setDescription(`**Output:**\`\`\`js\n${inspect(evaled, { depth: 2 })}\`\`\`\n**Input:** \`\`\`js\n${command}\n\`\`\``)
            if (embed.description.length > 4096) {
                embed.setColor('BLUE')
                embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                embed.setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                embed.setTitle('Evaluated Code')
                embed.setDescription(`**Input:** \`\`\`js\n${command}\n\`\`\``)
                embed.addFields(
                    { name: 'Type:', value: `\`\`\`js\n${typeCapitalized}\n\`\`\``, inline: false }, { name: "Time:", value: `\`\`\`js\n${Date.now() - msg.createdTimestamp}ms\n\`\`\``, inline: false })
                embed.setTimestamp()
                let file = Buffer.from(inspect(evaled, { depth: 2 }));
                return msg.reply({ embeds: [embed], files: [{ attachment: file, name: 'output.js' }] });
            } else {
                let embed2 = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**Output:**\`\`\`js\n${inspect(evaled, { depth: 2 })}\`\`\`\n**Input:** \`\`\`js\n${command}\n\`\`\``)
                    .setTitle('Evaluated Code')
                    .addFields(
                        { name: 'Type:', value: `\`\`\`js\n${typeCapitalized}\n\`\`\``, inline: false }, { name: "Time:", value: `\`\`\`js\n${Date.now() - msg.createdTimestamp}ms\n\`\`\``, inline: false })
                    .setTimestamp()
                return msg.reply({ embeds: [embed2] });
            }
        } catch (error) {
            console.log(error);
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                .setColor('RED')
                .setTitle('Error ocurred!')
                .setDescription(`\`\`\`js\n${error.stack}\n\`\`\``)
                .setTimestamp();
            return msg.reply({ embeds: [embed] });
        }
    }
};
