module.exports = {
    name: 'clear',
    description: 'Clears the chat.',
    usage: 'ds!clear <amount>',
    aliases: ['purge', 'prune'],
    run: async (client, msg, args) => {
        try {
            if (!msg.member.permissions.has('MANAGE_MESSAGES') && !msg.guild.me.permissions.has('MANAGE_MESSAGES')) {
                return msg.channel.send('Missing Permission: `MANAGE_MESSAGES`').then(m => m.delete(3000));
            }
            else if (!args[0]) return msg.channel.send('Please specify the amount of messages to delete!').then(m => m.delete(3000));
            else if (isNaN(args[0])) return msg.channel.send('Please specify a valid number!').then(m => m.delete(3000));
            else if (args[0] > 100) return msg.channel.send('Please specify a number less than 100!').then(m => m.delete(3000));
            else if (args[0] < 1) return msg.channel.send('Please specify a number greater than 1!').then(m => m.delete(3000));
            let amount = parseInt(args[0]);
            await msg.channel.bulkDelete(amount + 1);
            return msg.channel.send(`Successfully deleted ${amount} messages!`).then(m => m.delete(3000));
        } catch (error) {
            console.log(error);
            return msg.channel.send('An error occurred! Please try again!');
        }
    }
};
