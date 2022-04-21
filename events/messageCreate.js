const client = require('../bot');
const prefix = 'ds!';

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.members.fetch(message.author);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    try{
        command.run(client, message, args);
        } catch(error) {
            console.log(error);
        }
    }
);
