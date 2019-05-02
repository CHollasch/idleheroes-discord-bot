const RSB = require('stream-buffers').ReadableStreamBuffer;

const {buildHero} = require('../canvas/canvas');
const {PNG} = require('pngjs');
const PI = require('pureimage');

const request = require('request');

const starCount = (uid) => ((uid % 9) + 5);
const faction = (uid) => factions[uid % factions.length];

const factions = [
    'shadow',
    'forest',
    'abyss',
    'fortress',
    'light',
    'dark'
];

function hashCode(s) {
    let h = 0;

    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }

    return h;
}

async function command(client, msg) {
    const channel = msg.channel;
    const args = msg.content.split(' ');

    if (msg.mentions.users.array().length === 0) {
        channel.send('Please mention a user');
        return;
    }

    const user = msg.mentions.users.first();
    let avatarURL = user.avatarURL;

    if (!avatarURL) {
        avatarURL = user.defaultAvatarURL;
    }

    const unique = Math.abs(hashCode(avatarURL));

    let stars = starCount(unique);
    let fac = faction(unique);

    if (args.length > 3) {
        let starRaw = parseInt(args[3]);

        if (isNaN(starRaw)) {
            channel.send('The given star count is not a valid number.');
            return;
        }

        if (starRaw < 1 || starRaw > 13) {
            channel.send('Star count must be between 1 and 13 inclusive');
            return;
        }

        stars = starRaw;
    }

    if (args.length > 4) {
        let factionRaw = args[4].toLowerCase();

        if (!factions.includes(factionRaw)) {
            channel.send(`No such faction ${factionRaw}`);
            return;
        }

        fac = factionRaw;
    }

    request({
        url: avatarURL,
        method: 'GET',
        encoding: null
    }, async (err, response, buffer) => {
        const aStream = new RSB({
            frequency: 10, chunkSize: Math.pow(2, 13)
        });

        aStream.put(buffer);

        channel.send({
            files: [{
                attachment: await buildHero({
                    faction: fac
                }, stars, false, await PI.decodePNGFromStream(aStream))
            }]
        });
    });
}

module.exports = {
    name: 'fakehero',
    aliases: ['fakehero', 'buildhero', 'makehero'],
    command
};
