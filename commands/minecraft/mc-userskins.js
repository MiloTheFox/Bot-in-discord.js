const fetch = require('node-fetch');

module.exports = {
    name: 'mc-userskin',
    description: 'Gets the skin of an Minecraft user.',
    aliases: ['mc-us', 'mc-skin'],
    usage: 'ds!mc-userskin username (optional: uuid)',
    run: async(client, msg, args) => {
    try{
        let username = args.slice(0).join(' ');
        let uuid = args.slice(1).join(' ');
        if(!username) {
            return msg.channel.send('You must specify a username!');
        }
        if(!uuid) {
            uuid = username.replace(/[^0-9]/g, '');
        }
        let userInfo = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`).then(res => res.json());
        let skinEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
        .setColor('BLUE')
        .setTitle(`${userInfo.name} User Skin`)
        .setDescription(`**Name:** ${userInfo.name}\n**Skin:** [Click Here](https://crafatar.com/skins/${userInfo.id})`)
        .setImage(`https://crafatar.com/skins/${userInfo.id}`)
        .setTimestamp();
        return msg.channel.send({embeds: [skinEmbed]});
    } catch(err){console.log(err)}
    }
};
