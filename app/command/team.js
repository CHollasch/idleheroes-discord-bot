const { generateDetailedLineupImage } = require('../image/idlecanvas');
const { solve } = require('../solver');
const heroLookup = require('../heroes').lookupHero;

module.exports = {
    name: 'team',
    aliases: ['t', 'buildteam', 'setup', 'layout', 'defense', 'offense'],
    command: async (client, msg) => {
        const channel = msg.channel;
        const argv = msg.content.split(/ /);

        if (argv.length < 2) {
            channel.send(`Format: ${argv[0]} team (solve) [slot 1], [slot 2], [slot 3], [slot 4], [slot 5], [slot 6]`);
            return;
        }

        let scopeSplice = 2, solving = false;
        if (argv[2] === 'solve' || argv[2] === 'solver' || argv[2] === 'fix') {
            scopeSplice++;
            solving = true;
        }

        const scope = argv.splice(scopeSplice);

        if (scope.length === 0) {
            channel.send('Please specify heroes in the team.');
            return;
        }

        const heroFlat = scope.join('-').replace(/,-*/g, ' ').split(/ /);
        let team = [];

        let slot = 1;
        for (const heroName of heroFlat) {
            if (heroName === 'none' || heroName === 'empty' || heroName === 'placeholder') {
                team.push(null);
                continue;
            }

            const hero = heroLookup(heroName);

            if (!hero) {
                channel.send(`Unknown hero ${heroName}. (If this spot is empty, type 'none')`);
                return;
            }

            team.push({hero: hero.hero, slot});
            ++slot;
        }

        if (solving) {
            team = solve([...team.map(val => val.hero)]);

            if (team === null) {
                channel.send('Could not find a solution for your team. This feature is still in development so it may not work with this team.');
                return;
            }

            team = team.map(team => { return {hero: heroLookup(team.hero).hero, slot: team.solvedSlot} });
        }

        channel.send({
            files: [{
                attachment: await generateDetailedLineupImage(team),
                name: 'team.png'
            }]
        });
    }
};
