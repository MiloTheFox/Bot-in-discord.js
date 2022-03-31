const Discord = require('discord.js');
const { inspect } = require('util');
module.exports = {
    name: 'eval',
    description: 'Evaluates JavaScript Code (Bot Owner Cmd)',
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
            if (command.includes('client.token') || command.includes('process.env')) {
                msg.channel.send('🚫');
                return;
            }
                try {
                    const evaled = await eval(command);
                    const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setTitle('Evaluated Code')
                    .setDescription(`**Input:** \`\`\`js\n${command}\n\`\`\`\n**Output:**\`\`\`js\n${inspect(evaled, { depth: 0 })}\n\`\`\`\n**Type:**\`\`\`yaml\n${typeof evaled}\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                } catch (error) {
                    console.log(error);
                    const embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setColor('RED')
                    .setTitle('Error ocurred!')
                    .setDescription(`\`\`\`js\n${error}\n\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                }
        } catch(error) {
            console.log(error);
        }
    }
};
