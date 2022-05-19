const log = (arg) => console.log(arg);
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ["ban-id"],
    utilisation: "ds!ban <userid> <reason>",

    run: async (client, message, args) => {
        try {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let reason = args.slice(1).join(' ') || 'No reason provided';
            if(user) {
                try{
                let button = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setStyle("SUCCESS")
                        .setLabel("Ban")
                        .setCustomId("rel"),
                    new MessageButton()
                        .setStyle("DANGER")
                        .setLabel("Revoke")
                        .setCustomId("del")
                );
                let embed1 = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Ban Pending')
                    .setDescription(`**User:** <@${user.id}>\n**Moderator:** <@${message.author.id}>\n**Reason:** ${reason}`)
                    .setTimestamp()
                    .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                return await message.channel.send({ embeds: [embed1], components: [button] }).then(async (Message) => {
                    const filter = (i) => i.user.id === message.author.id;
                    let col = await Message.createMessageComponentCollector({
                        filter,
                        time: 1200000,
                    });

                    col.on("collect", async (button) => {
                        if (button.user.id !== message.author.id) return;
                        switch (button.customId) {
                            case "rel":
                                col.stop(true);
                                await message.guild.members.ban(user.id, { reason: reason });
                                let embed2 = new MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle('Ban executed!')
                                    .setDescription(`**Successfully banned User.**\n**User:** <@${user.id}>\n**Moderator:** <@${message.author.id}>\n**Reason:** ${reason}`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                                await Message.edit({ embeds: [embed2] });
                                button
                                    .reply({
                                        content: "> **✅ Success** | Ban executed!",
                                        ephemeral: true,
                                    })
                                    .catch((e) => {
                                        log(e);
                                    });
                                break;
                            case "del":
                                col.stop(true);
                                let embed3 = new MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle('🆗 Cleared')
                                    .setDescription(`Ban has been aborted!\n**User:** <@${user.mention}>`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                                await Message.edit({ embeds: [embed3] });
                                button
                                    .reply({
                                        content: "> **❌ Denied!** | Ban aborted!",
                                        ephemeral: true,
                                    })
                                    .catch((e) => {
                                        log(e);
                                    }
                                    );
                                break;
                        }
                    });
                    col.on("end", async (button) => {
                        button = new MessageActionRow().addComponents(
                            new MessageButton()
                                .setStyle("SUCCESS")
                                .setLabel("Ban")
                                .setCustomId("ban")
                                .setDisabled(true),
                            new MessageButton()
                                .setStyle("DANGER")
                                .setLabel("Revoke")
                                .setCustomId("clear")
                                .setDisabled(true)
                        );
                        await Message.edit({ components: [button] });

                    });
                });
                } catch(e) {
                    log(e);
                }
        }
            else {
                try {
                    let fetchedUser = await client.users.fetch(args[0]);
                    if (!fetchedUser) {
                        return message.channel.send('Unable to find user! Check the ID and try again!');
                    }
                    let button = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setLabel("Ban")
                            .setCustomId("rel"),
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Revoke")
                            .setCustomId("del")
                    );
                    let embed1 = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Ban Pending')
                        .setDescription(`**User:** <@${fetchedUser.id}>\n**Moderator:** <@${message.author.id}>\n**Reason:** ${reason}`)
                        .setTimestamp()
                        .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                    return await message.channel.send({ embeds: [embed1], components: [button] }).then(async (Message) => {
                        const filter = (i) => i.user.id === message.author.id;
                        let col = await Message.createMessageComponentCollector({
                            filter,
                            time: 1200000,
                        });

                        col.on("collect", async (button) => {
                            if (button.user.id !== message.author.id) return;
                            switch (button.customId) {
                                case "rel":
                                    col.stop(true);
                                    await message.guild.members.ban(fetchedUser.id, { reason: reason });
                                    let embed2 = new MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('Ban executed!')
                                        .setDescription(`**Successfully banned User.**\n**User:** <@${fetchedUser.id}>\n**Moderator:** <@${message.author.id}>\n**Reason:** ${reason}`)
                                        .setTimestamp()
                                        .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                                    await Message.edit({ embeds: [embed2] });
                                    button
                                        .reply({
                                            content: "> **✅ Success** | Ban executed!",
                                            ephemeral: true,
                                        })
                                        .catch((e) => {
                                            log(e);
                                            return;
                                        });
                                    break;
                                case "del":
                                    col.stop(true);
                                    let embed3 = new MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('🆗 Cleared')
                                        .setDescription(`Ban has been aborted!\n**User:** <@${fetchedUser.id}>`)
                                        .setTimestamp()
                                        .setFooter({ text: 'Dragon Serenity Ban System', icon_url: message.author.displayAvatarURL({ dynamic: true }) });
                                    await Message.edit({ embeds: [embed3] });
                                    button
                                        .reply({
                                            content: "> **❌ Denied!** | Ban aborted!",
                                            ephemeral: true,
                                        })
                                        .catch((e) => {
                                            log(e);
                                            return;
                                        }
                                        );
                                    break;
                            }
                        });
                        col.on("end", async (button) => {
                            button = new MessageActionRow().addComponents(
                                new MessageButton()
                                    .setStyle("SUCCESS")
                                    .setLabel("Ban")
                                    .setCustomId("ban")
                                    .setDisabled(true),
                                new MessageButton()
                                    .setStyle("DANGER")
                                    .setLabel("Revoke")
                                    .setCustomId("clear")
                                    .setDisabled(true)
                            );
                            return await Message.edit({ components: [button] });

                        });
                    });
                } catch (e) {
                    log(e);
                    return;
                }
        }
            } catch (e) {
            log(e);
            return
        }
    }
}
