const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bdfd-function',
    description: 'Get Functions from BDFD',
    aliases: ["bdfd-func", "bdfd-docs"],
    usage: 'ds!bdfd-function <function>',
    run: async (client, msg, args) => {
        try {
            let functionName = args[0];
            if (!functionName) {
                return msg.channel.send('You must specify a function!');
            }
            let response = await fetch(`https://botdesignerdiscord.com/public/api/function/${functionName}`).then(res => res.json());
            if (!response.success) {
                return msg.channel.send(response.message);
            }
            let argsString = response.data.args.length > 0 ? response.data.args.map(arg => `\`${arg.name}\``).join(', ') : 'None';
            console.log(argsString)
            let embed = new MessageEmbed()
                .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                .setColor('BLUE')
                .setTitle(`${response.tag}`)
                .setURL(`https://nilpointer-software.github.io/bdfd-wiki/bdscript/${functionName.replace('$', '')}.html`)
                .setDescription(`**Description:** ${response.shortDescription}\n**Usage:** ${response.usage ? response.usage : 'Plain Function'}\n**Premium Required?:** ${response.premium ? 'Required' : 'Not Required'}\n**Arguments:**\n ${argsString}`)
                .setTimestamp();
            return msg.channel.send({ embeds: [embed] });
        } catch (err) { console.log(err) }
    }
};
