const fuzz = require('fuzzball');

const heroes = {
    aidan: ['aidan', 'aiden', 'aden'],
    baade: ['baade', 'bad'],
    'blood-blade': ['blood blade', 'blood', 'bb'],
    corpsedemon: ['corpsedemon', 'cdemon'],
    dominator: ['dominator', 'dom'],
    field: ['field', 'feeld'],
    horus: ['horus', 'horse'],
    jahra: ['jahra', 'jara'],
    kamath: ['kamath'],
    kharma: ['kharma', 'karma'],
    lutz: ['lutz', 'lutzl'],
    walter: ['walter', 'walt'],
    bleecker: ['bleecker', 'bleek'],
    emily: ['emily', 'em'],
    'flame-strike': ['flame strike', 'fs'],
    'honor-guard': ['honor guard', 'hg'],
    iceblink: ['iceblink', 'ice', 'ib'],
    miki: ['miki'],
    mirage: ['mirage'],
    'od-01': ['od 01', 'od'],
    ormus: ['ormus'],
    sigmund: ['sigmund', 'siggy', 'sig'],
    valentino: ['valentino', 'tino'],
    xia: ['xia', 'x'],
    barea: ['barea'],
    cthugha: ['cthugha', 'chuga'],
    dantalian: ['dantalian', 'dant'],
    'fat-mu': ['fat mu', 'fm'],
    gusta: ['gusta'],
    karim: ['karim'],
    'king-barton': ['king barton', 'kb'],
    kroos: ['kroos'],
    'lord-balrog': ['lord balrog', 'lb', 'balrog'],
    margaret: ['margaret', 'marg'],
    queen: ['queen'],
    skerei: ['skerei', 'scary'],
    'demon-hunter': ['demon hunter', 'dh'],
    'dragon-slayer': ['dragon slayer', 'ds', 'donald trump'],
    eddga: ['eddga'],
    faceless: ['faceless', 'face'],
    groo: ['groo'],
    'heart-watcher': ['heart watcher', 'hw'],
    malassa: ['malassa'],
    oberon: ['oberon', 'ob'],
    rosa: ['rosa'],
    starlight: ['starlight', 'star'],
    valkyrie: ['valkyrie', 'valk'],
    vesa: ['vesa'],
    amuvor: ['amuvor', 'amu'],
    aspen: ['aspen'],
    'dark-arthindol': ['dark arthindol', 'da'],
    'das-moge': ['das moge', 'dm'],
    mihm: ['mihm', 'mihmmy'],
    sleepless: ['sleepless', 'sleepy'],
    aida: ['aida'],
    asmodel: ['asmodel'],
    belrain: ['belrain'],
    'faith-blade': ['faith blade', 'fb'],
    gerke: ['gerke'],
    michelle: ['michelle']
};

const tiers = {
    t0: ['0', 't0', 'tier-0', 'tier 0', 't-0', 'god tier', 'godtier', 'god-tier', 'best', 'perfect', 'op tier', 'optier', 'op', 'op-tier'],
    t1: ['1', 't1', 'tier-1', 'amazing', 'tier 1', 't-1'],
    't1.5': ['1.5', 't1.5', 'tier-1.5', 'tier 1.5', '1-2', 'mid tier', 'mid-level', 'mid level', 'mid-tier'],
    t2: ['2', 't2', 'tier 2', 'tier-2', 't-2', 'meh', 'decent', 'okay', 'semi-meta', 'semi meta'],
    't2.5': ['2.5', 't2.5', 'tier 2.5', 'tier-2.5', '2-3', 'low tier', 'hardly meta', 'low meta'],
    t3: ['3', 't3', 'tier 3', 'tier-3', 'worst tier', 'not meta', 'old', 'worst', 'worst-tier', 'lowest', 'bad', 'terrible']
};

