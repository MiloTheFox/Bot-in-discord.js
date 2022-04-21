const Discord = require('discord.js');
module.exports = {
    name: 'aliases',
    description: 'Gets all command aliases.',
    usage: 'ds!aliases',
    aliases: ['alias'],
    run: async(client, msg, args) => {
        try{
            const aliases = [];
            client.commands.forEach(cmd => {
                if(cmd.aliases) {
                    cmd.aliases.forEach(alias => {
                        aliases.push(alias);
                    });
                }
            });
            const aliasesEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Command Aliases')
                .setDescription(aliases.join('\n'))
                .setTimestamp();
            // send the embed
            return msg.channel.send({embeds: [aliasesEmbed]});
        } catch(err) {console.log(err)}
    }
};
