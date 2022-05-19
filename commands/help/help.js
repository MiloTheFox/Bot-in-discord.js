const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Gets information about the bot.',
    usage: 'ds!help',
    run: async(client, msg, args) => {
        try {
            switch (args[0]) {
                case 'commands' || 'cmds':
                    const commands = client.commands.map(cmd => `${cmd.name} - ${cmd.description}`).join('\n');
                    const commandsEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Commands')
                        .setDescription(`${commands}`)
                        .setFooter({text: 'ds!help command [commandname] for more info on a command.'})
                        .setTimestamp();
                    return msg.channel.send({embeds: [commandsEmbed]});
                case 'aliases':
                    const aliases = [];
                    client.commands.forEach(cmd => {
                        if (cmd.aliases) {
                            for (let i = 0; i < cmd.aliases.length; i++) {
                                aliases.push(`${cmd.name} - ${cmd.aliases[i]}`);
                            }
                        }
                        else {
                            aliases.push(`${cmd.name} - None`);
                        }
                    });
                    const aliasesEmbed = new Discord.MessageEmbed()	
                        .setColor('#0099ff')
                        .setTitle('Command Aliases')
                        .setDescription(aliases.join('\n'))
                        .setFooter({text: 'ds!help command [commandname] for more info on a command.'})	
                        .setTimestamp();
                    return msg.channel.send({embeds: [aliasesEmbed]});
                case 'command' || 'cmd':
                    const commandName = args[1];
                    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                    if (!command) return msg.channel.send('That command does not exist!');
                    const commandEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${command.name}`)
                        .setDescription(`${command.description}`)
                        .addField('Usage', `${command.usage}`)
                        .addField('Aliases', `${command.aliases ? command.aliases.join(', ') : 'None'}`)
                        .setFooter({text: 'ds!help command [commandname] for more info on a command.'})
                        .setTimestamp();
                    return msg.channel.send({embeds: [commandEmbed]});
                default:
                    const helpEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Help')
                        .setDescription('Here are all the commands you can use!')
                        .addField('Commands', 'ds!help commands')
                        .addField('Aliases', 'ds!help aliases')
                        .setFooter({text: 'ds!help command [commandname] for more info on a command.'})
                        .setTimestamp();
                    return msg.channel.send({embeds: [helpEmbed]});
            }
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
