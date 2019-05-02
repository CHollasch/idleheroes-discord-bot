const fs = require('fs');

const {PNG} = require('pngjs');
const PI = require('pureimage');

const uint32 = require('uint32');

const {lookupArtifact} = require('../artifacts');
const {alphaDrawImage, loadFont, readImage} = require('./util');

async function drawHeroInDepth(hero, slot, stars, bake = true) {
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

    const heroImage = await buildHero(hero, stars, true);
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

const starLookup = {
    1: {file: '1.png', placement: [{file: '5star.png', location: [75, 138], size: [27, 27]}]},
    2: {
        file: '2.png', placement: [
            {file: '5star.png', location: [86, 138], size: [27, 27]},
            {file: '5star.png', location: [63, 138], size: [27, 27]}
        ]
    },
    3: {
        file: '3.png', placement: [
            {file: '5star.png', location: [97, 138], size: [27, 27]},
            {file: '5star.png', location: [74, 138], size: [27, 27]},
            {file: '5star.png', location: [51, 138], size: [27, 27]},
        ]
    },
    4: {
        file: '4.png', placement: [
            {file: '5star.png', location: [108, 138], size: [27, 27]},
            {file: '5star.png', location: [85, 138], size: [27, 27]},
            {file: '5star.png', location: [63, 138], size: [27, 27]},
            {file: '5star.png', location: [40, 138], size: [27, 27]},
        ]
    },
    5: {
        file: '5.png', placement: [
            {file: '5star.png', location: [120, 138], size: [27, 27]},
            {file: '5star.png', location: [97, 138], size: [27, 27]},
            {file: '5star.png', location: [75, 138], size: [27, 27]},
            {file: '5star.png', location: [53, 138], size: [27, 27]},
            {file: '5star.png', location: [30, 138], size: [27, 27]},
        ]
    },
    6: {
        file: '6.png', placement: [
            {file: '6star.png', location: [70, 129], size: [35, 35]}
        ]
    },
    7: {
        file: '6.png', placement: [
            {file: '6star.png', location: [81, 129], size: [35, 35]},
            {file: '6star.png', location: [57, 129], size: [35, 35]},
        ]
    },
    8: {
        file: '6.png', placement: [
            {file: '6star.png', location: [93, 129], size: [35, 35]},
            {file: '6star.png', location: [71, 129], size: [35, 35]},
            {file: '6star.png', location: [47, 129], size: [35, 35]},
        ]
    },
    9: {
        file: '6.png', placement: [
            {file: '6star.png', location: [103, 129], size: [35, 35]},
            {file: '6star.png', location: [80, 129], size: [35, 35]},
            {file: '6star.png', location: [58, 129], size: [35, 35]},
            {file: '6star.png', location: [35, 129], size: [35, 35]},
        ]
    },
    10: {
        file: '10.png', placement: [
            {file: '10star.png', location: [66, 121], size: [45, 45]}
        ]
    },
    11: {file: '10.png', placement: [{file: 'e1.png', location: [20, 120], size: [134, 46]}]},
    12: {file: '10.png', placement: [{file: 'e2.png', location: [20, 120], size: [134, 46]}]},
    13: {file: '10.png', placement: [{file: 'e3.png', location: [20, 120], size: [134, 46]}]}
};

async function smartFindHero(hero, stars) {
    const path = `./assets/heroes/${hero.faction}/${hero.label}`;
    const files = fs.readdirSync(path);

    if (files.length === 1) {
        return await readImage(`${path}/${files[0]}`);
    }

    const allStars = files.map(file => parseInt(file.split(/\./g)[0])).sort((a, b) => a - b);

    let using = allStars[0];
    for (let i = 1; i < allStars.length; ++i) {
        const at = allStars[i];

        if (stars >= at) {
            using = allStars[i];
        }
    }

    return await readImage(`${path}/${Math.floor(using)}.png`);
}

async function buildHero(hero, stars, inline = false, heroImageCustom = null) {
    // Clamp stars from 1 to 13 stars.
    if (stars < 1) {
        stars = 1;
    } else if (stars > 13) {
        stars = 13;
    }

    const img = PI.make(175, 175, {});
    const ctx = img.getContext();

    const star = starLookup[stars];

    let heroImage;
    if (heroImageCustom) {
        heroImage = heroImageCustom;
    } else {
        heroImage = await smartFindHero(hero, stars);
    }

    ctx.drawImage(heroImage, 0, 0, heroImage.width, heroImage.height, 0, 0, img.width, img.height);

    const alphaMask = await readImage('./assets/heroes/builder/transparentEdgeMask.png');
    ctx.fillStyle = 'rgba(255,255,255,1)';

    for (let x = 0; x < alphaMask.width; ++x) {
        for (let y = 0; y < alphaMask.height; ++y) {
            if (uint32.getBytesBigEndian(alphaMask.getPixelRGBA(x, y))[3] > 0) {
                img.setPixelRGBA(x, y, 0);
            }
        }
    }

    const frame = await readImage(`./assets/heroes/builder/${hero.faction}Frame.png`);
    alphaDrawImage(ctx, frame, 0, 0, img.width, img.height);

    for (const placement of star.placement) {
        const img = await readImage(`./assets/heroes/builder/${placement.file}`);
        alphaDrawImage(ctx, img, placement.location[0], placement.location[1], placement.size[0], placement.size[1]);
    }

    if (inline) {
        return img;
    }

    return (await PNG.sync.write(img));
}

module.exports = {
    buildHero,
    drawHeroInDepth,
};
