const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'roleinfo',
    description: 'Gets information about the role.',
    usage: 'ds!roleinfo <role>',
    run: async(client, msg, args) => {
        try {
            let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0]);
            if (!role) {
                msg.channel.send('Role not found!');
                return;
            }

            const toTimestamp = (strDate) => {  
                const dt = moment(strDate).unix();  
                return dt;  
            };
            const embed = new Discord.MessageEmbed()
                .setColor(`${role.hexColor}`)
                .setThumbnail(msg.guild.iconURL({dynamic: true}))
                .setAuthor({name:  `${msg.author.tag}`, iconURL: role.guild.iconURL({dynamic: true})})
                .addFields(
                    {name: 'Role Name:', value: role.name, inline: true},
                    {name: 'Created at:', value: `**<t:${toTimestamp(moment.utc(role.createdTimestamp))}:F>**`, inline: true},
                    {name: 'Role ID:', value: role.id, inline: true},
                    {name: 'Color:', value: `${role.hexColor}`, inline: true},
                    {name: 'Members with that Role:', value: `${role.members.size}`, inline: true},
                    {name: 'Position:', value: `${role.position}`, inline: true},
                    {name: 'Mentionable:', value: `${role.mentionable}`, inline: true},
                    {name: 'Hoisted:', value: `${role.hoisted? 'Yes' : 'No'}`}
                )
                .setTimestamp();
            // Send the embed
            return msg.channel.send({embeds: [embed]});
        } catch(error) {console.log(error);}
    }
};
