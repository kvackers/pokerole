const BLANK_TRAINER = {
    personalInput: ["", "", "", "", "", ""],
    personalSelect: ["-", "-"],
    stats: ["1", "1", "1", "1", "1", "1", "1", "1", "1"],
    skills: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    extraSkillNames: ["", "", "", ""],
    dexPotions: ["", "", "", "2", "", "4", "", "14"],
    badgeBag: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    achievements: ["", "", "", "", ""],
    achieved: [false, false, false, false, false],
    notes: ""
};

const BLANK_POKEMON = {
    personalInput: ["", "", "", "", "", "", "", "", ""],
    personalSelect: ["-", "-", "-", "", ""],
    stats: ["", "", "", "", "", "1", "1", "1", "1", "1"],
    skills: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    extraSkill: "",
    derived: ["", ""],
    items: ["", ""],
    ribbons: ["", "", "", "", "", ""],
    attackInputs: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    attackTypes: ["", "", "", "", "", ""],
    attackEffects: []
};

// Initializes database
function initDatabase() {
    let database = localStorage.getItem('database');
    if (database) {
        const db = JSON.parse(database);
        const pokemon = {};
        let minKey = Infinity;
        for (const key of Object.keys(db.pokemon)) {
            pokemon[+key] = structuredClone(db.pokemon[key]);
            minKey = Math.min(+key, minKey);
        }

        db.pokemon = pokemon;
        db.currentPokemon = minKey;
        return db;
    } else {
        const database = {
            trainer: structuredClone(BLANK_TRAINER),
            pokemon: {
                0: structuredClone(BLANK_POKEMON)
            },
            currentPokemon: 0
        }

        localStorage.setItem(
            'database',
            JSON.stringify(database, null, 0)
        );

        return database;
    }
}

let DATABASE = initDatabase();

export function readDatabase() {
    return DATABASE;
}

export function importDatabase(newDB) {
    // newDB should be a dictionary
    if (typeof newDB !== 'object' || typeof newDB === null) {
        throw new TypeError('newDB is not an object');
    }

    // newDB should have exactly 3 keys
    if (Object.keys(newDB).length != 3) {
        throw new TypeError("newDB doesn't have the expected number of keys");
    }

    const setEq = (a, b) => (a.size === b.size && new Set([...a, ...b]).size === a.size);
    if (!setEq(new Set(Object.keys(newDB)), new Set(["trainer", "pokemon", "currentPokemon"]))) {
        throw new TypeError("newDB doesn't have the expected keys");
    }

    if (!setEq(new Set(Object.keys(newDB.trainer)), new Set(Object.keys(BLANK_TRAINER)))) {
        throw new TypeError("newDB.trainer doesn't have the expected keys");
    }

    if (newDB.pokemon.length < 0) {
        throw new TypeError("newDB.pokemon is too small");
    }

    if (!(newDB.currentPokemon in newDB.pokemon)) {
        throw new TypeError("newDB.pokemon is corrupted: newDB.currentPokemon not in it.");
    }

    for (const key of Object.keys(newDB.pokemon)) {
        if (!setEq(new Set(Object.keys(newDB.pokemon[key])), new Set(Object.keys(BLANK_POKEMON)))) {
            throw new TypeError("newDB.pokemon doesn't have the expected keys");
        }
    }

    DATABASE = structuredClone(newDB);

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

export function editTrainer(newTrainer) {
    DATABASE.trainer = structuredClone(newTrainer);

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

export function cleanTrainer() {
    DATABASE.trainer = structuredClone(BLANK_TRAINER);

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

// Creates a new Pokemon and switches to it
export function createPokemon() {
    const maxID = +Object.keys(DATABASE.pokemon).sort().reduce((acc, e) => Math.max(acc, e));

    const newCurrent = maxID + 1;
    const newPokemon = structuredClone(BLANK_POKEMON);

    DATABASE.pokemon[newCurrent] = newPokemon;
    DATABASE.currentPokemon = newCurrent;

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

export function switchPokemon(id) {
    DATABASE.currentPokemon = id;

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

// Cleans current Pokemon
export function cleanPokemon() {
    DATABASE.pokemon[DATABASE.currentPokemon] = structuredClone(BLANK_POKEMON);

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

export function editPokemon(newPokemon) {
    DATABASE.pokemon[DATABASE.currentPokemon] = structuredClone(newPokemon);

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}

// Deletes current Pokemon
export function deletePokemon() {
    if (Object.keys(DATABASE.pokemon).length < 2) {
        return cleanPokemon();
    } else {
        const current = DATABASE.currentPokemon;
        const firstKey = Object.keys(DATABASE.pokemon).sort().filter(e => e != current)[0];

        const team = structuredClone(DATABASE.pokemon);
        delete team[current];

        DATABASE.currentPokemon = +firstKey;
        DATABASE.pokemon = team;

        localStorage.setItem(
            'database',
            JSON.stringify(DATABASE, null, 0)
        );

        return DATABASE;
    }
}

// Deletes everything and reinitializes it to a more pristine state
export function nukeDatabase() {
    DATABASE = {
        trainer: structuredClone(BLANK_TRAINER),
        pokemon: {
            0: structuredClone(BLANK_POKEMON)
        },
        currentPokemon: 0
    }

    localStorage.setItem(
        'database',
        JSON.stringify(DATABASE, null, 0)
    );

    return DATABASE;
}