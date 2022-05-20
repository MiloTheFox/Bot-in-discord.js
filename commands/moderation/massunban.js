module.exports = {
    name: 'massunban',
    description: 'Unbans all provided Users from the server',
    usage: 'ds!massunban <user1> <user2> ... <reason>',
    aliases: ['mub'],
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
                    if (!user) users - 1;
                    const banList = await msg.guild.fetchBans();
                    if (!banList.has(user.id)) users--;
                    if (!user) users--;
                    await msg.guild.members.unban(user, { reason: reason });
                }, i * 1000);
            }
            return msg.channel.send(`Successfully unbanned ${users.length} users!`);
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
