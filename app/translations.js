const tiers = {
    t0: ['0', 't0', 'tier-0', 'tier 0', 't-0', 'god tier', 'godtier', 'god-tier', 'best', 'perfect', 'op tier', 'optier', 'op', 'op-tier'],
    t1: ['1', 't1', 'tier-1', 'amazing', 'tier 1', 't-1'],
    't1.5': ['1.5', 't1.5', 'tier-1.5', 'tier 1.5', '1-2', 'mid tier', 'mid-level', 'mid level', 'mid-tier'],
    t2: ['2', 't2', 'tier 2', 'tier-2', 't-2', 'meh', 'decent', 'okay', 'semi-meta', 'semi meta'],
    't2.5': ['2.5', 't2.5', 'tier 2.5', 'tier-2.5', '2-3', 'low tier', 'hardly meta', 'low meta'],
    t3: ['3', 't3', 'tier 3', 'tier-3', 'worst tier', 'not meta', 'old', 'worst', 'worst-tier', 'lowest', 'bad', 'terrible']
};

function findTierName(raw) {
    raw = raw.toLowerCase();

    for (const key in tiers) {
        const arr = tiers[key];
        if (arr.includes(raw)) {
            return key;
        }
    }

    return null;
}

module.exports = {
    findTierName
};
