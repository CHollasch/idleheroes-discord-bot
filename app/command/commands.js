const commands = [
    cmd('lookup/runner'),
    cmd('team'),
    cmd('fakehero')
];

const config = require('../../config');

module.exports = (client, msg) => {
    const contents = msg.content;

    if (config.commandPrefixes.includes(contents.split(/ +/)[0].toLowerCase())) {
        const argv = contents.split(/ +/g);

        if (argv.length <= 1) {
            return;
        }

        const command = argv[1];
        for (const c of commands) {
            if (c.name === command || c.aliases.indexOf(command) >= 0) {
                try {
                    c.command(client, msg);
                } catch (error) {
                    console.trace(error);
                }
            }
        }
    }
};

function cmd(name) {
    return require(`./${name}`);
}
