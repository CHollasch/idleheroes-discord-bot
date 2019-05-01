const heroes = {
    shadow: {
        aidan: {
            name: 'Aidan',
            faction: 'shadow',
            role: 'Mage',
            pve: 6.0,
            pvp: 6.1,
            tier: 2,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Antlers Cane'],
                    slot: [2],
                    weight: 29
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Antlers Cane'],
                    slot: [1, 2, 3, 4, 5, 6],
                    weight: 10
                }
            ],
            level: {
                5: {
                    power: 7149,
                    health: 21829,
                    attack: 4577,
                    armor: 577,
                    speed: 580,
                    ability: [
                        '**Arcane Burst** – Deal (**90% of Attack**) damage against all enemies with a **75%** chance to silence Warrior foe for 2 rounds.',
                        '**Vulnerable** – Whenever an ally Hero dies, gains **+10%** Crit and **+18%** Attack.',
                        '**Crazed Force** – Increases Reduce Damage by **12%**, HP by **25%** and Attack by **25%**.',
                    ]
                },
                6: {
                    power: 16574,
                    health: 60396,
                    attack: 9628,
                    armor: 819,
                    speed: 774,
                    ability: [
                        '**Arcane Burst** – Deal (**120% of Attack**) damage against all enemies with a **75%** chance to silence Warrior foe for 2 rounds.',
                        '**Vulnerable II** – Whenever an ally Hero dies, gains **+15%** Crit and **+24%** Attack.',
                        '**Crazed Force II** – Increases Reduce Damage by **18%**, HP by **25%** and Attack by **25%**.',
                        '**Last Wish II** – After death, deals (**300% of Attack**) damage against all enemies',
                    ]
                },
                10: {
                    power: 76425,
                    health: 410348,
                    attack: 29110,
                    armor: 1424,
                    speed: 1126,
                    ability: [
                        '**Arcane Burst** – Deal (**150% of Attack**) damage against all enemies with a **100%** chance to silence Warrior foe for 2 rounds. Gain **+30%** Attack for 3 rounds.',
                        '**Vulnerable III** – Whenever an ally Hero dies, gains **+20%** Crit and **+36%** Attack.',
                        '**Crazed Force III** – Increases Reduce Damage by **24%**, HP by **30%** and Attack by **30%**.',
                        '**Last Wish III** – After death, deals (**400% of Attack**) damage against all enemies',
                    ]
                }
            }
        },
        baade: {
            name: 'Baade',
            faction: 'shadow',
            role: 'Warrior',
            pve: 5.0,
            pvp: 5.0,
            tier: 2.5,
            builds: [
                {
                    stone: 'Hp / HP (%)',
                    artifact: ['Guilty Crown', 'Deep Eyes'],
                    slot: [1, 3],
                    weight: 6
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [1, 3],
                    weight: 2
                }
            ],
            level: {
                5: {
                    power: 6845,
                    health: 26683,
                    attack: 2757,
                    armor: 632,
                    speed: 606,
                    ability: [
                        '**Nether Strike** - Deals (**150% of Attack**) damage against the enemy with the lowest HP, and has a **48%** chance to deal 2 times damage, a **36%** chance to deal 4 times damage. Restores self HP by **20%** of dealt damage, and increases self Attack by **40%** for 6 rounds. (this skill cannot Crit)',
                        '**Will of Undead** - HP **+20%**, Attack **+10%**, Armor Break **+20%**',
                        '**Blood Armor** - Whenever a foe dies, increases self Damage Reduce by **10%** for 1 round, and restores self HP by **100%** of Attack.',
                        '**Death Threat** - Basic attack targets the enemy with the lowest HP and deals (**110% of  Attack**) damage, has a **50%** chance to deal 1.5 times damage, a **25%** chance to deal 2.25 times damage. (this skill cannot Crit)'
                    ]
                },
                6: {
                    power: 17539,
                    health: 83309,
                    attack: 6859,
                    armor: 894,
                    speed: 803,
                    ability: [
                        '**Nether Strike** - Deals (**200% of Attack**) damage against the enemy with the lowest HP, and has a **48%** chance to deal 2 times damage, a **36%** chance to deal 4 times damage. Restores self HP by **30%** of dealt damage, and increases self Attack by **60%** for 6 rounds. (this skill cannot Crit)',
                        '**Will of Undead** - HP **+30%**, Attack **+15%**, Armor Break **+30%**',
                        '**Blood Armor** - Whenever a foe dies, increases self Damage Reduce by **20%** for 1 round, and restores self HP by **150%** of Attack.',
                        '**Death Threat** - Basic attack targets the enemy with the lowest HP and deals (**120% of  Attack**) damage, has a **50%** chance to deal 1.7 times damage, a **25%** chance to deal 2.89 times damage. (this skill cannot Crit)'
                    ]
                },
                10: {
                    power: 101658,
                    health: 702072,
                    attack: 20655,
                    armor: 1554,
                    speed: 1155,
                    ability: [
                        '**Nether Strike** - Deals (**350% of Attack**) damage against the enemy with the lowest HP, and has a **48%** chance to deal 2 times damage, a **36%** chance to deal 4 times damage. Restores self HP by **40%** of dealt damage, and increases self Attack by **80%** for 6 rounds. (this skill cannot Crit)',
                        '**Will of Undead** - HP **+40%**, Attack **+25%**, Armor Break **+50%**',
                        '**Blood Armor** - Whenever a foe dies, increases self Damage Reduce by **40%** for 1 round, and restores self HP by **250%** of Attack.',
                        '**Death Threat** - Basic attack targets the enemy with the lowest HP and deals (**150% of  Attack**) damage, has a **50%** chance to deal 2 times damage, a **25%** chance to deal 4 times damage. (this skill cannot Crit)'
                    ]
                }
            }
        },
        'blood-blade': {
            name: 'Blood Blade',
            faction: 'shadow',
            role: 'Assassin',
            pve: 8.2,
            pvp: 6.5,
            tier: 2,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Aidans Fury', 'Azrael', 'Crying Undead', 'Cursed Sandglass'],
                    slot: [1, 2],
                    weight: 66
                },
                {
                    stone: 'Attack / Attack (%) / Armor Break (%)',
                    artifact: ['Fields Compass', 'Fiends Touch', 'Death Dance', 'Golden Compass'],
                    slot: [4, 5, 6],
                    weight: 18
                }
            ]
        },
        corpsedemon: {
            name: 'Corpsedemon',
            faction: 'shadow',
            role: 'Warrior',
            pve: 6.1,
            pvp: 7.4,
            tier: 2.5,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Mirror Chain', 'Runes Power', 'Oaks Heart'],
                    slot: [1],
                    weight: 91
                }
            ]
        },
        dominator: {
            name: 'Dominator',
            faction: 'shadow',
            role: 'Warrior',
            pve: 3.6,
            pvp: 2.7,
            tier: -1,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1, 3],
                    weight: 12
                },
                {
                    stone: 'Attack / Attack (%) / Armor Break (%)',
                    artifact: ['Nail of Destiny', 'Immerse', 'Satans Heart'],
                    slot: [1],
                    weight: 2
                },
            ]
        },
        field: {
            name: 'Field',
            faction: 'shadow',
            role: 'Ranger',
            pve: 2.1,
            pvp: 2.3,
            tier: -1,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger'],
                    slot: [4, 5, 6],
                    weight: 16
                }
            ]
        },
        horus: {
            name: 'Horus',
            faction: 'shadow',
            role: 'Warrior',
            pve: 8.7,
            pvp: 7.7,
            tier: 1,
            builds: [
                {
                    stone: 'HP / Block (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [4, 5, 6],
                    weight: 121
                },
                {
                    stone: 'Attack / Attack (%) / Armor Break (%)',
                    artifact: ['Agustus Magic Ball'],
                    slot: [1, 2],
                    weight: 59
                },
                {
                    stone: 'HP (%) / Block (%)',
                    artifact: ['Invisible', 'Talisman of Evasion'],
                    slot: [2],
                    weight: 32
                }
            ]
        },
        jahra: {
            name: 'Jahra',
            faction: 'shadow',
            role: 'Mage',
            pve: 8.2,
            pvp: 8.1,
            tier: 1.5,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [2, 4, 5, 6],
                    weight: 188
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Agustus Magic Ball'],
                    slot: [2, 3, 4, 5, 6],
                    weight: 106
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Echo of Death', 'The Black Sword'],
                    slot: [2],
                    weight: 29
                }
            ]
        },
        kamath: {
            name: 'Kamath',
            faction: 'shadow',
            role: 'Ranger',
            pve: 5.7,
            pvp: 8.0,
            tier: 2.5,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [4, 5, 6],
                    weight: 121
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Agusuts Magic Ball'],
                    slot: [1, 3],
                    weight: 37
                }
            ]
        },
        kharma: {
            name: 'Kharma',
            faction: 'shadow',
            role: 'Priest',
            pve: 2.9,
            pvp: 3.5,
            tier: -1,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [4, 5, 6],
                    weight: 24
                }
            ]
        },
        lutz: {
            name: 'Lutz',
            faction: 'shadow',
            role: 'Assassin',
            pve: 7.2,
            pvp: 6.0,
            tier: -1,
            builds: [
                {
                    stone: 'Attack / Attack (%) / Precision (%)',
                    artifact: ['Sword of Justice', 'The Blade of Freedom'],
                    slot: [2],
                    weight: 62
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [1],
                    weight: 11
                }
            ]
        },
        walter: {
            name: 'Walter',
            faction: 'shadow',
            role: 'Assassin',
            pve: 7.5,
            pvp: 6.5,
            tier: 4,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [2, 4, 5, 6],
                    weight: 123
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Echo of Death', 'The Black Sword', 'Magic Stone Sword'],
                    slot: [2],
                    weight: 14
                }
            ]
        }
    },
    abyss: {
        'big-boy': {
            name: 'Big Boy',
            faction: 'abyss',
            role: 'Warrior',
            pve: 10.0,
            pvp: 10.0,
            tier: 0,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Lucky Candy Bar', 'Lucky Candy Bar', 'Lucky Candy Bar', 'Lucky Candy Bar', 'Lucky Candy Bar', 'Lucky Candy Bar'],
                    slot: [1, 2, 3, 4, 5, 6],
                    weight: 10000
                }
            ]
        },
        barea: {
            name: 'Barea',
            faction: 'abyss',
            role: 'Warrior',
            pve: 8.3,
            pvp: 6.4,
            tier: 3,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [3],
                    weight: 84
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [3],
                    weight: 21
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [4, 5, 6],
                    weight: 12
                }
            ]
        },
        cthugha: {
            name: 'Cthugha',
            faction: 'abyss',
            role: 'Ranger',
            pve: 7.8,
            pvp: 7.3,
            tier: 2,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 104
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Demon Bell'],
                    slot: [1, 3],
                    weight: 19
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Demon Bell'],
                    slot: [1, 3],
                    weight: 15
                }
            ]
        },
        dantalian: {
            name: 'Dantalian',
            faction: 'abyss',
            role: 'Warrior',
            pve: 6.2,
            pvp: 4.3,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 31
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword', 'Punisher of Immortal'],
                    slot: [1, 3],
                    weight: 13
                }
            ]
        },
        'fat-mu': {
            name: 'Fat Mu',
            faction: 'abyss',
            role: 'Ranger',
            pve: 3.3,
            pvp: 2.6,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1],
                    weight: 16
                }
            ]
        },
        gusta: {
            name: 'Gusta',
            faction: 'abyss',
            role: 'Warrior',
            pve: 2.0,
            pvp: 2.1,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Invisible', 'Talisman of Evasion'],
                    slot: [4, 5, 6],
                    weight: 10
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Demon Bell'],
                    slot: [1, 3],
                    weight: 5
                }
            ]
        },
        karim: {
            name: 'Karim',
            faction: 'abyss',
            role: 'Assassin',
            pve: 7.9,
            pvp: 7.6,
            tier: 3,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Echo of Death', 'The Black Sword'],
                    slot: [2],
                    weight: 97
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [2, 4, 5, 6],
                    weight: 21
                }
            ]
        },
        'king-barton': {
            name: 'King Barton',
            faction: 'abyss',
            role: 'Warrior',
            pve: 7.9,
            pvp: 8.2,
            tier: 1.5,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 203
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [3],
                    weight: 52
                }
            ]
        },
        kroos: {
            name: 'Kroos',
            faction: 'abyss',
            role: 'Priest',
            pve: 8.2,
            pvp: 8.1,
            tier: 1,
            builds: [
                {
                    // Suicide build?
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [1, /* fix suicide */ 3, 4, 5, 6],
                    weight: 203
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1],
                    weight: 59
                },
            ]
        },
        'lord-balrog': {
            name: 'Lord Balrog',
            faction: 'abyss',
            role: 'Warrior',
            pve: 3.7,
            pvp: 2.8,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Aidans Fury', 'Azrael', 'Crying Undead', 'Cursed Sandglass'],
                    slot: [1],
                    weight: 1
                }
            ]
        },
        margaret: {
            name: 'Margaret',
            faction: 'abyss',
            role: 'Mage',
            pve: 5.6,
            pvp: 4.2,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Demon Bell'],
                    slot: [1, 4, 5, 6],
                    weight: 13
                }
            ]
        },
        queen: {
            name: 'Queen',
            faction: 'abyss',
            role: 'Ranger',
            pve: 7.7,
            pvp: 7.5,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Fiends Touch', 'Queens Blade', 'Blood', 'Death Dance'],
                    slot: [3, 4, 5, 6],
                    weight: 207
                }
            ]
        },
        skerei: {
            name: 'Skerei',
            faction: 'abyss',
            role: 'Mage',
            pve: 8.5,
            pvp: 8.1,
            tier: 2,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [2],
                    weight: 187
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 23
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Echo of Death', 'The Black Sword'],
                    slot: [3, 4, 5, 6],
                    weight: 23
                }
            ]
        },
    },
    forest: {
        'demon-hunter': {
            name: 'Demon Hunter',
            faction: 'forest',
            role: 'Ranger',
            pve: 7.0,
            pvp: 8.1,
            tier: 2,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [4, 5, 6],
                    weight: 300
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [2],
                    weight: 54
                }
            ]
        },
        'dragon-slayer': {
            name: 'Dragon Slayer',
            faction: 'forest',
            role: 'Warrior',
            pve: 5.9,
            pvp: 3.6,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Spear of Destiny', 'Angels Pendant', 'Mirror Chain'],
                    slot: [1],
                    weight: 53
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1, 2],
                    weight: 22
                }
            ]
        },
        eddga: {
            name: 'Eddga',
            faction: 'forest',
            role: 'Warrior',
            pve: 4.2,
            pvp: 2.3,
            tier: -1,
            builds: [
                {
                    stone: 'HP (%) / Crit (%)',
                    artifact: ['Ancient Gods Whisper', 'Golden Bow', 'Elfs Blessed Bow', 'Lunas Sorrow', 'Punisher of Immortal'],
                    slot: [4, 5, 6],
                    weight: 11
                }
            ]
        },
        faceless: {
            name: 'Faceless',
            faction: 'forest',
            role: 'Assassin',
            pve: 3.2,
            pvp: 2.6,
            tier: -1,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal', 'Ancient Gods Whisper', 'Golden Bow', 'Elfs Blessed Bow', 'Lunas Sorrow'],
                    slot: [4, 5, 6],
                    weight: 19
                }
            ]
        },
        groo: {
            name: 'Groo',
            faction: 'forest',
            role: 'Warrior',
            pve: 6.4,
            pvp: 5.9,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1],
                    weight: 54
                }
            ]
        },
        'heart-watcher': {
            name: 'Heart Watcher',
            faction: 'forest',
            role: 'Assassin',
            pve: 8.7,
            pvp: 6.1,
            tier: 2.5,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [3, 4, 5, 6],
                    weight: 220
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [2],
                    weight: 41
                }
            ]
        },
        malassa: {
            name: 'Malassa',
            faction: 'forest',
            role: 'Ranger',
            pve: 6.6,
            pvp: 5.0,
            tier: -1,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Ancient Gods Whisper', 'Golden Bow', 'Elfs Blessed Bow', 'Lunas Sorrow'],
                    slot: [4, 5, 6],
                    weight: 35
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [2],
                    weight: 18
                },
            ]
        },
        rosa: {
            name: 'Rosa',
            faction: 'forest',
            role: 'Priest',
            pve: 7.8,
            pvp: 6.3,
            tier: 3,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [4, 5, 6],
                    weight: 39
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1],
                    weight: 22
                },
            ]
        },
        starlight: {
            name: 'Starlight',
            faction: 'forest',
            role: 'Mage',
            pve: 7.5,
            pvp: 7.5,
            tier: 2,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [2],
                    weight: 9
                },
                {
                    stone: 'HP (%) / Crit (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 8
                },
                {
                    stone: 'Precision (%) / Skill Dmg (%)',
                    artifact: ['Antlers Cane'],
                    slot: [4, 5, 6],
                    weight: 5
                }
            ]
        },
        valkyrie: {
            name: 'Valkyrie',
            faction: 'forest',
            role: 'Ranger',
            pve: 8.1,
            pvp: 8.3,
            tier: 1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [2, 3, 4, 5, 6],
                    weight: 500
                }
            ]
        },
        vesa: {
            name: 'Vesa',
            faction: 'forest',
            role: 'Priest',
            pve: 8.3,
            pvp: 7.9,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [4, 5, 6],
                    weight: 402
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Antlers Cane'],
                    slot: [2],
                    weight: 130
                }
            ]
        },
        oberon: {
            name: 'Oberon',
            faction: 'forest',
            role: 'Mage',
            pve: 6.2,
            pvp: 4.3,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [3],
                    weight: 1
                }
            ]
        }
    },
    fortress: {
        bleecker: {
            name: 'Bleecker',
            faction: 'fortress',
            role: 'Mage',
            pve: 2.0,
            pvp: 2.6,
            tier: -1,
            builds: [
                {
                    stone: 'HP (%) / Block (%)',
                    artifact: ['Invisible', 'Talisman of Evasion'],
                    slot: [1],
                    weight: 20
                },
                {
                    stone: 'Attack / HP (%) / Holy Dmg (%)',
                    artifact: ['Aidans Fury', 'Azrael', 'Crying Undead', 'Cursed Sandglass'],
                    slot: [4, 5, 6],
                    weight: 10
                }
            ]
        },
        emily: {
            name: 'Emily',
            faction: 'fortress',
            role: 'Priest',
            pve: 5.8,
            pvp: 6.6,
            tier: 3,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [3],
                    weight: 33
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [4, 5, 6],
                    weight: 21
                }
            ]
        },
        'flame-strike': {
            name: 'Flame Strike',
            faction: 'fortress',
            role: 'Mage',
            pve: 7.6,
            pvp: 7.0,
            tier: 2,
            builds: [
                {
                    stone: 'Attack / HP (%) / Holy Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [4, 5, 6],
                    weight: 69
                },
                {
                    stone: 'Attack / HP (%) / Holy Dmg (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 18
                }
            ]
        },
        'honor-guard': {
            name: 'Honor Guard',
            faction: 'fortress',
            role: 'Warrior',
            pve: 2.4,
            pvp: 2.6,
            tier: -1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Kamas Eye', 'Nail of Destiny', 'Confined Spirit', 'Satans Heart'],
                    slot: [1],
                    weight: 100
                }
            ]
        },
        iceblink: {
            name: 'Iceblink',
            faction: 'fortress',
            role: 'Ranger',
            pve: 6.1,
            pvp: 7.1,
            tier: 3,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [3, 1],
                    weight: 289
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Demon Bell'],
                    slot: [3],
                    weight: 68
                }
            ]
        },
        miki: {
            name: 'Miki',
            faction: 'fortress',
            role: 'Ranger',
            pve: 3.4,
            pvp: 3.6,
            tier: -1,
            builds: [
                {
                    stone: 'HP (%) / Block (%)',
                    artifact: ['Invisible', 'Talisman of Evasion'],
                    slot: [1],
                    weight: 21
                },
                {
                    stone: 'Attack / Attack (%) / Armor Break (%)',
                    artifact: ['Augustus Magic Ball'],
                    slot: [1, 3],
                    weight: 11
                }
            ]
        },
        mirage: {
            name: 'Mirage',
            faction: 'fortress',
            role: 'Assassin',
            pve: 4.5,
            pvp: 2.5,
            tier: -1,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Echo of Death', 'The Black Sword'],
                    slot: [4, 5, 6],
                    weight: 33
                }
            ]
        },
        'od-01': {
            name: 'OD 01',
            faction: 'fortress',
            role: 'Mage',
            pve: 4.4,
            pvp: 5.5,
            tier: -1,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Sigh', 'Wind God Messenger', 'Emerald Butterfly', 'Travelers Ring'],
                    slot: [4, 5, 6],
                    weight: 34
                },
                {
                    stone: 'Precision (%) / Skill Dmg (%)',
                    artifact: ['Energy Core', 'Eye of Hell', 'Eternal Chapter', 'Magic Energy Armlet'],
                    slot: [2],
                    weight: 10
                }
            ]
        },
        ormus: {
            name: 'Ormus',
            faction: 'fortress',
            role: 'Priest',
            pve: 7.8,
            pvp: 6.0,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart', 'Antlers Cane'],
                    slot: [4, 5, 6],
                    weight: 41
                }
            ]
        },
        sigmund: {
            name: 'Sigmund',
            faction: 'fortress',
            role: 'Warrior',
            pve: 8.6,
            pvp: 6.4,
            tier: 3,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart', 'Eye of Hell', 'Yubashiri'],
                    slot: [1],
                    weight: 224
                }
            ]
        },
        valentino: {
            name: 'Valentino',
            faction: 'fortress',
            role: 'Mage',
            pve: 7.6,
            pvp: 8.4,
            tier: 1,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [2, 4, 5, 6],
                    weight: 200
                }
            ]
        },
        xia: {
            name: 'Xia',
            faction: 'fortress',
            role: 'Assassin',
            pve: 8.3,
            pvp: 7.7,
            tier: 1.5,
            builds: [
                {
                    stone: 'HP (%) / Block (%)',
                    artifact: ['Augustus Magic Ball'],
                    slot: [4, 5, 6],
                    weight: 148
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Invisible', 'Talisman of Evasion'],
                    slot: [3],
                    weight: 32
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [1],
                    weight: 12
                }
            ]
        },
    },
    dark: {
        amuvor: {
            name: 'Amuvor',
            faction: 'dark',
            role: 'Assassin',
            pve: 8.3,
            pvp: 8.4,
            tier: 1,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [4, 5, 6],
                    weight: 87
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [2],
                    weight: 26
                }
            ]
        },
        aspen: {
            name: 'Aspen',
            faction: 'dark',
            role: 'Warrior',
            pve: 8.4,
            pvp: 8.5,
            tier: 0,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [2, 4, 5, 6],
                    weight: 52
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Antlers Cane'],
                    slot: [1],
                    weight: 23
                }
            ]
        },
        'dark-arthindol': {
            name: 'Dark Arthindol',
            faction: 'dark',
            role: 'Mage',
            pve: 5.1,
            pvp: 8.0,
            tier: 2.5,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [4, 5, 6],
                    weight: 64
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Demon Bell'],
                    slot: [2],
                    weight: 64
                },
            ]
        },
        'das-moge': {
            name: 'Das Moge',
            faction: 'dark',
            role: 'Ranger',
            pve: 8.3,
            pvp: 7.6,
            tier: 2.5,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [2, 4, 5, 6],
                    weight: 118
                }
            ]
        },
        mihm: {
            name: 'Mihm',
            faction: 'dark',
            role: 'Mage',
            pve: 6.6,
            pvp: 8.6,
            tier: 0,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Antlers Cane'],
                    slot: [2, 4, 5, 6],
                    weight: 22
                }
            ]
        },
        sleepless: {
            name: 'Sleepless',
            faction: 'dark',
            role: 'Warrior',
            pve: 5.6,
            pvp: 5.8,
            tier: 3,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Runes Power', 'Mirror Chain', 'Oaks Heart'],
                    slot: [1],
                    weight: 36
                }
            ]
        },
    },
    light: {
        aida: {
            name: 'Aida',
            faction: 'light',
            role: 'Mage',
            pve: 8.6,
            pvp: 8.6,
            tier: 0,
            builds: [
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Demon Bell'],
                    slot: [4, 5, 6],
                    weight: 76
                },
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Antlers Cane'],
                    slot: [2],
                    weight: 14
                }
            ]
        },
        asmodel: {
            name: 'Asmodel',
            faction: 'light',
            role: 'Warrior',
            pve: 7.5,
            pvp: 8.3,
            tier: 2.5,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Punisher of Immortal'],
                    slot: [3],
                    weight: 62
                },
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [2],
                    weight: 32
                },
                {
                    stone: 'Attack / HP (%) / Holy Dmg (%)',
                    artifact: ['Fearless Armor', 'Spear of Destiny', 'Angels Pendant', 'Mirror Chain'],
                    slot: [1],
                    weight: 17
                }
            ]
        },
        belrain: {
            name: 'Belrain',
            faction: 'light',
            role: 'Priest',
            pve: 7.7,
            pvp: 8.3,
            tier: 1,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Demon Bell'],
                    slot: [1],
                    weight: 34
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Magic Stone Sword'],
                    slot: [2, 4, 5, 6],
                    weight: 24
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [3],
                    weight: 13
                }
            ]
        },
        'faith-blade': {
            name: 'Faith Blade',
            faction: 'light',
            role: 'Assassin',
            pve: 6.2,
            pvp: 8.5,
            tier: 1,
            builds: [
                {
                    stone: 'Attack (%) / Crit (%) / Crit Dmg (%)',
                    artifact: ['Demon Bell'],
                    slot: [2, 4, 5, 6]
                }
            ]
        },
        gerke: {
            name: 'Gerke',
            faction: 'light',
            role: 'Priest',
            pve: 7.8,
            pvp: 6.4,
            tier: 3,
            builds: [
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Sword of Justice', 'The Blade of Freedom'],
                    slot: [2],
                    weight: 55
                },
                {
                    stone: 'Attack / Attack (%)',
                    artifact: ['Fearless Armor', 'Spear of Destiny', 'Angels Pendant', 'Mirror Chain'],
                    slot: [1],
                    weight: 15
                }
            ]
        },
        michelle: {
            name: 'Michelle',
            faction: 'light',
            role: 'Ranger',
            pve: 7.0,
            pvp: 8.3,
            tier: 1,
            builds: [
                {
                    stone: 'HP / HP (%)',
                    artifact: ['Fearless Armor', 'Spear of Destiny', 'Angels Pendant', 'Mirror Chain'],
                    slot: [1],
                    weight: 62
                },
                {
                    stone: 'Speed / HP (%)',
                    artifact: ['Magic Source', 'Orb of Annihilation'],
                    slot: [3, 4, 5, 6],
                    weight: 38
                }
            ]
        },
    }
};

