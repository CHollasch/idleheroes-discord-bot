const {PNG} = require('pngjs');
const PI = require('pureimage');

const {readImage, loadFont, imageCache, alphaDrawImage} = require('./util');

const artifactBase = [265, 120], artifactSize = 135;
const textStart = 315, textGap = 50;

async function generateArtifactDetails(artifact) {
    function generateArtifactCacheKey() {
        if (artifact instanceof Array) {
            return artifact.map(art => art.name).sort((a, b) => a.localeCompare(b)).join(',');
        } else {
            return artifact.name;
        }
    }

    const cached = imageCache.get(generateArtifactCacheKey());

    if (cached) {
        return cached;
    }

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
        ctx.font = "32pt 'Idle Heroes'";
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
        const render = await PNG.sync.write(drawing);
        imageCache.set(generateArtifactCacheKey(), render);

        return await PNG.sync.write(drawing);
    } catch (err) {
        console.log('Error while writing image for artifact details.');
        console.trace(err);
        return null;
    }
}

module.exports = {
    generateArtifactDetails
};
