const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const moment = require("moment");
const { inspect } = require('util');
const config = require("./config.json");

prefix = config.prefix

client.once("ready", () => {
    console.log("Bereit: ", client.user.tag)
});

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "userinfo") {
        let Target = message.mentions.users.first() || message.author
        let Member = message.guild.members.cache.get(Target.id)
        var time = Date.now()
        const embed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setAuthor(`${Target.tag}`, Target.displayAvatarURL({dynamic: true}))
        .setThumbnail(Target.displayAvatarURL({dynamic: true}))
        .addField("ID:", `${Target.id}`)
        .addField("Roles:", `${Member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || None}`)
        .addField("Server Member since:", `<t:${parseInt(Member.joinedTimestamp / 1000)}:F> ` + "-" + ` <t:${parseInt(Member.joinedTimestamp / 1000)}:R>`)
        .addField("Discord User since:", `<t:${parseInt(Member.user.createdTimestamp / 1000)}:F> ` + "-" + ` <t:${parseInt(Member.user.createdTimestamp / 1000)}:R>`)
        .setFooter(`Time taken: ${Date.now() - time}ms`)
        .setTimestamp()
        message.reply(embed)
    } else
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
              .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              .addField(`In-Put: 📭`, `\`\`\`js\n${command}\`\`\``)
              .addField(`Error: 🛑`, `\`\`\`js\n${error}\`\`\``)
              .addField(`Evaluated in: ⏱️`, `\`\`\`${Date.now()-message.createdTimestamp} ms\`\`\``)
              .setFooter("Made by Ohnezahn ZAE#8135", message.author.displayAvatarURL({dynamic: true}))
              .setTimestamp()
              message.reply(embedfailure)
        }
    } else {
        if (command == "ping") {
            message.channel.send("Pinging...").then(m => {
                var botPing = Math.round(client.ws.ping);
    
                m.edit(`**:ping_pong: Pong! My Ping is: \`${botPing}ms\`**`);
            });
        }
    }
});

client.login(config.token)