const factions = ['shadow', 'abyss', 'dark', 'light', 'forest', 'fortress'];

const auras = {
    shadow:         {shadow: 6, abyss: 0, dark: 0, light: 0, forest: 0, fortress: 0, overlay: 'darkOverlay.png'},
    abyss:          {shadow: 0, abyss: 6, dark: 0, light: 0, forest: 0, fortress: 0, overlay: 'abyssOverlay.png'},
    dark:           {shadow: 0, abyss: 0, dark: 6, light: 0, forest: 0, fortress: 0, overlay: 'darkOverlay.png'},
    light:          {shadow: 0, abyss: 0, dark: 0, light: 6, forest: 0, fortress: 0, overlay: 'lightOverlay.png'},
    forest:         {shadow: 0, abyss: 0, dark: 0, light: 0, forest: 6, fortress: 0, overlay: 'forestOverlay.png'},
    fortress:       {shadow: 0, abyss: 0, dark: 0, light: 0, forest: 0, fortress: 6, overlay: undefined},
    ruin:           {shadow: 2, abyss: 2, dark: 2, light: 0, forest: 0, fortress: 0, overlay: 'darkOverlay.png'},
    redemption:     {shadow: 0, abyss: 0, dark: 0, light: 2, forest: 2, fortress: 2, overlay: undefined},
    rainbow:        {shadow: 1, abyss: 1, dark: 1, light: 1, forest: 1, fortress: 1, overlay: 'rainbowOverlay.png'},
    evil:           {shadow: 3, abyss: 3, dark: 0, light: 0, forest: 0, fortress: 0, overlay: 'darkOverlay.png'},
    justice:        {shadow: 0, abyss: 0, dark: 0, light: 0, forest: 3, fortress: 3, overlay: undefined},
    goodVsEvil:     {shadow: 0, abyss: 0, dark: 3, light: 3, forest: 0, fortress: 0, overlay: undefined},
    pollution:      {shadow: 0, abyss: 3, dark: 0, light: 0, forest: 3, fortress: 0, overlay: undefined},
    boundSoul:      {shadow: 0, abyss: 3, dark: 0, light: 0, forest: 0, fortress: 3, overlay: undefined},
    oldEnemy:       {shadow: 3, abyss: 0, dark: 0, light: 0, forest: 0, fortress: 3, overlay: undefined},
    lifeVsDeath:    {shadow: 3, abyss: 0, dark: 0, light: 0, forest: 3, fortress: 0, overlay: undefined},
    none:           {shadow: 0, abyss: 0, dark: 0, light: 0, forest: 0, fortress: 0, overlay: undefined}
};

function lookupHero(hero) {
    if (!hero) {
        return null;
    }

    hero = hero.toLowerCase();

    for (const faction of Object.keys(heroes)) {
        for (const heroName of Object.keys(heroes[faction])) {
            const heroNameFriendly = heroes[faction][heroName].name.toLowerCase();

            // Quick resolve, no fuzzy overhead.
            if (heroNameFriendly === hero || heroName === hero) {
                return {...heroes[faction][heroName], label: heroName};
            }
        }
    }

    return null;
}

function getAuraDetails(aura) {
    return auras[aura];
}

function lookupAura(heroes) {
    auraLoop: for (const auraKey in auras) {
        const aura = auras[auraKey];
        const determinant = {...aura};

        for (const hero of heroes) {
            if (!hero) {
                continue;
            }

            const faction = hero.faction;
            determinant[faction]--;
        }

        for (const key of factions) {
            const val = determinant[key];

            if (val !== 0) {
                continue auraLoop;
            }
        }

        return auraKey;
    }

    return null;
}

module.exports = {
    heroes,
    auras,
    lookupHero,
    lookupAura,
    getAuraDetails
};
