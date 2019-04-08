const {findEvent} = require('../../translations');
const lookup = require('../../middleware/lookupsimple');

module.exports = {
    event: {
        aliases: ['event', 't', 'tiers'],
        command: (channel, scope) => {
            lookup(channel, scope, 'event', findEvent, (item => {
                channel.send(`Event ${item.found}`);
            }));
        }
    }
};
