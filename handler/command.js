const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Commands').setHeading('Command', 'Load status');

module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌');
                continue;
            }
        }
    });
    console.log(table.toString());

    readdirSync('./events/').forEach((file) => {
        const events = readdirSync('./events/').filter(f => f.endsWith('.js'));
        for (let file of events) {
            let pull = require(`../events/${file}`);
            if (pull.name) {
                client.events.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌');
                continue;
            }
        }
        console.log(`${file} Events loaded!`);
    });
};