const auras = {
    shadow: ['shadow', 'monster', 'ghost'],
    abyss: ['abyss', 'abyssal', 'fire', 'flames'],
    dark: ['dark', 'darkness', 'darkness'],
    light: ['light', 'bright', 'heaven'],
    forest: ['forest', 'jungle', 'green'],
    fortress: ['fortress', 'castle'],
    ruin: ['ruin', 'ruined', 'shadow abyss dark'],
    redemption: ['redemption', 'light forest fortress'],
    rainbow: ['rainbow', 'all', 'mix', 'mixed', 'colorful'],
    evil: ['evil', 'shadow abyss', 'shadow and abyss'],
    justice: ['justice', 'forest fortress', 'forest and fortress'],
    goodVsEvil: ['good vs evil', 'good versus evil', 'gve', 'goodvevil', 'dark light', 'dark and light'],
    pollution: ['pollution', 'abyss forest', 'big oil', 'abyss and forest'],
    boundSoul: ['bound soul', 'abyss and fortress', 'abyss fortress'],
    oldEnemy: ['old enemy', 'shadow and fortress', 'shadow vs fortress', 'shadow fortress', 'castle fog'],
    lifeAndDeath: ['life versus death', 'life vs death', 'lvd', 'life death', 'shadow forest', 'shadow and forest'],
    none: ['none', 'nothing', 'empty']
};

const events = {
    calendar: ['calendar', 'event calendar', 'next', 'next event'],
    'check-in': ['check in', 'daily', 'daily check in'],
    militant: ['militant', 'militant event'],
    tavern: ['tavern', 'tavern quest', 'tavern quest event', 'tq'],
    fusion: ['fusion', 'awakening', 'fusion and awakening', 'f&w', 'f&w event'],
    'broken-spaces': ['broken spaces', 'broken', 'spaces', 'bs'],
    summon: ['heroic summon', 'heroic', 'summon', 'heroic summon event', 'heroic event', 'summon event'],
    prophet: ['prophet', 'prophet orb event', 'prophet orb'],
    casino: ['casino', 'casino event', 'coin event', 'gambling event', 'gambling'],
    miracle: ['miracle', 'heroic miracle', 'hm event', 'hm'],
    shelter: ['shelter'],
    treasure: ['gem boxes', 'gem box', 'treasure box', 'mystery box', 'box'],
    exchange: ['exchange', 'heroic exchange', 'altar', 'altar event', 'exchange event', 'heroic exchange event'],
    dwarves: ['dwarves', 'gray dwarves', 'gray dwarves blessing', 'blessing event', 'dwarves blessing event', 'dwarves event'],
    loot: ['loot event', 'campaign event', 'campaign', 'campaign loot event']
};

const factions = {
    dark: ['dark', 'night', 'darkness', 'evil', 'purple'],
    light: ['light', 'heaven', 'bright', 'angel', 'yellow'],
    forest: ['forest', 'jungle', 'trees', 'green'],
    fortress: ['fortress', 'castle', 'midevil', 'dark blue'],
    abyss: ['abyss', 'fire', 'hell', 'red'],
    shadow: ['shadow', 'spooky', 'scary', 'monster', 'light blue']
};

function findInObject(raw, object) {
    const allItems = [];

    for (const key of Object.keys(object)) {
        allItems.push(...object[key]);
    }

    const matches = fuzz.extract(raw, allItems);

    if (matches.length === 0) {
        return null;
    }

    const best = matches[0];
    const meant = matches[0][0];

    for (const key of Object.keys(object)) {
        const item = object[key];

        if (item.includes(best[0])) {
            best[0] = key;
            break;
        }
    }

    return {found: best[0], meant, flagged: best[1] < 60, score: best[1]};
}

module.exports = {
    findTierName: (tier) => findInObject(tier, tiers),
    findAuraName: (aura) => findInObject(aura, auras),
    findHeroName: (hero) => findInObject(hero, heroes),
    findEvent: (event) => findInObject(event, events),
    findFaction: (faction) => findInObject(faction, factions)
};
