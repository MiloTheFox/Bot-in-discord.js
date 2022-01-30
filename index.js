const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.ALL], shards: "auto"});
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const config = require("./config.json");

prefix = config.prefix // Initializing the Prefix of the Bot

client.once("ready", async () => {
    console.log("Bereit: ", client.user.tag);
    client.user.setActivity('with discord.js and $$', { type: 'PLAYING' });
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
			.setColor('RANDOM')
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
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setTitle("Help List")
        .addField(`Type: Developer`, "eval", false)
        .addField(`Type: Normal`, "help", false)
        .addField(`Type: Utility`, "userinfo\nserverinfo", false)
        .addField(`Type: Bot`, "ping", false)
        .setFooter(`Time taken: ${Date.now() - time}ms`)
        .setTimestamp()
        message.reply(embed)
      } else
      if (command === "eval") {
          
          var time = Date.now();
          if(message.author.id !== '705557092802625576') {
              message.channel.send("This Command can only be used by Ohnezahn ZAE#8135!")
              .then(m => m.delete({timeout: 3000}))
            } else {
              const command = args.join(" ");
              if(!command) return message.reply("Tell me what I should evaluate for you!")

              try {
                  const evaled = eval(command)
                  let words = ["token", "destroy", "rm", "sudo", "ping", ":(){ :|:& };:", "file", "^foo^bar", "wget", "crontab", "history", "dd", "mkfs", "gunzip", "chmod"]
                  if(words.some(word => message.content.toLowerCase().includes(word))){
                      return message.reply("Evaluation stopped! Malicious code execution detected!").then(m => m.delete({timeout: 3000}))
                  }
                  const embed = new Discord.MessageEmbed()
                  .setColor("GREEN")
                  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                  .setTitle("Correctly evaluated")
                  .setDescription("**In-Put: 📭**\n" + `\`\`\`js\n${command}\`\`\``+ "\n**Out-Put: 📬**\n" + `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)
                  .addField(`Type:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
                  .setFooter(`Evaluated in: ${Date.now()-message.createdTimestamp}ms`, message.author.displayAvatarURL({dynamic: true}))
                  .setTimestamp()
                  return message.reply(embed)

              }catch (error) {
                  const embedfailure = new Discord.MessageEmbed()
                  .setColor("RED")
                  .setTitle("Error occured!")
                  .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                  .addField(`In-Put: 📭`, `\`\`\`js\n${command}\`\`\``)
                  .addField(`Error: 🛑`, `\`\`\`js\n${error}\`\`\``)
                  .setFooter(`Evaluated in: ${Date.now()-message.createdTimestamp}ms`, message.author.displayAvatarURL({dynamic: true}))
                  .setTimestamp()
                  return message.reply(embedfailure)
            }
    };
      } else        
        if (command == "ping") {

            return message.channel.send("Pinging...").then(m => {
                var botPing = Math.round(client.ws.ping);
                setTimeout(() => {
                    m.edit(`**:ping_pong: Pong! My Ping is: \`${botPing}ms\`**`);
                }, 3000)
            });
        }
        else
        if (command == "serverinfo") {
            
            let level;
		switch (message.guild.verificationLevel) {
        case 'NONE':
            level = '⚪ None set';
            break;
		case 'LOW':
			level = '🟢 Low';
			break;
		case 'MEDIUM':
			level = '🟡 Medium';
			break;
		case 'HIGH':
			level = '🟠 High';
			break;
		case 'VERY_HIGH':
			level = '🛑 Very High';
			break;
		}
            
            var date = Date.now()
            const serverinfoembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
            .setTitle(`Server-Information about ${message.guild.name}`)
            .addFields(
                {
                name: "Server-ID 🆔:",
                value: `${message.guild.id}`,
                inline: false
                },
                {
                name: "Server Owner:",
                value: `${message.guild.owner.user.tag}\n<@!${message.guild.ownerID}>`,
                inline: false
                },
                {
                name: "Member Count:",
                value: `${message.guild.memberCount}`,
                inline: false
                },
                {
                name: "Verification Level:",
                value: `${level}`,
                inline: false
                },
                {
                name: "Created at:",
                value: `<t:${parseInt(message.guild.createdTimestamp / 1000)}:F>\n<t:${parseInt(message.guild.createdTimestamp / 1000)}:R>`,
                inline: false
                }
            )
            .setTimestamp()
            .setFooter(`Executed in: ${date-message.createdTimestamp}ms`)
            return message.reply(serverinfoembed)
        }
    });


client.login(config.token)
