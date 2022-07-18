const Discord = require('discord.js');

module.exports = {
    name: 'aliases',
    description: 'Gets all command aliases.',
    usage: 'ds!aliases',
    aliases: ['alias'],
    run: async(client, msg, args) => {
        try{
            let aliases = [];
            client.commands.forEach(cmd => {
                if(cmd.aliases) {
                    cmd.aliases.forEach(alias => {
                        aliases.push(alias);
                    });
                }
            }
            );
            let aliasesEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Command Aliases')
                .setDescription(aliases.join('\n'))
                .setTimestamp();
            return msg.channel.send({embeds: [aliasesEmbed]});
        } catch(err) {console.log(err)}
    }
};
