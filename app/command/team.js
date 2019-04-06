const {generateDetailedLineupImage} = require('../idlecanvas');
const {solve} = require('../solver');
const heroLookup = require('../heroes').lookupHero;

const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'team',
    aliases: ['t', 'buildteam', 'setup', 'layout', 'defense', 'offense'],
    command: async (client, msg) => {
        const channel = msg.channel;
        const argv = msg.content.split(/ /);

        if (argv.length > 2 && argv[2] === 'help' || argv[2] === 'h') {
            const embed = new RichEmbed()
                .setTimestamp()
                .setColor('#5FB0FF')
                .addField('Team Builder Help', [
                    'The format is as follows',
                    `\`\`${argv[0]} team (solve) [6 heroes separated by commas] [flags]\`\``,
                    'Flags can be located anywhere in the input after the solve identifier.',
                    '......................................................................',
                    '--no-overlay = Disables faction aura style overlays for team render',
                    '--no-background = Disables background for render and leaves transparent',
                    '--no-aura = Does not display aura data when present',
                    '--confidence-levels = Displays confidence levels for each hero placement when solving'
                ], true);

            channel.send(embed);
            return;
        }

        if (argv.length <= 2) {
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

        let preprocessed = scope.join(' ');

        function chkFlag(qualifier) {
            const has = preprocessed.includes(qualifier);
            preprocessed = preprocessed.replace(qualifier, '');
            return has;
        }

        const doingOverlay = !chkFlag('--no-overlay');
        const doingBackground = !chkFlag('--no-background');
        const doingAura = !chkFlag('--no-aura');
        const showingConfidenceLevels = chkFlag('--confidence-levels');

        const heroFlat = preprocessed.trim().split(/,/);
        preprocessed = heroFlat.join('-').replace(/,-*/g, ' ');

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

            team = team.map(hero => {
                return {
                    hero: heroLookup(hero.hero).hero,
                    slot: hero.solvedSlot,
                    confidence: hero.confidence,
                }
            });
        }

        channel.send({
            files: [{
                attachment: await generateDetailedLineupImage(team, {
                    overlay: doingOverlay,
                    background: doingBackground,
                    confidence: showingConfidenceLevels,
                    aura: doingAura
                }),
                name: 'team.png'
            }]
        });
    }
};
