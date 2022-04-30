const { MessageEmbed } = require('discord.js');
const os = require('os');
const { version } = require('discord.js');
const process = require('process');
const moment = require('moment');

module.exports = {
    name: 'about',
    aliases: ['botinfo', 'bot-stats'],
    description: 'Prints the bot\'s info (name, id, etc.) alongside the os architecture and node version',
    run: async(client, message, args) => {
        try{
            const toTimestamp = (strDate) => {  
                const dt = moment(strDate).unix();  
                return dt;  
            };
        const bot = client.user;
        const botId = bot.id;
        const botTag = bot.tag;
        const botAvatar = bot.displayAvatarURL({ dynamic: true });
        const botCreatedAt = bot.createdAt;
        const botCreatedAtUnix = bot.createdTimestamp;
        const osArch = os.arch();
        const osRelease = os.release();
        const osType = os.type();
        const osLoadavg = os.loadavg();
        const osTotalmem = os.totalmem();
        const osFreemem = os.freemem();
        const osUptime = os.uptime();
        const nodeVersion = process.version;
        const nodeArch = process.arch;
        const discordJsVersion = version;
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setThumbnail(botAvatar)
            .setAuthor({name: botTag, iconURL: botAvatar})
            .setTitle('About')
            .setDescription(`**Bot Tag:** ${botTag}**\nBot ID:** ${botId}\n**Bot Created at Unix:** **<t:${toTimestamp(moment.utc(bot.createdTimestamp))}:F>**\n**OS Architecture:** ${osArch}\n**OS Release:** ${osRelease}\n**OS Type:** ${osType}\n**Node Architecture:** ${nodeArch}\n**Discord.js Version:** ${discordJsVersion}\n**CPU Usage:** ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%\n**RAM Usage:** ${(process.memoryUsage(). heapUsed / 1024 / 1024).toFixed(2)} MB`)
            .setTimestamp()
            .setFooter({text: `Made with ❤️ by ${client.users.cache.get("705557092802625576").tag}`});
        return message.channel.send({ embeds: [embed] });
        } catch(err){
            console.log(err);
        }
    }
};
