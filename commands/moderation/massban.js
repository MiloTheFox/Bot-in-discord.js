module.exports = {
    name: 'massban',
    description: 'Mass bans all users from the server',
    usage: 'ds!massban <user1> <user2> ... <reason>',
    aliases: ['mb'],
    run: async (client, msg, args) => {
        try {
            if (!msg.member.permissions.has('BAN_MEMBERS')) return msg.channel.send('Missing Permission: `BAN_MEMBERS`');
            if (!args[0]) return msg.channel.send('Please specify the users to ban!');
            let reason = args.slice(-1).join(' ');
            if (!reason) reason = 'No reason provided';
            let users = args.slice(0, args.length - 1);
            for (let i = 0; i < users.length; i++) {
                setTimeout(async () => {
                    let user = await client.users.fetch(users[i]);
                    if (!user) users--;
                    await msg.guild.members.ban(user, { days: 7, reason: reason });
                }, i * 1000);
            }
            return msg.channel.send(`Successfully banned ${users.length} users!`);
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
