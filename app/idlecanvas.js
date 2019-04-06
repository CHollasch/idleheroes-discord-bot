const fs = require('fs');
const {PNG} = require('pngjs');
const PI = require('pureimage');
const {normal} = require('color-blend');
const uint32 = require('uint32');

const {lookupAura, getAuraDetails} = require('./heroes');
const {lookupArtifact} = require('./artifacts');

let fontLoaded = false;

async function loadFont() {
    if (fontLoaded) {
        return;
    }

    return new Promise((resolve) => {
        PI.registerFont('./assets/ih.ttf', 'Idle Heroes').load(() => {
            resolve();
            fontLoaded = true;
        });
    });
}

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

const artifactBase = [265, 120], artifactSize = 135;
const textStart = 315, textGap = 50;

async function generateArtifactDetails(artifact) {

    let bg;
    if (artifact instanceof Array) {
        bg = await readImage('./assets/artifactDisplayCompare.png');
    } else {
        bg = await readImage(`./assets/artifactDisplay.png`);
    }

    const drawing = PI.make(bg.width, bg.height, {});
    const ctx = drawing.getContext();

    async function drawArtifact(artifact, xoff) {
        function doOffset(b, w, s) {
            return b[0] - (w / 2) + (s / 2) + xoff;
        }

        const artifactImage = await readImage(`./assets/artifacts/${artifact.level}/${artifact.label.replace(`'`, '')}.png`);
        alphaDrawImage(ctx, artifactImage, artifactBase[0] + xoff, artifactBase[1], artifactSize, artifactSize);

        await loadFont();
        ctx.font = "32pt Idle Heroes";
        ctx.fillStyle = '#FA8E1A';

        let textWidth = ctx.measureText(artifact.name).width;
        ctx.fillText(artifact.name, doOffset(artifactBase, textWidth, artifactSize), (artifactSize / 2) + 16);

        ctx.fillStyle = 'white';

        let yIndex = textStart;
        for (const stat of artifact.stats) {
            if (stat.includes('Faction')) {
                continue;
            }

            textWidth = ctx.measureText(stat).width;
            ctx.fillText(stat, doOffset(artifactBase, textWidth, artifactSize), yIndex);
            yIndex += textGap;
        }

        if (artifact.faction) {
            yIndex += 20;

            let line = artifact.stats.find(val => val.includes('Faction'));
            const factionLine = `Stats Activation Limit: ${artifact.faction.substring(0, 1).toUpperCase()}${artifact.faction.substring(1).toLowerCase()}`;

            ctx.fillStyle = '#EDCB1F';
            textWidth = ctx.measureText(factionLine).width;

            ctx.fillText(factionLine, doOffset(artifactBase, textWidth, artifactSize), yIndex);
            yIndex += textGap;

            ctx.fillStyle = 'white';
            line = line.split(/\(/)[0].trim();

            textWidth = ctx.measureText(line).width;
            ctx.fillText(line, doOffset(artifactBase, textWidth, artifactSize), yIndex);
        }
    }

    ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, drawing.width, drawing.height);

    if (artifact instanceof Array) {
        const a0 = artifact[0];
        const a1 = artifact[1];

        await drawArtifact(a0, 0);
        await drawArtifact(a1, 600);
    } else {
        await drawArtifact(artifact, 0);
    }

    try {
        return await PNG.sync.write(drawing);
    } catch (err) {
        console.log('Error while writing image for artifact details.');
        console.trace(err);
        return null;
    }
}

async function drawHeroInDepth(hero, slot, bake = true) {
    const heroDetailFrameHeroLocation = [13, 13];
    const heroDetailFrameStoneLocation = [13, 205];
    const heroDetailFrameTypeLocation = [193, 13];
    const artifactRowLocations = [[194, 47], [194, 120]];
    const heroPlacementIdentifierLocation = [384, 255];

    let build = hero.builds.filter(build => build.slot.includes(slot));

    build.sort((a, b) => {
        return b.weight - a.weight;
    });

    build = build[0];

    // Any build is better than none, right...? maybe....?
    if (!build) {
        build = hero.builds[0];
    }

    const bg = await readImage('./assets/heroDetailsDisplay.png');
    const drawing = PI.make(bg.width, bg.height, {});
    const ctx = drawing.getContext();

    alphaDrawImage(ctx, bg, 0, 0, drawing.width, drawing.height);

    const heroImage = await readImage(`./assets/heroes/${hero.faction}/${hero.name.toLowerCase().replace(/ /g, '-')}/5.png`);
    alphaDrawImage(ctx, heroImage, heroDetailFrameHeroLocation[0], heroDetailFrameHeroLocation[1], 175, 175);

    const stone = await readImage('./assets/stones/orange6.png');
    alphaDrawImage(ctx, stone, heroDetailFrameStoneLocation[0], heroDetailFrameStoneLocation[1], 80, 80);

    const typeImage = await readImage(`./assets/heroes/types/${hero.role.toLowerCase()}.png`);
    alphaDrawImage(ctx, typeImage, heroDetailFrameTypeLocation[0], heroDetailFrameTypeLocation[1], 28, 28);

    let row = true;
    let off = -74;

    for (const artifactName of build.artifact) {
        row = !row;

        const artifact = lookupArtifact(artifactName);
        const image = await readImage(`./assets/artifacts/${artifact.level}/${artifact.label}.png`);

        const placement = artifactRowLocations[row ? 1 : 0];

        off += (row ? 0 : 74);
        alphaDrawImage(ctx, image, placement[0] + off, placement[1], 70, 70);
    }

    await loadFont();
    ctx.font = "18pt Idle Heroes";
    ctx.fillStyle = '#FFFFFF';

    const stoneParts = build.stone.split(/ ?\/ ?/);

    off = 0;
    for (const part of stoneParts) {
        ctx.fillText(part, 105, 220 + off);
        off += 20;
    }

    const placement = await readImage(`./assets/slots/${Math.max(1, Math.min(6, slot))}.png`);
    alphaDrawImage(ctx, placement, heroPlacementIdentifierLocation[0], heroPlacementIdentifierLocation[1], placement.width, placement.height);

    if (!bake) {
        return drawing;
    }

    try {
        return await PNG.sync.write(drawing);
    } catch (err) {
        console.log('Error while writing hero details to image.');
        console.trace(err);
        return null;
    }
}

async function generateDetailedLineupImage(heroesWithSlots, options = {
    overlay: true,
    background: true,
    confidence: false,
    aura: true,
}) {
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
            render = await drawHeroInDepth(hero, slot, false);
        }

        const pos = slotmap[slot - 1];
        alphaDrawImage(ctx, render, pos[0], pos[1], render.width, render.height);

        if (options.confidence) {
            const style = `rgba(${(255 - (confidence * 255))},${confidence * 255},0,1)`;
            ctx.strokeStyle = style;

            for (let i = 5; i < 10; ++i) {
                ctx.strokeRect(pos[0] + i, pos[1] + i, render.width - (i * 2), render.height - (i * 2));
            }

            ctx.font = '16pt "Idle Heroes"';
            ctx.fillStyle = style;
            ctx.fillText(confidence.toFixed(2) + '/1.0', pos[0] + 25, pos[1] + render.height - 15);
        }
    }

    const aura = lookupAura(heroesWithSlots.map(hero => hero.hero));

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

