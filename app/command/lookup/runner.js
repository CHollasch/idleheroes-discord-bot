const types = {
    ...require('./hero'),
    ...require('./tier'),
    ...require('./vip'),
    ...require('./artifact'),
    ...require('./aura'),
    ...require('./event')
};

function getSub(name) {
    for (const cmd of Object.keys(types)) {
        const val = types[cmd];

        if (val.aliases.includes(name)) {
            return val.command;
        }
    }
}

function command(client, msg) {
    const channel = msg.channel;
    const argv = msg.content.split(/ /g);

    if (argv.length < 3) {
        channel.send('Needs lookup mode. Types ``(hero/tier/vip/event/artifact/aura/guildboss/gear/skin/stone/brokenspace)``');
        return;
    }

    const cmd = getSub(argv[2].toLowerCase());

    if (!cmd) {
        const broadSearch = argv.splice(3).join(' ');

        if (fuzzyBroadSearch(broadSearch)) {
            return;
        }

        channel.send('No such type. Types ``(hero/tier/vip/event/artifact/aura/guildboss/gear/skin/stone/brokenspace)``');
        return;
    }

    cmd(channel, argv.splice(3));
}

function fuzzyBroadSearch(term) {

}

module.exports = {
    name: 'lookup',
    aliases: ['lookup', 'l', 'lup', 'search', 'find', 'info'],
    command
};
