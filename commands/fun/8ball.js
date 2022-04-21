const Discord = require('discord.js')

module.exports = {
    name: '8ball',
    description: 'Gives a random answer to your question.',
    aliases: ['8b'],
    usage: "ds!8ball <question>",
    run: async (client, msg, args) => {
        try{
            const question = args.join(' ');
            if(!question) {
                return msg.reply("Please provide a Question!");
            }
            const answers = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.', 'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.'];
            const answer = answers[Math.floor(Math.random() * answers.length)];
            // create an embed with the answer
            const answerEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor({name: `${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true })})
            	.setThumbnail('https://www.scentswarmers.com/wp-content/uploads/2017/09/rahome8ballisofw17-800x800.png')
                .setTitle('8-Ball')
                .setDescription(`> ${question} \n${answer}`)
                .setTimestamp();
            // send the embed
            return msg.channel.send({embeds: [answerEmbed]});
        } catch(err) {console.log(err)}
    }
};
