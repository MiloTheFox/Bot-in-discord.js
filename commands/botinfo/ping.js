module.exports = {
    name: 'ping',
    description: 'Returns the Bot\'s latency!',
    usage: "ds!ping",
    aliases: ['latency'],
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...');
        msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }
};
