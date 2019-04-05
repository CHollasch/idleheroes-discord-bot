const {findTierName} = require('../../translations');

function lookup(channel, scope) {
    if (scope.length === 0) {
        channel.send('No tier specified.');
        return;
    }

    const tier = findTierName(scope.join(' '));

    if (!tier) {
        channel.send('No such tier. Try ``t0/t1/t1.5/t2/t2.5/t3``');
        return;
    }

    channel.send(`Tier ${tier} heroes:`, {
        files: [`./assets/tiers/${tier}.png`]
    });
}

module.exports = {
    tier: {
        aliases: ['tier', 'tiers', 't'],
        command: lookup
    }
};
