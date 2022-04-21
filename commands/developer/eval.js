const Discord = require('discord.js');
const { inspect } = require('util');
module.exports = {
    name: 'eval',
    description: 'Evaluates JavaScript Code.',
    usage: 'ds!eval <code>',
    run: async(client, msg, args) => {
        try{
            const command = args.join(' ');
            if (msg.author.id !== '705557092802625576') {
                msg.channel.send('You are not the Bot Owner!');
                return;
            }
            if (args.length < 1) {
                msg.channel.send('You need to provide some code!');
                return;
            }
            if (command.includes('client.token')) {
                msg.channel.send('You cannot execute client.token!');
                return;
            }
            if (command.includes('process.env.TOKEN')) {
                msg.channel.send('You cannot execute process.env.TOKEN!');
                return;
            }
                try {
                    const evaled = await eval(command);
                    const type = typeof evaled;
                    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
                    const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setTitle('Evaluated Code')
                    .setDescription(`**Output:**\`\`\`js\n${inspect(evaled,{ depth : 1 })}\`\`\`\n**Input:** \`\`\`js\n${command}\n\`\`\``)
                    .addFields(
                        {
                        name: 'Type:',
                        value: `\`\`\`js\n${typeCapitalized}\n\`\`\``,
                        inline: false
                    },
                        {
                        name: "Time:",
                        value: `\`\`\`yaml\n${Date.now() - msg.createdTimestamp}ms\n\`\`\``,
                        inline: false
                    }
                    )
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                } catch (error) {
                    console.log(error);
                    const embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setColor('RED')
                    .setTitle('Error ocurred!')
                    .setDescription(`\`\`\`js\n${error.stack}\n\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                }
        } catch(error) {
            console.log(error);
            const embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setColor('RED')
                    .setTitle('Error ocurred!')
                    .setDescription(`\`\`\`js\n${error.stack}\n\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
        }
    }
};
