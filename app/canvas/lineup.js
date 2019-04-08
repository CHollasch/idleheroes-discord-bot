const {PNG} = require('pngjs');
const PI = require('pureimage');

const {drawHeroInDepth} = require('./hero');
const {lookupAura, getAuraDetails} = require('../heroes');
const {alphaDrawImage, readImage} = require('./util');

const spots = [
    [16, 27],
    [95, 27],
    [195, 27],
    [274, 27],
    [354, 27],
    [433, 27]
], heroSize = 75;

const auraBase = [14, 106], auraIncrement = 31, auraLocs = [
    'shadow', 'fortress', 'abyss', 'forest', 'dark', 'light', 'rainbow', 'goodVsEvil', 'ruin', 'redemption', 'justice', 'evil', 'pollution', 'boundSoul', 'lifeAndDeath', 'oldEnemy'
], auraSize = 30;

const heroTypeSpots = [
    [39, 2],
    [119, 2],
    [219, 2],
    [300, 2],
    [380, 2],
    [458, 2]
];
const heroTypeSize = 24;

async function generateLineupImage(heroes) {
    const bg = await readImage('./assets/heroDisplay.png');

    const drawing = PI.make(bg.width, bg.height, {});
    const ctx = drawing.getContext();

    ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, drawing.width, drawing.height);

    for (let i = 0; i < heroes.length; ++i) {
        const hero = heroes[i];

        if (hero === null || hero === undefined) {
            continue;
        }

        await placeHero(drawing, hero.hero, hero.stars, i + 1);
    }

    const flatHeroes = [];
    for (const hero of heroes) {
        if (!hero) {
            flatHeroes.push(null);
            continue;
        }

        flatHeroes.push(hero.hero);
    }

    const aura = lookupAura(flatHeroes);

    for (let i = 0; i < auraLocs.length; ++i) {
        const auraAt = auraLocs[i];

        if (auraAt === aura) {
            const auraImage = await readImage(`./assets/auras/${aura}.png`);
            alphaDrawImage(ctx, auraImage, auraBase[0] + (auraIncrement * i), auraBase[1], auraSize, auraSize);
        }
    }

    try {
        return await PNG.sync.write(drawing);
    } catch (err) {
        console.log(`Error while writing image for hero lineup.`);
        console.trace(err);
        return null;
    }
}

async function placeHero(bg, hero, stars, slot) {
    const heroImage = await readImage(`./assets/heroes/${hero.faction}/${hero.name.toLowerCase().replace(/ /g, '-')}/${stars}.png`);

    alphaDrawImage(
        bg.getContext(), heroImage, spots[slot - 1][0], spots[slot - 1][1], heroSize, heroSize
    );

    const typeImage = await readImage(`./assets/heroes/types/${hero.role.toLowerCase()}.png`);

    alphaDrawImage(
        bg.getContext(), typeImage, heroTypeSpots[slot - 1][0], heroTypeSpots[slot - 1][1], heroTypeSize, heroTypeSize
    );
}

async function generateDetailedLineupImage(heroesWithSlots, options = {
    overlay: true,
    background: true,
    confidence: false,
    aura: true,
}, stars = [5, 5, 5, 5, 5, 5]) {
    const slotmap = [
        [846, 0],
        [423, 0],
        [1269, 325],
        [846, 325],
        [423, 325],
        [0, 325]
    ];

    const auraLoc = [0, 0];

    const image = PI.make(1692, 650, {});
    const ctx = image.getContext();

    if (options.background) {
        const bg = await readImage('./assets/heroDetailedLineupBackground.png');
        ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, image.width, image.height);
    }

    const filled = [];
    for (let i = 0; i < 6; ++i) {
        filled.push({hero: null, slot: (i + 1)});
    }

    for (let data of heroesWithSlots) {
        if (!data) {
            continue;
        }

        filled[data.slot - 1] = data;
    }

    for (const data of filled) {
        const hero = data.hero;
        const slot = data.slot;
        const confidence = data.confidence;

        let render;
        if (!hero) {
            render = await readImage('./assets/heroDetailsDisplay.png');
        } else {
            render = await drawHeroInDepth(hero, slot, stars[slot - 1], false);
        }

        const pos = slotmap[slot - 1];
        alphaDrawImage(ctx, render, pos[0], pos[1], render.width, render.height);

        if (options.confidence && !isNaN(confidence)) {
            ctx.fillStyle = `rgba(${(255 - (confidence * 255))},${confidence * 255},0,0.05)`;

            for (let i = 5; i < 10; ++i) {
                ctx.fillRect(pos[0] + i, pos[1] + i, render.width - (i * 2), render.height - (i * 2));
            }

            ctx.font = '16pt "Idle Heroes"';
            ctx.fillStyle = 'white';
            ctx.fillText(confidence.toFixed(2) + '/1.0', pos[0] + 25, pos[1] + render.height - 15);
        }
    }

    const aura = lookupAura(heroesWithSlots.map(hero => hero ? hero.hero : null));

    if (aura !== null && options.aura) {
        const auraImage = await readImage(`./assets/auras/details/${aura}.png`);
        alphaDrawImage(ctx, auraImage, auraLoc[0], auraLoc[1], auraImage.width * 0.6, auraImage.height * 0.6);

        if (options.overlay) {
            const auraDetails = getAuraDetails(aura);
            if (auraDetails.overlay) {
                const auraOverlay = await readImage(`./assets/auras/details/${auraDetails.overlay}`);
                alphaDrawImage(ctx, auraOverlay, 0, 0, image.width, image.height);
            }
        }
    }

    try {
        return await PNG.sync.write(image);
    } catch (err) {
        console.log('Error while writing hero detailed lineup to image.');
        console.trace(err);
        return null;
    }
}

module.exports = {
    generateLineupImage,
    generateDetailedLineupImage
};
