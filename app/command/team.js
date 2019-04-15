const {generateDetailedLineupImage} = require('../canvas/canvas');
const {solve} = require('../solver');

const heroLookup = require('../heroes').lookupHero;
const { findHeroName } = require('../translations');

const { RichEmbed } = require('discord.js');

function processInputToTeam(channel, input) {
    const heroFlat = input.trim().split(/\s*,\s*/);

    let team = [];

    let slot = 1;
    for (let heroName of heroFlat) {
        if (slot > 6) {
            return team;
        }

        if (heroName === 'none' || heroName === 'empty' || heroName === 'placeholder') {
            team.push({hero: null, slot, starCount: 5});
            ++slot;
            continue;
        }

        heroName = heroName
            .replace(/[eE]1/g, '11')
            .replace(/[eE]2/g, '12')
            .replace(/[eE]3/g, '13')
            .replace(/star */g, '');

        const starsMatch = heroName.match(/[0-9]+/g);
        let starCount = 5;
        if (starsMatch && starsMatch.length !== 0) {
            heroName = heroName.replace(/[0-9]+/g, '').trim();

            const star = starsMatch[0];
            starCount = parseInt(star);
        }

        let hero = findHeroName(heroName);
        const found = heroLookup(hero.found);

        if (hero.flagged) {
            channel.send(`I'm unsure of that... Instead of '*${heroName}*', did you mean '**${found.name}**'?`);
            return null;
        }

        team.push({hero: found, slot, starCount});
        ++slot;
    }

    return team;
}

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
                    `\`\`${argv[0]} team (solve) [6 heroes separated by commas (hero) (star count)] [flags]\`\``,
                    'Flags can be located anywhere in the input after the solve identifier.',
                    '......................................................................',
                    '--no-overlay = Disables faction aura style overlays for team render',
                    '--no-background = Disables background for render and leaves transparent',
                    '--no-aura = Does not display aura data when present',
                    '--confidence-levels = Displays confidence levels for each hero placement when solving',
                    '--pvp = When solving, uses a pvp only weighting function',
                    '--pve = When solving, uses a pve only weighting function',
                    '(It both pvp and pve are not included in flags, their average is used)',
                    '--no-star-weight = Does not account for stars when prioritizing heroes for solver'
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

        const pvp = chkFlag('--pvp');
        const pve = chkFlag('--pve');
        const useStarWeight = !chkFlag('--no-star-weight');

        let team = processInputToTeam(channel, preprocessed);

        if (!team) {
            return;
        }

        if (solving) {
            let pvpOrPve = 'both';
            if (pvp) pvpOrPve = 'pvp';
            if (pve) pvpOrPve = 'pve';

            team = solve([...team.map(val => { return {...val.hero, starCount: val.starCount}; })], {
                pvpOrPve,
                useStarWeight
            });

            if (team === null) {
                channel.send('Could not find a solution for your team. This feature is still in development so it may not work with this team.');
                return;
            }

            team = team.map(hero => {
                if (!hero) {
                    return {hero: null, slot: null, starCount: 5, confidence: null};
                }

                return {
                    hero: heroLookup(hero.hero),
                    slot: hero.solvedSlot,
                    starCount: hero.starCount,
                    confidence: hero.confidence,
                };
            });
        }

        const stars = [];
        for (const item of team) {
            stars.push(!item ? 5 : item.starCount);
        }

        channel.send({
            files: [{
                attachment: await generateDetailedLineupImage(team, {
                    overlay: doingOverlay,
                    background: doingBackground,
                    confidence: showingConfidenceLevels,
                    aura: doingAura
                }, stars),
                name: 'team.png'
            }]
        });
    }
};
