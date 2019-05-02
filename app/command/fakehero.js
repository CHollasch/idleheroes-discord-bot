const RSB = require('stream-buffers').ReadableStreamBuffer;

const {buildHero} = require('../canvas/canvas');
const {findFaction} = require('../translations');

const {PNG} = require('pngjs');
const PI = require('pureimage');

const request = require('request');

const starCount = (uid) => ((uid % 9) + 5);
const faction = (uid) => factions[uid % factions.length];
const factions = ['dark', 'light', 'fortress', 'forest', 'abyss', 'shadow'];

function hashCode(s) {
    let h = 0;

    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }

    return h;
}

function tryArg(arg, channel, options) {
    if (isNaN(parseInt(arg))) {
        // Parse faction
        let factionRaw = arg.toLowerCase();
        factionRaw = findFaction(factionRaw);

        if (factionRaw.flagged) {
            channel.send(`I'm unsure about that... Did you mean '*${factionRaw.found}*'`);
            return;
        }

        options.faction = factionRaw.found;
    } else {
        let starRaw = parseInt(arg);
        starRaw = Math.min(Math.max(starRaw, 1), 13);
        options.stars = starRaw;
    }
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
    const options = {faction: fac, stars};

    if (args.length > 3) {
        tryArg(args[3], channel, options);
    }
    if (args.length > 4) {
        tryArg(args[4], channel, options);
    }

    fac = options.faction;
    stars = options.stars;

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
