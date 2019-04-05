const {lookupArtifact} = require('./artifacts');
const {lookupHero} = require('./heroes');

function solve(team) {
    const heroes = [];

    let uid = 0;
    for (const hero of team) {
        const allSlots = [];

        // Has incomplete heroes.
        if (!hero.builds) {
            return null;
        }

        for (const build of hero.builds) {
            for (const slot of build.slot) {
                if (!allSlots.includes(slot)) {
                    allSlots.push(slot);
                }
            }
        }

        heroes.push({
            weight: (hero.pvp + hero.pve) / 2.0,
            hero: hero.name,
            allSlots,
            uid: uid++
        });
    }

    function solveNaive(slot, current, heroes, solutions) {
        const possible = heroes.filter(hero => hero.allSlots.includes(slot));

        for (const hero of possible) {
            if (slot >= 6) {
                current.push({...hero, solvedSlot: slot});
                solutions.push(current);
                return;
            }

            solveNaive(slot + 1, [...current, {...hero, solvedSlot: slot}], heroes.filter(h => h !== hero), solutions);
        }
    }

    const solutions = [];
    solveNaive(1, [], heroes, solutions);

    return solutions.length === 0 ? null : solutions[0];
}

module.exports = {
    solve
};
