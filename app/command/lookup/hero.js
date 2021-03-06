const {RichEmbed, Attachment} = require('discord.js');
const lookupSimple = require('../../middleware/lookupsimple');

const {buildHero} = require('../../canvas/canvas');

const {lookupHero} = require('../../heroes');
const {findHeroName} = require('../../translations');

const {commas} = require('../../util/numberutil');

function buildField(heroBase) {
    return [
        `Power **${commas(heroBase.power)}**`,
        `Health **${commas(heroBase.health)}**`,
        `Attack **${commas(heroBase.attack)}**`,
        `Armor **${commas(heroBase.armor)}**`,
        `Speed **${commas(heroBase.speed)}**`,
        ...heroBase.ability
    ];
}

async function lookup(channel, scope, raw, dumping) {
    const hero = lookupHero(raw.found);

    if (dumping) {
        channel.send('```' + JSON.stringify(hero, null, 4) + '```');
        return;
    }

    if (!hero.builds || !hero.level) {
        channel.send(`There are no statistics for **${hero.name}** yet.`);
        return;
    }

    const star = scope.includes('10') ? 10
        : scope.includes('9') || scope.includes('8') || scope.includes('7') || scope.includes('6') ? 6
            : 5;

    const heroImage = await buildHero(hero, star);

    const embed = new RichEmbed()
        .setTimestamp()
        .setColor(0x0066ff)
        .setTitle(`**${hero.name}** - ${star} star statistics`)
        .setDescription([
            `**${hero.role}**  -  PvP *${hero.pvp}/10*, PvE *${hero.pve}/10*`,
        ])
        .attachFile(new Attachment(heroImage, `${star}.png`))
        .setThumbnail(`attachment://${star}.png`)
        .addField('Base Statistics', buildField(hero.level[star]), false);

    channel.send(embed);
}

module.exports = {
    hero: {
        aliases: ['hero', 'heroes', 'h', 'herostats', 'hstats', 'character', 'player'],
        command: (channel, scope) => {
            let dumping = false;

            if (scope.join(' ').trim().endsWith('--jsdump')) {
                scope = scope.splice(0, scope.length - 1);
                dumping = true;
            }

            lookupSimple(
                channel, scope, 'hero', findHeroName, (item => lookup(channel, scope, item, dumping))
            );
        }
    }
};
