const {lookupHero} = require('./heroes');
const NodeCache = require('node-cache');

const MAX_SOLVER_TEAM_COUNT = 1000;
const solverCache = new NodeCache({
    stdTTL: 60 * 10, // 10 minute TTL
    checkperiod: 60
});

function step0DoSolverCache(team, flags, solution = undefined) {
    // Generate unique key for teams, hero order doesn't matter.
    let teamKey = team.map(hero => hero.name).sort((a, b) => a.localeCompare(b)).join(',');
    teamKey += JSON.stringify(flags);

    // Do we put into the cache or check if the cache contains?
    if (solution) {
        solverCache.set(teamKey, solution);
    } else {
        // Look for cache hit from previous solutions.
        const cached = solverCache.get(teamKey);

        if (cached) {
            return cached;
        }

        return undefined;
    }
}

function step1BuildTeamSpace(
    team,
    weightFunction = (hero) => ((hero.pvp + hero.pve) / 2.0) * (hero.starCount * 2.0)
) {
    const heroes = [];

    // Construct a mapping of all heroes with pvp/pve weights for future sorting.
    let uid = 0;
    for (const hero of team) {
        const allSlots = [];

        // Has incomplete heroes.
        if (!hero.builds) {
            return null;
        }

        // Find all possible slots for this hero.
        // Hero builds are sorted, so insert in input order for optimal build.
        for (const build of hero.builds) {
            for (const slot of build.slot) {
                if (!allSlots.includes(slot)) {
                    allSlots.push(slot);
                }
            }
        }

        heroes.push({
            weight: weightFunction(hero),
            hero: hero.name,
            starCount: hero.starCount === undefined ? 5 : hero.starCount,
            allSlots,
            uid: uid++
        });
    }

    // Sort by pvp / pve weight.
    heroes.sort((a, b) => b.weight - a.weight);

    return heroes;
}

function step2SolvePossibleTeams(heroes, maxSolveCount) {
    // Construct a collection of potential solutions.
    const solutions = [];

    function solveSpace(hero, heroes, lineup) {
        // Prevent massive amounts of possible teams.
        if (solutions.length > maxSolveCount) {
            return;
        }

        const slots = hero.allSlots;

        // Find a slot for the hero in question.
        for (const slot of slots) {
            if (lineup[slot - 1] !== undefined) {
                continue;
            }

            // Occupy and continue.
            lineup[slot - 1] = {...hero, solvedSlot: slot};
            break;
        }

        // Filter out the hero we just fit into a slot, or didn't fit.
        // If we didn't fit the hero, we'll just insert them after (if we choose this solution).
        heroes = heroes.filter(h => h.uid !== hero.uid);

        // No heroes left to insert = push to solution list, we finished this iterations lineup.
        if (heroes.length === 0) {
            solutions.push(lineup);
            return;
        }

        // Keep solving with the rest of the heroes.
        for (const hero of heroes) {
            solveSpace(hero, heroes, [...lineup]);
        }
    }

    // Populate solution space for first few heroes.
    for (const hero of heroes) {
        const removed = heroes.filter(h => h.uid !== hero.uid);
        solveSpace(hero, removed, Array(6));
    }

    // After all top level solution spaces are generated, we know that all solutions contain valid placements
    // for given heroes. We obviously want the best fit for heroes, but if that means that another hero doesn't
    // fit into their spot, we aren't interested.

    return solutions;
}

function step2NoSolutionDefault(team) {
    for (const item of team) {
        item.confidence = 0;
    }

    return team;
}

function step3FillMissingSlots(solution, heroes) {
    // Filter out heroes that are already placed in current solution space.
    heroes = heroes.filter(hero => !solution.find(h => h && h.uid === hero.uid));

    // Insert misfit heroes into solution in the order they occur.
    // TODO maybe there's a better way to insert them based on faction type, hero type, skills, etc?

    for (const hero of heroes) {
        for (let i = 0; i < solution.length; ++i) {
            if (!solution[i]) {
                solution[i] = {...hero, solvedSlot: (i + 1)};
                break;
            }
        }
    }
}

