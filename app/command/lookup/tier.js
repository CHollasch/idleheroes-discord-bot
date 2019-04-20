const {findTierName} = require('../../translations');
const lookup = require('../../middleware/lookupsimple');

module.exports = {
    tier: {
        aliases: ['tier', 't', 'tiers'],
        command: (channel, scope) => {
            lookup(channel, scope, 'event', findTierName, (item => {
                channel.send(`Tier ${item.found}:`, {
                    files: [`./assets/tiers/${item.found}.png`]
                });
            }));
        }
    }
};
