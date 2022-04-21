module.exports = {
    name: 'mute',
    description: 'Mutes a user for an optional specified amount of time.',
    usage: 'ds!mute <user> (optional)<time> (optional)<reason>',
    run: async(client, msg, args) => {
        try{
            let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(member => member.user.username.toLowerCase() === args.slice(0).join(' ').toLowerCase());
            let time = args.slice(1).join(' ');
            let reason = args.slice(2).join(' ');
            if(!msg.member.permissions.has('ADMINISTRATOR')) {
                msg.channel.send('You do not have the permission to mute this member!');
                return;
            }
            if(!user) {
                return msg.channel.send('Please specify a user to mute! (Mention the user or use their ID, also make sure the User is in this Server!)');
            }

            if(!msg.guild.roles.cache.find(role => role.name === 'Muted')) {
                if(!msg.guild.me.permissions.has('MANAGE_ROLES')) {
                    return msg.channel.send('I do not have the permission to create a Muted Role!');
                }
                if(!msg.guild.me.permissions.has('MANAGE_CHANNELS')) {
                    return msg.channel.send('I do not have the permission to set the Muted Role\'s Permissions!');
                }
                let muteRole = await msg.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#000000',
                        permissions: []
                    }
                });
                await msg.guild.channels.cache.forEach(async(channel) => {
                    await channel.updateOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CREATE_THREADS: false,
                        SEND_MESSAGES_IN_THREADS: false,
                        CONNECT: false
                    });
                });
            }
            if(user.roles.cache.find(role => role.name === 'Muted')) {
                return msg.channel.send('This user is already muted!');
            }
            if(!time) {
                await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                return msg.channel.send(`${user} has been muted!`);
            }

            if(time) {
                let muteTime = time.split(' ');
                if(muteTime[1] === 's') {
                    muteTime = parseInt(muteTime[0]);
                    await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                    return msg.channel.send(`${user} has been muted for ${muteTime} seconds!`);
                }
                if(muteTime[1] === 'm') {
                    muteTime = parseInt(muteTime[0]) * 60;
                    await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                    return msg.channel.send(`${user} has been muted for ${muteTime} seconds!`);
                }
                if(muteTime[1] === 'h') {
                    muteTime = parseInt(muteTime[0]) * 60 * 60;
                    await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                    return msg.channel.send(`${user} has been muted for ${muteTime} seconds!`);
                }
                if(muteTime[1] === 'd') {
                    muteTime = parseInt(muteTime[0]) * 60 * 60 * 24;
                    await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                    return msg.channel.send(`${user} has been muted for ${muteTime} seconds!`);
                }
            }
            
            if(reason) {
                await user.roles.add(msg.guild.roles.cache.find(role => role.name === 'Muted'));
                return msg.channel.send(`${user} has been muted for ${time} with the reason: ${reason}!`);
            }
        }catch(err) {
            console.log(err);
            return msg.channel.send(`Oh no, an error occurred: \`${err.stack}\`.`);
        }
    }
};
