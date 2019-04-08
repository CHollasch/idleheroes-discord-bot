const fs = require('fs');
const debug = require('./debug');

const PI = require('pureimage');
const NodeCache = require('node-cache');

const uint32 = require('uint32');
const {normal} = require('color-blend');

let fontLoaded = false;

async function alphaDrawImage(original, bitmap, dx, dy, dw, dh, dbg) {
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

    if (dbg) {
        const img = await readImage('./assets/dbox.png');
        await alphaDrawImage(original, img, dx, dy, dw, dh, false);
    }
}

async function readImage(path) {
    if (!fs.existsSync(path)) {
        const err = PI.make(150, 40, {});
        await loadFont();

        err.getContext().font = "64pt 'Idle Heroes'";
        err.getContext().fillStyle = 'red';
        err.getContext().fillText('ERROR LOADING ASSET', 12, 24);

        console.log(`Attempted to load ${path}, but the path does not exist.`);

        return err;
    }

    return await PI.decodePNGFromStream(fs.createReadStream(path)).catch(null);
}

module.exports = {
    alphaDrawImage: async (original, bitmap, dx, dy, dw, dh) => {
        await alphaDrawImage(original, bitmap,  dx, dy, dw, dh, debug);
    },
    loadFont: async () => {
        if (fontLoaded) {
            return;
        }

        return new Promise((resolve) => {
            PI.registerFont('./assets/ih.ttf', 'Idle Heroes').load(() => {
                resolve();
                fontLoaded = true;
            });
        });
    },
    imageCache: new NodeCache({stdTTL: 60 * 10, checkperiod: 60}),
    readImage
};
