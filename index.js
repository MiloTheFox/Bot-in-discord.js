const Discord = require('discord.js');
const client = new Discord.Client({shards: "auto"});
const { Client, MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const config = require("./config.json");



prefix = config.prefix // Initializing the Prefix of the Bot

client.once("ready", async () => {
    console.log("Bereit: ", client.user.tag); // Says that it's ready
    client.user.setActivity('with discord.js and $$', { type: 'PLAYING' }); 
    /* 
    After the Bot has started, it automatically sets the Activity / Stauts to "Playing with discord.js and $$" 
    */
});

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "userinfo") {
        const user = message.mentions.members.first()
			|| message.guild.members.cache.get(args[0])
			|| message.member;

		let status;
		switch (user.presence.status) {
		case 'online':
			status = '🟢 Online';
			break;
		case 'dnd':
			status = '🛑 Do Not Disturb';
			break;
		case 'idle':
			status = '🟡 Idle';
			break;
		case 'offline':
			status = '⚫ Offline';
			break;
		default:
			status = 'Unknown';
		}

		const embed = new MessageEmbed()
			.setTitle(`${user.user.username} stats`)
			.setColor('#f3f3f3')
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{
					name: 'Name: ',
					value: user.user.username,
					inline: true,
				},
				{
					name: '#️⃣ Discriminator: ',
					value: `#${user.user.discriminator}`,
					inline: true,
				},
				{
					name: '🆔 ID: ',
					value: user.user.id,
                    inline: true,
				},
				{
					name: 'Current Status: ',
					value: status,
					inline: true,
				},
				{
					name: 'Activity: ',
					value: user.presence.activities[0] ? user.presence.activities[0].name : 'User isn\'t playing a game!',
					inline: true,
				},
				{
					name: 'Avatar link: ',
					value: `[Click Here](${user.user.displayAvatarURL()})`,
                    inline: true,
				},
				{
					name: 'Creation Date: ',
					value: `<t:${parseInt(user.user.createdTimestamp / 1000)}:f>`,
					inline: true,
				},
				{
					name: 'Joined Date: ',
					value: `<t:${parseInt(user.joinedTimestamp / 1000)}:f>`,
					inline: true,
				},
				{
					name: 'User Roles: ',
					value: user.roles.cache.map((role) => role.toString()).join('\n'),
					inline: true,
				},
			);

		return message.channel.send(embed);
    	}
    else
    if(command === 'help') {
        
        var time = Date.now()
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setColor("YELLOW")
        .setTitle("Help List")
        .addField(`Type: Developer`, "eval", false)
        .addField(`Type: Normal`, "help", false)
        .addField(`Type: Utility`, "userinfo", false)
        .addField(`Type: Bot`, "ping", false)
        .setFooter(`Time taken: ${Date.now() - time}ms`)
        .setTimestamp()
        message.reply(embed)
      } else
      if (command === "eval") {
          
          var time = Date.now();
          if(message.author.id !== '705557092802625576') return message.send("This Command can only be used by authorised Personnel!")
          const command = args.join(" ");
          if(!command) return message.reply("Tell me what I should evaluate for you!")

          try {
              const evaled = eval(command)
              let words = ["token", "destroy"]
              if(words.some(word => message.content.toLowerCase().includes(word))){
                  return message.reply("Evaluation stopped!")
              }
              const embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              .setTitle("Correctly evaluated")
              .setDescription("**In-Put: 📭**\n" + `\`\`\`js\n${command}\`\`\``+ "\n**Out-Put: 📬**\n" + `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)
              .addField(`Type:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
              .addField(`Evaluated in:`, `\`\`\`${Date.now()-message.createdTimestamp} ms\`\`\``, true)
              .setFooter("Made by Ohnezahn ZAE#8135", message.author.displayAvatarURL({dynamic: true}))
              .setTimestamp()
              message.reply(embed)

          }catch (error) {
              const embedfailure = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error occured!")
              .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              .addField(`In-Put: 📭`, `\`\`\`js\n${command}\`\`\``)
              .addField(`Error: 🛑`, `\`\`\`js\n${error}\`\`\``)
              .addField(`Evaluated in: ⏱️`, `\`\`\`${Date.now()-message.createdTimestamp} ms\`\`\``)
              .setFooter("Made by Ohnezahn ZAE#8135", message.author.displayAvatarURL({dynamic: true}))
              .setTimestamp()
              message.reply(embedfailure)
        }
    } else        
        if (command == "ping") {
            message.channel.send("Pinging...").then(m => {
                var botPing = Math.round(client.ws.ping);
                setTimeout(() => {
                    m.edit(`**:ping_pong: Pong! My Ping is: \`${botPing}ms\`**`);
                }, 3000)
            });
        }
    });


client.login(config.token)
