const {findTierName} = require('../../translations');
const lookup = require('../../middleware/lookupsimple');

module.exports = {
    tier: {
        aliases: ['gb', 'guildboss', 'boss', 'bossguild', 'raid', 'guildraid', 'guild'],
        command: (channel, scope) => {
            lookup(channel, scope, 'guild raid', findTierName, (item => {
                channel.send(`Guild boss ${item.found}:`, {
                    files: [`./assets/raids/${item.found}.png`]
                });
            }));
        }
    }
};