function step4BuildConfidenceAndSolverScores(solution) {
    let possible = 0;
    let sum = 0;

    // Iteration solution space and rank solved heroes by their ability to fit into a higher weighted build.
    for (const solved of solution) {
        if (!solved) {
            continue;
        }

        const hero = lookupHero(solved.hero);
        const slot = solved.solvedSlot;

        // Find the build that we used (ranked by the highest scoring slot in builds by weight).
        let buildUsed = null;
        for (const build of hero.builds) {
            if (build.slot.includes(slot)) {
                buildUsed = build;
                break;
            }
        }

        // Aggregate total possible build weight as all build weights sum.
        const totalBuildWeight = hero.builds.map(build => build.weight).reduce((total, num) => (total += num));

        // confidence = rank of build used / all possible build weights.
        if (!buildUsed) {
            solved.confidence = 0;
        } else {
            solved.confidence = (1 + (buildUsed.weight / totalBuildWeight)) / 2.0;
        }

        // Used to average confidence as overall score.
        sum += solved.confidence;
        ++possible;
    }

    // Solver score = average confidence.
    const score = sum / possible;
    return {
        solution,
        solverScore: score
    };
}

function step5SelectWinningTeam(solutions) {
    let bestTeam = solutions[0];

    // Find the winning team by the highest solver score.
    for (let i = 1; i < solutions.length; ++i) {
        const solution = solutions[i];

        if (solution.solverScore > bestTeam.solverScore) {
            bestTeam = solution;
        }
    }

    return bestTeam.solution;
}

const weightFunctions = {
    pvp: (hero) => hero.pvp * (hero.starCount * 2.0),
    pve: (hero) => hero.pve * (hero.starCount * 2.0),
    both: (hero) => ((hero.pvp + hero.pve) / 2.0) * (hero.starCount * 2.0)
};

function solve(team, flags = {
    pvpOrPve: 'both',
    useStarWeight: true
}) {
    let time = new Date().getTime();
    let winningTeam = step0DoSolverCache(team, flags);

    if (!winningTeam) {
        console.log(`Team solver starting...`);

        // Build problem space and run optimizations.
        let heroes = step1BuildTeamSpace(
            team,
            (hero) => weightFunctions[flags.pvpOrPve](hero) / (flags.useStarWeight ? 1.0 : (hero.starCount * 2.0))
        );

        // Some heroes have no builds?
        if (!heroes) {
            return null;
        }

        let solutions = step2SolvePossibleTeams(heroes, MAX_SOLVER_TEAM_COUNT);

        // No solutions? Default as given team.
        if (solutions.length === 0) {
            return step2NoSolutionDefault(heroes);
        }

        // Fill in the heroes that didn't get placed due to no slots found.
        solutions.forEach(solution => step3FillMissingSlots(solution, heroes));

        // Rank all solutions.
        solutions = solutions.map(solution => step4BuildConfidenceAndSolverScores(solution));

        // Select highest team by solver score.
        winningTeam = step5SelectWinningTeam(solutions);

        // Update cache.
        step0DoSolverCache(team, flags, winningTeam);

        time = new Date().getTime() - time;
        console.log(`Solver took ${time} milliseconds to generate an optimal solution. Found ${solutions.length} possible teams.`);
    } else {
        console.log('Solver used previous solution in cache.');
    }

    return winningTeam;
}

function utilityPrintSolution(solution) {
    for (const item of solution) {
        if (!item) {
            console.log('Empty slot');
            continue;
        }

        console.log(`Hero: ${item.hero}, weight: ${item.weight}, slot: ${item.solvedSlot}`);
    }
    console.log('');
}

module.exports = {
    solve
};
