module.exports = {
    name: 'remove-timeout',
    aliases: ["rm-tm", "rm-time", "remove-time", "untimeout", "untime", "utime"],
    description: 'Remove the Timeout from a user.',
    usage: 'ds!untimeout <user>',
    run: async (client, msg, args) => {
        try {
            let user = msg.mentions.users.first() || await msg.guild.members.fetch(args[0]) || msg.guild.members.cache.get(args[0]);
            if (!user) {
                return msg.channel.send('Unable to find user! Check your input and try again!');
            }
            if (user.isCommunicationDisabled()) {
                await user.timeout(null)
                return msg.channel.send(`${user.user.tag}'s Timeout has been removed`)
            } else {
                return msg.channel.send(`${user.user.tag} is not timeouted!`)
            }
        } catch (err) {
            console.log(err)
        }
    }
};
