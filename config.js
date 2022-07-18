module.exports = {
        TOKEN: '', // Discord Token
        px: ['ds!', 'Ds!', '<@957081302815871016>', '<@!957081302815871016>'],
        playing: 'Music',

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] 
        },
        selfDeaf: true,
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
