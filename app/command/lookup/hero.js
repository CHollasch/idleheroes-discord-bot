const {RichEmbed} = require('discord.js');
const lookupSimple = require('../../middleware/lookupsimple');

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

function lookup(channel, scope, raw) {
    const hero = lookupHero(raw.found);

    if (!hero.builds || !hero.level) {
        channel.send(`There are no statistics for **${hero.name}** yet.`);
        return;
    }

    const star = scope.includes('10') ? 10
        : scope.includes('9') || scope.includes('8') || scope.includes('7') || scope.includes('6') ? 6
            : 5;

    const fileName = `${hero.name.toLowerCase().replace(/ /g, '-')}`;
    const embed = new RichEmbed()
        .setTimestamp()
        .setColor(0x0066ff)
        .setTitle(`**${hero.name}** - ${star} star statistics`)
        .setDescription([
            `**${hero.role}**  -  PvP *${hero.pvp}/10*, PvE *${hero.pve}/10*`,
        ])
        .attachFile(`./assets/heroes/${hero.faction}/${fileName}/${star}.png`)
        .setThumbnail(`attachment://${star}.png`)
        .addField('Base Statistics', buildField(hero.level[star]), false);

    channel.send(embed);
}

module.exports = {
    hero: {
        aliases: ['hero', 'heroes', 'h', 'herostats', 'hstats', 'character', 'player'],
        command: (channel, scope) => lookupSimple(
            channel, scope, 'hero', findHeroName, (item => lookup(channel, scope, item))
        )
    }
};
