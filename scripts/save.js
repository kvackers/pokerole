import { DEFAULT_TRAINER_STATE, DEFAULT_POKEMON_STATE } from "./ui2.js";

const Ajv = window.ajv7
const ajv = new Ajv();

const SCHEMA_V1 = {
    title: "Savedata V1",
    type: "object",
    properties: {
        trainer: {
            type: "object",
            properties: {
                personalInput: { type: "array", minItems: 6, items: { type: "string" } },
                personalSelect: { type: "array", minItems: 2, items: { type: "string" } },
                stats: { type: "array", minItems: 9, items: { type: "string" } },
                skills: { type: "array", minItems: 20, items: { type: "string" } },
                extraSkillNames: { type: "array", minItems: 4, items: { type: "string" } },
                dexPotions: { type: "array", minItems: 8, items: { type: "string" } },
                badgeBag: { type: "array", minItems: 28, items: { type: "string" } },
                achievements: { type: "array", minItems: 5, items: { type: "string" } },
                achieved: { type: "array", minItems: 5, items: { type: "boolean" } },
                notes: { type: "string" }
            },
            required: [
                "personalInput", "personalSelect", "stats", "skills",
                "extraSkillNames", "dexPotions", "badgeBag", "achievements", "achieved", "notes"
            ]
        },
        pokemon: {
            type: "object",
            patternProperties: {
                "^.*$": {
                    type: "object",
                    properties: {
                        personalInput: { type: "array", minItems: 10, items: { type: "string" } },
                        personalSelect: { type: "array", minItems: 5, items: { type: "string" } },
                        stats: { type: "array", minItems: 10, items: { type: "string" } },
                        skills: { type: "array", minItems: 13, items: { type: "string" } },
                        extraSkill: { type: "string" },
                        derived: { type: "array", minItems: 7, items: { type: "string" } },
                        items: { type: "array", minItems: 2, items: { type: "string" } },
                        ribbons: { type: "array", minItems: 6, items: { type: "string" } },
                        attackInputs: { type: "array", minItems: 18, items: { type: "string" } },
                        attackTypes: { type: "array", minItems: 6, items: { type: "string" } },
                        attackEffects: { type: "array", minItems: 6, items: { type: "string" } },
                    },
                    required: [
                        "personalInput", "personalSelect", "stats", "skills",
                        "extraSkill", "derived", "items", "ribbons", "attackInputs",
                        "attackTypes", "attackEffects",
                    ]
                }
            }
        },
        currentPokemon: { type: "integer", minimum: 0 },
    },
    required: ["trainer", "pokemon", "currentPokemon"]
};

const SCHEMA_V2 = {
    title: "Savedata V2",
    type: "object",
    properties: {
        version: { type: "integer", minimum: 2, maximum: 2 },
        pokemonId: { type: "integer" },
        trainer: {
            type: "object",
            properties: {
                image: { type: "string" },
                name: { type: "string" },
                concept: { type: "string" },
                money: { type: "integer", minimum: 0 },
                health: { type: "integer", minimum: 0 },
                nature: { type: "string" },
                rank: { type: "string" },
                confidence: { type: "integer", minimum: 0 },
                willPoints: { type: "integer", minimum: 0 },
                stats: { type: "array", minItems: 9, items: { type: "integer", minimum: 1 } },
                skills: { type: "array", minItems: 20, items: { type: "integer", minimum: 0 } },
                extraSkillNames: { type: "array", minItems: 4, items: { type: "string" } },
                dex: { type: "array", minItems: 2, items: { type: "integer", minimum: 0 } },
                badges: { type: "array", minItems: 8, items: { type: "string" } },
                potions: { type: "array", minItems: 6, items: { type: "integer", minimum: 0 } },
                bag: {
                    type: "array", minItems: 20, items: { anyOf: [{ type: "integer", minimum: 0 }, { type: "string" }] }
                },
                achieved: { type: "array", minItems: 5, items: { type: "boolean" } },
                achievements: { type: "array", minItems: 5, items: { type: "string" } },
                notes: { type: "string" }
            },
            required: Object.keys(DEFAULT_TRAINER_STATE),
        },
        pokemon: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    image: { type: "string" },
                    nickname: { type: "string" },
                    species: { type: "string" },
                    ability: { type: "string" },
                    rank: { type: "string" },
                    nature: { type: "string" },
                    types: { type: "array", items: { type: "string" } },
                    evoTime: { type: "string" },
                    wins: { type: "integer", minimum: 0 },
                    trainingSessions: { type: "integer", minimum: 0 },
                    health: { type: "integer", minimum: 0 },
                    confidence: { type: "integer", minimum: 0 },
                    willPoints: { type: "integer", minimum: 0 },
                    happiness: { type: "integer", minimum: 0 },
                    loyalty: { type: "integer", minimum: 0 },
                    stats: { type: "array", minItems: 10, items: { type: "integer", minimum: 1 } },
                    skills: { type: "array", minItems: 13, items: { type: "integer", minimum: 0 } },
                    status: { type: "string" },
                    volatile: { type: "string" },
                    extraSkillName: { type: "string" },
                    item: { type: "string" },
                    accessory: { type: "string" },
                    ribbons: { type: "array", minItems: 5, items: { type: "string" } },
                    attacks: {
                        type: "array", minItems: 6, items: {
                            type: "object",
                            patternProperties: { '^.*$': { type: "string" } },
                            required: ["name", "type", "damage", "accuracy", "notes"]
                        }
                    },
                    notes: { type: "string" }
                },
                required: Object.keys(DEFAULT_POKEMON_STATE)
            }
        }
    },
    required: ["version", "pokemonId", "trainer", "pokemon"],
};

