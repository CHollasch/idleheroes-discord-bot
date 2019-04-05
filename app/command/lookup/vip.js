const {RichEmbed} = require('discord.js');
const {commas} = require('../../util/numberutil');

const vipData = [
    ['350', '10%', '20%', '+20', 'no', 'no', '+1', '+1', 'x2', '$7.00'],
    ['700', '20%', '40%', '+20', 'yes', 'no', '+0', '+0', 'x2', '$14.00'],
    ['1,400', '30%', '60%', '+20', 'yes', 'yes', '+1', '+1', 'x2', '$28.00'],
    ['3,150', '45%', '80%', '+20', 'yes', 'yes', '+0', '+0', 'x2', '$63.00'],
    ['7,560', '60%', '100%', '+20', 'yes', 'yes', '+1', '+1', 'x2', '$151.20'],
    ['18,900', '75%', '120%', '+20', 'yes', 'yes', '+0', '+0', 'x2', '$378.00'],
    ['47,250', '90%', '140%', '+30', 'yes', 'yes', '+1', '+1', 'x2', '$945.00'],
    ['103,950', '110%', '160%', '+30', 'yes', 'yes', '+1', '+0', 'x2', '$2,079.00'],
    ['187,110', '130%', '180%', '+40', 'yes', 'yes', '+1', '+1', 'x2', '$3,742.20'],
    ['299,376', '150%', '200%', '+40', 'yes', 'yes', '+1', '+0', 'x2', '$5,987.52'],
    ['449,064', '200%', '350%', '+50', 'yes', 'yes', '+1', '+0', 'x2', '$8,981.28'],
    ['673,596', '200%', '400%', '+50', 'yes', 'yes', '+1', '+0', 'x2', '$13,471.92'],
    ['1,010,394', '200%', '400%', '+100', 'yes', 'yes', '+1', '+1', 'x2', '$20,207.88']
];

const expTable = [350, 700, 1400, 3150, 7560, 18900, 47250, 103950, 187110, 299376, 449064, 673596, 1010394];

function createVIPEmbed(vip) {
    let idx = 0;
    return new RichEmbed()
        .setTimestamp()
        .setColor(0xff9900)
        .setTitle(`VIP ${vip}`)
        .attachFile(`./assets/vip/${vip}.png`)
        .setThumbnail(`attachment://${vip}.png`)
        .addField(`- VIP -`, [
            `VIP Points`,
            `Bonus Resources `,
            `Hand of Midas Bonus`,
            `Hero Storage Size`,
            `10 for 8 Casino Rolls?`,
            `5* for 100 Heroic Summons?󠇰	󠇰	󠇰`,
            `Tavern Quests Daily`,
            `Extra Event Raid Buys`,
            `Battle Speed`,
            `Cost in USD`
        ], true)
        .addField(`- VIP -`, [
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx++],
            vipData[vip - 1][idx],
        ], true);
}

const subCommands = [
    {
        aliases: ['left', 'next'],
        runner: (channel, scope) => {
            if (scope.length === 1) {
                channel.send('Please specify the amount of exp you currently have');
                return;
            }

            const exp = parseInt(scope[1]);

            if (isNaN(exp) || exp < 0) {
                channel.send('VIP experience must be at least 0');
                return;
            }

            let i = 0;
            for (; i < expTable.length; ++i) {
                if (expTable[i] > exp) {
                    break;
                }
            }

            if (i === expTable.length) {
                channel.send('You already have max VIP');
                return;
            }

            const diff = expTable[i] - exp;
            const cost = diff * 0.02;

            channel.send(`You need to spend $${commas(cost)} to reach VIP ${i + 1}`);
        }
    },
    {
        aliases: ['exp', 'experience'],
        runner: (channel, scope) => {
            if (scope.length === 1) {
                channel.send('Please specify an amount of experience greater than 0');
                return;
            }

            const exp = parseInt(scope[1]);

            if (isNaN(exp) || exp < 0) {
                channel.send('VIP experience must be at least 0');
                return;
            }

            channel.send(`${commas(exp)} VIP experience costs $${commas(exp * 0.02)}`);
        }
    }
];

function lookup(channel, scope) {
    if (scope.length === 0) {
        channel.send('Please specify a VIP level from 1 to 13');
        return;
    }

    let sub = null;
    for (const cmd of subCommands) {
        if (cmd.aliases.includes(scope[0].toLowerCase())) {
            sub = cmd;
            break;
        }
    }

    if (sub) {
        sub.runner(channel, scope);
        return;
    }

    const vip = parseInt(scope[0]);

    if (isNaN(vip) || vip > 13 || vip < 1) {
        channel.send('Invalid VIP level, must be 1 through 13');
        return;
    }

    channel.send(createVIPEmbed(vip));
    channel.send({
        files: [`./assets/vip/${vip}bonus.png`]
    });
}

module.exports = {
    vip: {
        aliases: ['vip', 'vips', 'v', 'viplevel', 'purchase'],
        command: lookup
    }
};
