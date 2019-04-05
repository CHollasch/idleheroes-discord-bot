const fuzz = require('fuzzball');

const artifacts = {
    orange: {
        ancientGodsWhisper: {
            name: 'Ancient God\'s Whisper',
            stats: [
                '+90.0% Damage Against Mage',
                '+2700 Attack',
            ]
        },
        antlersCane: {
            name: 'Antlers Cane',
            stats: [
                '+70.0% Precision',
                '+25.0% Attack',
                '+60.0% Skill Damage',
            ]
        },
        augustusMagicBall: {
            name: 'Augustus Magic Ball',
            stats: [
                '+25.0% Attack',
                '+70 Speed',
                '+50.0% Block',
            ]
        },
        azrael: {
            name: 'Azrael',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
            ]
        },
        demonBell: {
            name: 'Demon Bell',
            stats: [
                '+18.0% Attack',
                '+14.0% HP',
                '+50 Energy',
            ]
        },
        echoOfDeath: {
            name: 'Echo of Death',
            stats: [
                '+18.0% Attack',
                '+15.0% Crit',
            ]
        },
        eyeOfHell: {
            name: 'Eye of Hell',
            stats: [
                '+90.0% Damage Against Priest',
                '+2700 Attack',
            ]
        },
        fearlessArmor: {
            name: 'Fearless Armor',
            stats: [
                '+30.0% Reduced damage',
                '+14.0% HP',
            ]
        },
        fiendsTouch: {
            name: 'Fiend\'s Touch',
            stats: [
                '+90.0% Damage Against Assassin',
                '+2700 Attack',
            ]
        },
        heavenlyBead: {
            name: 'Heavenly Bead',
            stats: [
                '+18.0% Attack',
                '+12.0% Precision',
            ]
        },
        invisible: {
            name: 'Invisible',
            stats: [
                '+15% HP',
                '+20% Block',
            ]
        },
        magicSource: {
            name: 'Magic Source',
            stats: [
                '+50 Energy',
                '+50% Skill Damage',
            ]
        },
        luckyCandyBar: {
            name: 'Lucky Candy Bar',
            stats: [
                '+20.0% Attack',
                '+18.0% HP',
                '+ Stun Immune',
            ]
        },
        magicStoneSword: {
            name: 'Magic Stone Sword',
            stats: [
                '+21.0% Attack',
                '+30.0% Damage Reduction',
                '+25.0% Control Immune',
            ]
        },
        nailOfDestiny: {
            name: 'Nail of Destiny',
            stats: [
                '+90.0% Damage Against Warrior',
                '+2700 Attack',
            ]
        },
        punisherOfImmortal: {
            name: 'Punisher of Immortal',
            stats: [
                '+21.0% Attack',
                '+15.0% Crit',
                '+50.0% Crit Damage',
            ]
        },
        theKissOfGhost: {
            name: 'The Kiss of Ghost',
            stats: [
                '+25.0% Attack',
                '+100.0% Armor Break',
                '+14.0% HP',
            ]
        },
        windGodMessenger: {
            name: 'Wind God Messenger',
            stats: [
                '+66 Speed',
                '+14.0% HP',
            ]
        },
        awakeningOfDivinePower: {
            name: 'Awakening of Divine Power',
            stats: [
                '+90.0% Damage Against Mage',
                '+14% HP',
                '+18.0% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        aidansFury: {
            name: 'Aidan\'s Fury',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
                '+14.0% Attack (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        barrierOfDestiny: {
            name: 'Barrier of Destiny',
            stats: [
                '+30.0% Reduce Damage',
                '+14.0% HP',
                '+18.0% HP (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        brightHolyWater: {
            name: 'Bright Holy Water',
            stats: [
                '+90.0 Damage Against Priest',
                '+14.0% HP',
                '+18.0% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        curseOfMedusa: {
            name: 'Curse Of Medusa',
            stats: [
                '+90.0 Damage Against Priest',
                '+50% Skill Damage',
                '+40.0% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        destructionBox: {
            name: 'Destruction Box',
            stats: [
                '+90.0% Damage Against Priest',
                '+2700 Attack',
                '+14.0% Attack(Abyss Faction)',
            ],
            faction: 'abyss'
        },
        elfTears: {
            name: 'Elf Tears',
            stats: [
                '+90.0% Damage Against Priest',
                '+2700 Attack',
                '+40.0% Skill Damage(Fortress Faction)',
            ],
            faction: 'fortress'
        },
        energyCore: {
            name: 'Energy Core',
            stats: [
                '+90.0% Damage Against Priest',
                '+2700 Attack',
                '+40.0% Skill Damage(Fortress Faction)',
            ],
            faction: 'fortress'
        },
        engulf: {
            name: 'Engulf',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
                '+15.0% Crit (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        evilHolyGrail: {
            name: 'Evil Holy Grail',
            stats: [
                '+90.0% Damage Against Mage',
                '+50% Skill Damage',
                '+40.0% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        fieldsCompass: {
            name: 'Field\'s Compass',
            stats: [
                '+90.0% Damage Against Assassin',
                '+2700 Attack',
                '+18.0% HP (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        flowerLanguage: {
            name: 'Flower Language',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
                '+15.0% Crit (Forest Faction)',
            ],
            faction: 'forest'
        },
        forestReverberation: {
            name: 'Forest Reverberation',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
                '+15.0% Crit (Forest Faction)',
            ],
            faction: 'forest'
        },
        frostSword: {
            name: 'Frost Sword',
            stats: [
                '+90.0% Damage Against Mage',
                '+2700 Attack',
                '+18.0% HP (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        ghostCloak: {
            name: 'Ghost Cloak',
            stats: [
                '+90.0% Damage Against Assassin',
                '+50% Skill Damage',
                '+40.0% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        goldenBow: {
            name: 'Golden Bow',
            stats: [
                '+90.0% Damage Against Mage',
                '+2700 Attack',
                '+40.0% Crit Damage (Forest Faction)',
            ],
            faction: 'forest'
        },
        guiltyCrown: {
            name: 'Guilty Crown',
            stats: [
                '+18.0% Attack',
                '+14.0% HP',
                '+25.0% Control Immune (Dark Faction)',
            ],
            faction: 'dark'
        },
        guardianAngel: {
            name: 'Guardian Angel',
            stats: [
                '+90.0% Damage Against Warrior',
                '+14.0% HP',
                '+15% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        kamasEye: {
            name: 'Kama\'s Eye',
            stats: [
                '+90.0% Damage Against Warrior',
                '+2700 Attack',
                '+30.0% Armor Break (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        magicalSacrifice: {
            name: 'Magical Sacrifice',
            stats: [
                '+90% Damage Against Priest',
                '+2700 Attack',
                '+14.0% Attack (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        margaretsLegacy: {
            name: 'Margaret\'s Legacy',
            stats: [
                '+90% Damage Against Warrior',
                '+2700 Attack',
                '+18.0% HP (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        murmur: {
            name: 'Murmur',
            stats: [
                '+90% Damage Against Warrior',
                '+2700 Attack',
                '+18.0% HP (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        necronomicon: {
            name: 'Necronomicon',
            stats: [
                '+90% Damage Against Mage',
                '+2700 Attack',
                '+14.0% Attack (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        orbOfAnnihilation: {
            name: 'Orb of Annihilation',
            stats: [
                '+50 Energy',
                '+50.0% Skill Damage',
                '+40.0% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        poisonousRose: {
            name: 'Poisonous Rose',
            stats: [
                '+90.0% Damage Against Warrior',
                '+2700 Attack',
                '+18.0% HP (Forest Faction)',
            ],
            faction: 'forest'
        },
        queensBlade: {
            name: 'Queen\'s Blade',
            stats: [
                '+90.0% Damage Against Assassin',
                '+2700 Attack',
                '+14.0% Attack (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        rageOfTheDragon: {
            name: 'Rage of The Dragon',
            stats: [
                '+90.0% Damage Against Ranger',
                '+2700 Attack',
                '+14.0% Attack (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        reapersScythe: {
            name: 'Reaper\'s Scythe',
            stats: [
                '+90.0% Damage Against Warrior',
                '+50% Skill Damage',
                '+40.0% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        runesPower: {
            name: 'Rune\'s Power',
            stats: [
                '+30.0% Reduced damage',
                '+14.0% HP',
                '+18.0% HP (Forest Faction)',
            ],
            faction: 'forest'
        },
        shadowCape: {
            name: 'Shadow Cape',
            stats: [
                '+66 Speed',
                '+14.0% HP',
                '+15.0% Crit (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        sigh: {
            name: 'Sigh',
            stats: [
                '+66 Speed',
                '+14.0% HP',
                '+15.0% Crit (Forest Faction)',
            ],
            faction: 'forest'
        },
        spearOfDestiny: {
            name: 'Spear of Destiny',
            stats: [
                '+30.0% Reduce Damage',
                '+14.0% HP',
                '+18.0% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        swordOfJustice: {
            name: 'Sword of Justice',
            stats: [
                '+18.0% Attack',
                '+30.0% Holy Damage',
                '+15.0% Crit (Light Faction)',
            ],
            faction: 'light'
        },
        tabooSeal: {
            name: 'Taboo Seal',
            stats: [
                '+90.0% Damage Against Ranger',
                '+50% Skill Damage',
                '+40% Skill Damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        theDemonWhisper: {
            name: 'The Demon Whisper',
            stats: [
                '+90.0% Damage Against Mage',
                '+2700 Attack',
                '+14% Attack (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        theGoldenKey: {
            name: 'The Golden Key',
            stats: [
                '+90.0% Damage Against Ranger',
                '+15% HP',
                '+14% Block (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        theKingOfDemons: {
            name: 'The King of Demons',
            stats: [
                '+30.0% Reduce Damage',
                '+14% HP',
                '+18% HP (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        theMaskedLover: {
            name: 'The Masked Lover',
            stats: [
                '+90.0% Damage Against Assassin',
                '+2700 Attack',
                '+14.0% Attack (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        theSwordOfArchangel: {
            name: 'The Sword of Archangel',
            stats: [
                '+90.0% Damage Against Assassin',
                '+14% HP',
                '+18% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        timeControl: {
            name: 'Time Control',
            stats: [
                '+90.0% Damage Against Ranger',
                '+14% HP',
                '+18% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        treadOfLightness: {
            name: 'Tread of Lightness',
            stats: [
                '+66 Speed',
                '+14% HP',
                '+15% Crit (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        warhammerOfHopelessness: {
            name: 'Warhammer of Hopelessness',
            stats: [
                '+66 Speed',
                '+14.0% HP',
                '+15.0% Crit (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        witheredArmor: {
            name: 'Withered Armor',
            stats: [
                '+30% Reduce Damage',
                '+14.0% HP',
                '+18.0% Crit (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        yubashiri: {
            name: 'Yubashiri',
            stats: [
                '+90.0% Damage Against Priest',
                '+2700 Attack',
                '+18.0% Attack(Fortress Faction)'
            ],
            faction: 'fortress'
        },
    },
    red: {
        cryingUndead: {
            name: 'Crying Undead',
            stats: [
                '+42.0% Damage Against Ranger',
                '+1280 Attack',
            ],
        },
        deathDance: {
            name: 'Death Dance',
            stats: [
                '+42.0% Damage Against Assassin',
                '+1280 Attack',
            ],
        },
        eternalChapter: {
            name: 'Eternal Chapter',
            stats: [
                '+42.0% Damage Against Priest',
                '+1280 Attack',
            ],
        },
        lightShield: {
            name: 'Light Shield',
            stats: [
                '+12% Attack',
                '+8.0% Precision',
            ],
        },
        lunasSorrow: {
            name: 'Luna\'s Sorrow',
            stats: [
                '+42.0% Damage Against Mage',
                '+1280 Attack',
            ],
        },
        mirrorChain: {
            name: 'Mirror Chain',
            stats: [
                '+20% Reduce Damage',
                '+10% HP',
            ],
        },
        satansHeart: {
            name: 'Satan\'s Heart',
            stats: [
                '+42.0% Damage Against Warrior',
                '+1280 Attack',
            ],
        },
        talismanOfEvasion: {
            name: 'Talisman of Evasion',
            stats: [
                '+10% HP',
                '+16% Block',
            ],
        },
        theBlackSword: {
            name: 'The Black Sword',
            stats: [
                '+12% Attack',
                '+10% Crit',
            ],
        },
        travelersRing: {
            name: 'Traveler\'s Ring',
            stats: [
                '+42 Speed',
                '+10.0% HP',
            ]
        },
        angelsPendant: {
            name: 'Angel\'s Pendant',
            stats: [
                '+20% Reduce Damage',
                '+10% HP',
                '+12.0% Holy Damage (Light Faction)',
            ],
            faction: 'light'
        },
        blood: {
            name: 'Blood',
            stats: [
                '+42.0% Damage Against Assassin',
                '+1280 Attack',
                '+8.0% Attack (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        confinedSpirit: {
            name: 'Confined Spirit',
            stats: [
                '+42.0% Damage Against Warrior',
                '+1280 Attack',
                '+20.0% Armor break (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        cursedSandglass: {
            name: 'Cursed Sandglass',
            stats: [
                '+42.0% Damage Against Ranger',
                '+1280 Attack',
                '+8.0% Attack (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        deepEyes: {
            name: 'Deep Eyes',
            stats: [
                '+12.0% Attack',
                '+10.0% HP',
                '+15.0 Control Immune (Dark Faction)',
            ],
            faction: 'dark'
        },
        delusion: {
            name: 'Delusion',
            stats: [
                '+42.0% Damage Against ranger',
                '+1280 Attack',
                '+9.0% Crit (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        elfsBlessedBow: {
            name: 'Elf\'s Blessed Bow',
            stats: [
                '+42.0% Damage Against Mage',
                '+1280 Attack',
                '+25% Crit damage (Forest Faction)',
            ],
            faction: 'forest'
        },
        emeraldButterfly: {
            name: 'Emerald Butterfly',
            stats: [
                '+42.0 Speed',
                '+10% HP',
                '+9.0% Crit chance (Forest Faction)',
            ],
            faction: 'forest'
        },
        flyingThor: {
            name: 'Flying Thor',
            stats: [
                '+42.0% Damage Against Priest',
                '+1280 Attack',
                '+8.0% Attack (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        goldenCompass: {
            name: 'Golden Compass',
            stats: [
                '+42.0% Damage Against Assassin',
                '+1280 Attack',
                '+12.0% HP (Shadow Faction)',
            ],
            faction: 'shadow'
        },
        immerse: {
            name: 'Immerse',
            stats: [
                '+42.0% Damage Against warrior',
                '+1280 Attack',
                '+12.0% HP (Abyss Faction)',
            ],
            faction: 'abyss'
        },
        magicEnergyArmlet: {
            name: 'Magic Energy Armlet',
            stats: [
                '+42.0% Damage Against Priest',
                '+1280 Attack',
                '+25.0% Skill damage (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        oaksHeart: {
            name: 'Oak\'s Heart',
            stats: [
                '+20% Reduce Damage',
                '+10% HP',
                '+12.0% HP (Forest Faction)',
            ],
            faction: 'forest'
        },
        shadowCape: {
            name: 'Shadow Cape',
            stats: [
                '+42.0% Damage Against Mage',
                '+1280 Attack',
                '+12.0% HP (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        shadowCloak: {
            name: 'Shadow Cloak',
            stats: [
                '+12% Attack',
                '+8% Precision',
                '+25.0% Skill damage (Dark Faction)',
            ],
            faction: 'dark'
        },
        silverKey: {
            name: 'Silver Key',
            stats: [
                '+42.0% Damage Against Ranger',
                '+10% HP',
                '+10% Block (Fortress Faction)',
            ],
            faction: 'fortress'
        },
        theBladeOfFreedom: {
            name: 'The Blade of Freedom',
            stats: [
                '+12.0% Attack',
                '+20.0% Holy Damage',
                '+9.0% Crit (Light Faction)',
            ],
            faction: 'light'
        }
    },
    green: {
        bestowedSword: {
            name: 'Bestowed Sword',
            stats: [
                '+28.0% Damage Against Ranger',
                '+840 Attack',
            ],
        },
        crossOfDestiny: {
            name: 'Cross of Destiny',
            stats: [
                '+28.0% Damage Against Assassin',
                '+840 Attack',
            ],
        },
        emperorsAmbition: {
            name: 'Emperor\'s Ambition',
            stats: [
                '+28.0% Damage Against Warrior',
                '+840 Attack',
            ],
        },
        executioner: {
            name: 'Executioner',
            stats: [
                '+8.0% Attack',
                '+3.0% Precision',
            ],
        },
        godlyFavor: {
            name: 'Godly Favor',
            stats: [
                '+28.0% Damage Against Priest',
                '+840 Attack',
            ],
        },
        spaceCrack: {
            name: 'Space Crack',
            stats: [
                '+28.0% Damage Against Mage',
                '+840 Attack',
            ],
        },
        walkersBoots: {
            name: 'Walker\'s Boots',
            stats: [
                '+24 Speed',
                '+6% HP',
            ]
        }
    },
    purple: {
        chaosStone: {
            name: 'Chaos Stone',
            stats: [
                '+20% Damage Against Mage',
                '+600 Attack',
            ],
        },
        heavenSpine: {
            name: 'Heaven Spine',
            stats: [
                '+20% Damage Against Ranger',
                '+600 Attack',
            ],
        },
        scarletScar: {
            name: 'Scarlet Scar',
            stats: [
                '+20% Damage Against Warrior',
                '+600 Attack',
            ],
        },
        snowMeaning: {
            name: 'Snow Meaning',
            stats: [
                '+20% Damage Against Priest',
                '+600 Attack',
            ],
        },
        spiritLocker: {
            name: 'Spirit Locker',
            stats: [
                '+20% Damage Against Assassin',
                '+600 Attack',
            ]
        }
    },
    yellow: {
        dragonJade: {
            name: 'Dragon Jade',
            stats: [
                '+15.0% Damage Against Warrior',
                '+450 Attack',
            ],
        },
        elfsWhisper: {
            name: 'Elf\'s Whisper',
            stats: [
                '+15.0% Damage Against Ranger',
                '+450 Attack',
            ],
        },
        hellhoundsFang: {
            name: 'Hellhound\'s Fang',
            stats: [
                '+15.0% Damage Against Assassin',
                '+450 Attack',
            ],
        },
        sagesBook: {
            name: 'Sage\'s Book',
            stats: [
                '+15.0% Damage Against Mage',
                '+450 Attack',
            ],
        },
        shadowPrayer: {
            name: 'Shadow Prayer',
            stats: [
                '+15.0% Damage Against Priest',
                '+450 Attack',
            ],
        }
    },
    blue: {
        afterglow: {
            name: 'Afterglow',
            stats: [
                '+1 Attack',
            ],
        },
        darkMoonSword: {
            name: 'Dark Moon Sword',
            stats: [
                '+10.0% Damage Against Ranger',
                '+300 Attack',
            ],
        },
        demonDestroyer: {
            name: 'Demon Destroyer',
            stats: [
                '+10.0% Damage Against Mage',
                '+300 Attack',
            ],
        },
        evilBook: {
            name: 'Evil Book',
            stats: [
                '+10.0% Damage Against Priest',
                '+300 Attack',
            ],
        },
        shadowJade: {
            name: 'Shadow Jade',
            stats: [
                '+10.0% Damage Against Warrior',
                '+300 Attack',
            ],
        },
        shadowStrike: {
            name: 'Shadow Strike',
            stats: [
                '+10.0% Damage Against Assassin',
                '+300 Attack',
            ],
        },
    }
};

function lookupArtifact(name, n = 1) {
    name = name.replace('\'', '').toLowerCase();

    const possible = [];

    for (const level of Object.keys(artifacts)) {
        for (const artifact of Object.keys(artifacts[level])) {
            possible.push(artifacts[level][artifact].name);
        }
    }

    const bestN = [];
    const results = fuzz.extract(name, possible, {wildcards: '*'});

    if (results.length >= n) {
        for (let idx = 0; idx < n; ++idx) {
            const best = results[idx];

            const score = best[1];
            const bestByName = best[0];
            let flagged = score < 60;

            for (const level of Object.keys(artifacts)) {
                for (const artifact of Object.keys(artifacts[level])) {
                    const actual = artifacts[level][artifact];

                    if (actual.name === bestByName) {
                        bestN.push({
                            ...actual,
                            label: artifact,
                            level,
                            flagged,
                            score
                        });
                    }
                }
            }
        }
    }

    return (n === 1 ? bestN[0] : bestN);
}

module.exports = {
    artifacts,
    lookupArtifact
};