// read save according to v1 logic
function loadSaveV1(data) {
    const validate = ajv.compile(SCHEMA_V1);
    const valid = validate(data);

    if (!valid) {
        console.log(validate.errors);
        throw new Error("Invalid Save");
    }

    const newSave = {
        version: 2,
        pokemonId: 0,
        trainer: {
            image: "assets/ditto_anon.png",
            name: data.trainer.personalInput[0],
            concept: data.trainer.personalInput[1],
            money: +data.trainer.personalInput[2],
            health: +data.trainer.personalInput[3],
            willPoints: +data.trainer.personalInput[4],
            confidence: +data.trainer.personalInput[5],
            nature: data.trainer.personalSelect[0],
            rank: data.trainer.personalSelect[1],
            stats: data.trainer.stats.map(e => +e),
            skills: data.trainer.skills.map(e => +e),
            extraSkillNames: data.trainer.extraSkillNames,
            achievements: data.trainer.achievements,
            achieved: data.trainer.achieved,
            notes: data.trainer.notes,
            dex: data.trainer.dexPotions.slice(0, 2).map(e => +e),
            potions: data.trainer.dexPotions.slice(2).map(e => +e),
            badges: data.trainer.badgeBag.slice(0, 8),
            bag: data.trainer.badgeBag.slice(8).map((val, idx) => {
                if (idx % 2 == 0) { return val; }
                else { return +(val || 0); }
            })
        }
    };

    const newPokemon = [];
    for (let [k, v] of Object.entries(data.pokemon)) {
        let attacks = [];
        for (let i = 0; i < 6; ++i) {
            const attack = {
                name: v.attackInputs[3 * i],
                damage: v.attackInputs[3 * i + 1],
                accuracy: v.attackInputs[3 * i + 2],
                type: v.attackTypes[i],
                notes: v.attackEffects[i] === "undefined" ? "" : v.attackEffects[i]
            }

            attacks.push(attack);
        }

        const pokemon = {
            image: "assets/ditto_anon.png",
            nickname: v.personalInput[0],
            ability: v.personalInput[1],
            wins: +v.personalInput[2],
            evoTime: v.personalInput[3],
            health: +(v.personalInput[4] || 0),
            willPoints: +(v.personalInput[5] || 0),
            confidence: +(v.personalInput[6] || 0),
            happiness: +(v.personalInput[7] || 0),
            loyalty: +(v.personalInput[8] || 0),
            trainingSessions: +(v.personalInput[9] || 0),
            species: v.personalSelect[0].toLowerCase(),
            rank: v.personalSelect[1],
            nature: v.personalSelect[2],
            types: v.personalSelect.slice(3),
            stats: v.stats.map(e => +e),
            skills: v.skills.map(e => +e),
            status: v.derived[0],
            volatile: v.derived[1],
            item: v.items[0],
            accessory: v.items[1],
            extraSkillName: v.extraSkill,
            ribbons: v.ribbons,
            attacks,
            notes: ""
        };

        newPokemon.push(pokemon);
    }

    newSave.pokemon = newPokemon;
    return loadSave(newSave);
}

export function loadSave(data) {
    if (!data.version) {
        return loadSaveV1(data);
    } else {
        const validate = ajv.compile(SCHEMA_V2);
        const valid = validate(data);

        if (!valid) {
            console.log(validate.errors);
            throw new Error("Invalid Save");
        }

        return data;
    }
}