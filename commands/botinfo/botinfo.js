const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const process = require("process");

module.exports = {
    name: 'static',
    description: "Provides Information about the Bot",
    aliases: ["statistics", "i", "stats", "about", "botinfo", "info"],
    utilisation: '{prefix}static',

    run: async (client, message) => {
        try {
            let uptime = Math.round(parseInt(client.readyTimestamp) / 1000)
            let created = Math.round(parseInt(client.user.createdTimestamp) / 1000);
            let button = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Update")
                    .setCustomId("rel"),
                new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Delete")
                    .setCustomId("del"))

            let embed = new MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(client.user.username)
                .setFooter({ text: 'Dragon Serengeti - Made by ' + client.users.cache.get('705557092802625576').tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`
            > **Guilds: \`${client.guilds.cache.size}\`**
            > **Users: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}\`**
            > **Channels: \`${client.channels.cache.size}\`**
            > **Commands: \`${client.commands.size}\`**
            ❯ **Uptime: <t:${uptime}:R>**
            ❯ **Created: <t:${created}:R> - <t:${created}:F>**
            ❯ **Node: \`${process.version}\`**
            ❯ **Discord.js: \`${require('discord.js').version}\`**
            ❯ **OS: \`${process.platform}\`**
            ❯ **CPU: \`${process.arch}\`**
            ❯ **RAM: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB\`**
            `)
                .addField("Invite Bot", `**[Add Me](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1084516334400)**`, true)
            message.channel.send({ embeds: [embed], components: [button] }).then(async Message => {

                let filter = i => i.user.id === message.author.id
                let col = await Message.createMessageComponentCollector({ filter, time: 1200000 });

                col.on('collect', async (button) => {
                    if (button.user.id !== message.author.id) return

                    switch (button.customId) {
                        case 'rel':
                            let embedd = new MessageEmbed()
                                .setColor("BLUE")
                                .setTimestamp()
                                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                .setTitle(client.user.username)
                                .setFooter({ text: 'Dragon Serengeti - Made by ' + client.users.cache.get('705557092802625576').tag, iconURL: client.users.cache.get('705557092802625576').displayAvatarURL({ dynamic: true }) })
                                .setDescription(`
                                > **Guilds: \`${client.guilds.cache.size}\`**
                                > **Users: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}\`**
                                > **Channels: \`${client.channels.cache.size}\`**
                                > **Commands: \`${client.commands.size}\`**
                                ❯ **Uptime: <t:${uptime}:R>**
                                ❯ **Created: <t:${created}:R> - <t:${created}:F>**
                                ❯ **Node: \`${process.version}\`**
                                ❯ **Discord.js: \`${require('discord.js').version}\`**
                                ❯ **OS: \`${process.platform}\`**
                                ❯ **CPU: \`${process.arch}\`**
                                ❯ **RAM: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB\`**
                                `)
                                .addField("Invite Bot", `**[Add Me](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1084516334400)**`, true)

                            await Message.edit({ embeds: [embedd] })
                            button.reply({ content: "> **✅ Success:** Bot statistics updated!", ephemeral: true }).catch(e => { });

                            break
                        case 'del':
                            col.stop(true)
                            await message.delete().catch(e => { });
                            await Message.delete().catch(e => { });
                            button.reply({ content: "> **✅ Success** Bot statistic deleted!", ephemeral: true }).catch(e => { });
                            break

                    }
                })
                col.on('end', async (button) => {

                    button = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Update")
                            .setCustomId("rel")
                            .setDisabled(true),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Delete")
                            .setCustomId("del")
                            .setDisabled(true))

                    let embedd = new MessageEmbed()
                        .setColor("BLUE")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(client.user.username + " Command Time Ended")
                        .setFooter({ text: 'Dragon Serengeti - Made by ' + client.users.cache.get('705557092802625576').tag, iconURL: client.users.cache.get('705557092802625576').displayAvatarURL({ dynamic: true }) })
                        .setDescription(`
                        > **Guilds: \`${client.guilds.cache.size}\`**
                        > **Users: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString("tr-TR"))}\`**
                        > **Channels: \`${client.channels.cache.size}\`**
                        > **Commands: \`${client.commands.size}\`**
                        ❯ **Uptime: <t:${uptime}:R>**
                        ❯ **Created: <t:${created}:R> - <t:${created}:F>**
                        ❯ **Node: \`${process.version}\`**
                        ❯ **Discord.js: \`${require('discord.js').version}\`**
                        ❯ **OS: \`${process.platform}\`**
                        ❯ **CPU: \`${process.arch}\`**
                        ❯ **RAM: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB\`**
                        `)
                        .addField("Invite Bot", `**[Add Me](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1084516334400)**`, true)

                    await Message.edit({ embeds: [embedd], components: [button] })
                })
            }).catch(e => { console.log(e) });
        } catch (e) {
            console.log(e)
        }
    },
};
