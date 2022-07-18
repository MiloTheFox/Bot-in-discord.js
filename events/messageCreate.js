module.exports = (client, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") return;
        let prefixes = ["ds!", "Ds!", "DS!", "<@957081302815871016>", "<@!957081302815871016>"]
        let prefixChoose = ""
        prefixes.forEach((prefix) => {
            if (message.content.startsWith(prefix)) {
                prefixChoose = prefix;
            }
        });
        
        if(!message.guild) return;
        
        if (!prefixChoose) return;
        let args = message.content.slice(prefixChoose.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases?.includes(command));

        let DJ = client.config.opt.DJ;

        if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
            const roleDJ = message.guild.roles.cache.find(
                (x) => x.name === DJ.roleName
            );

            if (!message.member.roles.cache.has(roleDJ.id)) {
                return message.channel.send({
                    content: `${message.author}, This command is set only for those with the ${DJ.roleName} role. ❌`,
                });
            }
        }

        if (cmd && cmd.voiceChannel) {
            if (!message.member.voice.channel)
                return message.channel.send({
                    content: `${message.author}, You are not connected to an audio channel. ❌`,
                });
            if (
                message.guild.me.voice.channel &&
                message.member.voice.channel.id !== message.guild.me.voice.channel.id
            )
                return message.channel.send({
                    content: `${message.author}, You are not on the same audio channel as me. ❌`,
                });
        }

        if (cmd)
            try {
                cmd.run(client, message, args);
            } catch (err) {
                console.log(err)
            }
    } catch (e) {
        console.log(e);
    }
};
