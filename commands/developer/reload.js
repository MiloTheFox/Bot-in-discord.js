module.exports = {
    name: 'reload',
    aliases: ['reload_command', 'rmc'],
    category: 'owner',
    description: 'Reloads a Command.',
    usage: 'ds!reload <category> <commandname>',
    run: async(client, message, args) => {
    try{
    if (message.author.id !== '705557092802625576') return message.reply('You are not the Bot Owner!');
    if (!args[0]) return message.reply('Please provide a category!');
    if (!args[1]) return message.reply('Please provide the command name!');

      let category = args[0].toLowerCase();
      let command = args[1].toLowerCase();

    try {
      delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
      client.commands.delete(command);
      const pull = require(`../../commands/${category}/${command}.js`);
      client.commands.set(command, pull);
      console.log(`Reloaded ${command} from ${category}`);
      return message.channel.send(`Reload on **${command}** completed!`);
    } catch(error) {
      message.channel.send(`An unexpected Error occurred whilst trying to reload **${command}**: \`${error.message}\``);
      console.log(error);
    }
  } catch(error) {
      console.log(error);
  }
}
};
