module.exports = {
    name: 'skip',
    description: 'Skips the current song.',
    usage: 'ds!skip',
    run: async (client, msg, args) => {
        try {
            if (!msg.member.permissions.has('SPEAK')) {
                msg.channel.send('You do not have the permission to use this command!');
                return;
            }
            if (!msg.guild.me.permissions.has('SPEAK')) {
                msg.channel.send('I do not have the permission to use this command!');
                return;
            }
            if (!client.queue[msg.guild.id]) {
                msg.channel.send('There is nothing playing!');
                return;
            }
            client.queue[msg.guild.id].connection.dispatcher.end();
            return msg.channel.send('Skipped to the next song!');
        }
        catch (err) {
            console.log(err);
        }
    }
};
