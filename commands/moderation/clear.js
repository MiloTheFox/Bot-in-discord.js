module.exports = {
    name: 'clear',
    description: 'Clears the chat.',
    usage: 'ds!clear <amount>',
    aliases: ['purge', 'prune'],
    run: async (client, msg, args) => {
        try {
            let botperms = msg.channel.permissionsFor(msg.guild.me, false);
            let userperms = msg.channel.permissionsFor(msg.author, false);
            if (!botperms.has('MANAGE_MESSAGES')) {
                return msg.channel.send('I do not have the `Manage Messages` permission.').then(m => {
                    setTimeout(async () => {
                        await m.delete();
                    }, 5000);
                });
            }
            if (!userperms.has('MANAGE_MESSAGES')) {
                return msg.channel.send('You don\'t have the permission to delete messages.').then(m => {
                    setTimeout(async () => {
                        await m.delete();
                    }, 5000);
                });
            }
            if (!args[0]) {
                return msg.channel.send('Please specify the amount of messages to delete!').then(m => {
                    setTimeout(async () => {
                        await m.delete();
                    }, 5000);
                });
            }
            else if (isNaN(args[0])) return msg.channel.send('Please specify a valid number!').then(m => {
                setTimeout(async () => {
                    await m.delete();
                }, 5000);
            });
            else if (args[0] > 100) return msg.channel.send('Please specify a number less than 100!').then(m => {
                setTimeout(async () => {
                    await m.delete();
                }, 5000);
            });
            else if (args[0] < 1) return msg.channel.send('Please specify a number greater than 1!').then(m => {
                setTimeout(async () => {
                    await m.delete();
                }, 5000);
            });
            const amount = parseInt(args[0]);
            await msg.channel.bulkDelete(amount + 1);
            return msg.channel.send(`Successfully deleted ${amount} messages!`).then(m => {
                setTimeout(async () => { await m.delete(); }, 5000);
            });
        } catch (error) {
            console.log(error);
        }
    }
};
