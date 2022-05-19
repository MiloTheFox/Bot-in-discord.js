const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');


module.exports = {
    name: 'exec',
    description: 'Executes a command in the terminal.',
    aliases: ['exec_command', 'exec_cmd', 'execute_command', 'execute_cmd', 'run'],
    usage: 'ds!exec <command>',
    run: async (client, msg, args) => {
        try{
            if (msg.author.id !== '705557092802625576') {
                msg.channel.send('You are not the Bot Owner!');
                return;
            }
            if (args.length < 1) {
                msg.channel.send('You need to provide some code!');
                return;
            }
            exec(args.join(' '), (error, stdout, stderr) => {
                if (!error) {
                    // embed
                    const embed = new MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setColor('BLUE')
                    .setTitle('Command Executed!')
                    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                    .setDescription(`**Input:** \`\`\`js\n${args.join(' ')}\n\`\`\`\n**Output:**\`\`\`js\n${stdout}\n\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                } else {
                    const embed = new MessageEmbed()
                    .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
                    .setColor('RED')
                    .setTitle('Error ocurred!')
                    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
                    .setDescription(`**Input:** \`\`\`js\n${args.join(' ')}\n\`\`\`\n**Output:**\`\`\`js\n${stderr}\n\`\`\``)
                    .setTimestamp();
                    return msg.reply({embeds: [embed]});
                }
            });
        } catch(error) {
            console.log(error);
        }
    }
};
