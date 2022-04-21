module.exports = {
    name: 'pause',
    description: 'Pauses the music.',
    usage: 'ds!pause',
    run: async(client, msg, args) => {
        try{
            if(!msg.member.permissions.has('CONNECT')) {
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
            if(!client.queue[msg.guild.id].playing) {
                client.queue[msg.guild.id].playing = true;
                return msg.channel.send('Music resumed!');
            }
        } catch(err) {
            console.log(err);
        }
    }
};
