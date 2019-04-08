const {findAuraName} = require('../../translations');
const lookup = require('../../middleware/lookupsimple');

module.exports = {
    aura: {
        aliases: ['aura', 'a', 'auras'],
        command: (channel, scope) => {
            lookup(channel, scope, 'aura', findAuraName, (item => {
                channel.send({
                    files: [`./assets/auras/details/${item.found}.png`]
                });
            }));
        }
    }
};