function alphaDrawImage(original, bitmap, dx, dy, dw, dh) {
    const sx = 0, sy = 0;
    const sw = bitmap.width, sh = bitmap.height;

    for (let i = 0; i < dw; i++) {
        const tx = i / dw;
        const ssx = Math.floor(tx * sw) + sx;

        for (let j = 0; j < dh; j++) {
            const ty = j / dh;
            const ssy = sy + Math.floor(ty * sh);

            let rgba = bitmap.getPixelRGBA(ssx, ssy);

            const bytes1 = uint32.getBytesBigEndian(rgba);
            const bytes2 = uint32.getBytesBigEndian(original.bitmap.getPixelRGBA(dx + i, dy + j));

            const c1 = {r: bytes1[0], g: bytes1[1], b: bytes1[2], a: bytes1[3] / 0xFF};
            const c2 = {r: bytes2[0], g: bytes2[1], b: bytes2[2], a: bytes2[3] / 0xFF};

            if (c1.a < 1) {
                const blend = normal(c2, c1);
                rgba = Math.floor(blend.a * 0xFF) + Math.floor(blend.b << 8) + Math.floor(blend.g << 16) + Math.floor(blend.r << 24);
            }

            original.bitmap.setPixelRGBA(dx + i, dy + j, rgba);
        }
    }
}

async function readImage(path) {
    return await PI.decodePNGFromStream(fs.createReadStream(path)).catch(null);
}

module.exports = {
    generateLineupImage,
    generateArtifactDetails,
    generateDetailedLineupImage
}
