import Ajv from 'ajv';
import { DEFAULT_TRAINER, DEFAULT_POKEMON, DEX, TYPES, STATUS } from './data.js';

const ajv = new Ajv();

const SCHEMA_V1 = {
    title: 'Savedata Homebrew V1',
    type: 'object',
    properties: {
        trainer: {
            type: 'object',
            properties: {
                image: { type: 'string' },
                name: { type: 'string' },
                concept: { type: 'string' },
                money: { type: 'integer', minimum: 0 },
                health: { type: 'integer', minimum: 0 },
                confidence: { type: 'integer', minimum: 0 },
                willPoints: { type: 'integer', minimum: 0 },
                stats: { type: 'array', minItems: 9, maxItems: 9, items: { type: 'integer', minimum: 1 } },
                skills: { type: 'array', minItems: 16, maxItems: 16, items: { type: 'integer', minimum: 0 } },
                extraSkills: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            value: { type: 'integer', minimum: 0 }
                        }
                    }
                },
                badges: { type: 'integer', minimum: 0 },
                potions: { type: 'array', minItems: 6, maxItems: 6, items: { type: 'integer', minimum: 0 } },
                bag: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            item: { type: 'string' },
                            count: { type: 'integer', minimum: 0 }
                        }
                    }
                },
                notes: { type: 'string' }
            },
            required: Object.keys(DEFAULT_TRAINER)
        },
        currentPokemon: { type: 'integer', minimum: 0 },
        pokemonList: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    image: { type: 'string' },
                    name: { type: 'string' },
                    species: { enum: Object.keys(DEX) },
                    ability: { type: 'string' },
                    health: { type: 'integer', minimum: 0 },
                    confidence: { type: 'integer', minimum: 0 },
                    willPoints: { type: 'integer', minimum: 0 },
                    types: { type: 'array', minItems: 2, maxItems: 2, items: { enum: TYPES } },
                    teratype: { enum: TYPES },
                    evoTime: { type: 'string' },
                    wins: { type: 'integer', minimum: 0 },
                    training: { type: 'integer', minimum: 0 },
                    happiness: { type: 'integer', minimum: 0 },
                    loyalty: { type: 'integer', minimum: 0 },
                    stats: { type: 'array', minItems: 10, maxItems: 10, items: { type: 'integer', minimum: 1 } },
                    skills: { type: 'array', minItems: 12, maxItems: 12, items: { type: 'integer', minimum: 0 } },
                    extraSkills: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                value: { type: 'integer', minimum: 0 }
                            }
                        }
                    },
                    item: { type: 'string' },
                    accessory: { type: 'string' },
                    ribbons: { type: 'integer', minimum: 0 },
                    status: { enum: STATUS },
                    notes: { type: 'string' },
                    learned: { type: 'integer', minimum: 0 },
                    attacks: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                type: { enum: TYPES },
                                damage: { type: 'string' },
                                acc: { type: 'string' },
                                effect: { type: 'string' }
                            }
                        }
                    }
                },
                required: Object.keys(DEFAULT_POKEMON)
            }
        }
    },
    required: ['trainer', 'currentPokemon', 'pokemonList']
};

export function validateSave(data: any) {
    if (data.version !== 'hb-1') {
        throw new Error('Invalid Save');
    } else {
        const validate = ajv.compile(SCHEMA_V1);
        const valid = validate(data);

        if (!valid) {
            console.log(validate.errors);
            throw new Error('Invalid Save');
        }

        return data;
    }
}

export function tryLoadSave(orelse: any) {
    const rawData = localStorage.getItem('databaseHB');
    if (rawData === null) { return { ...orelse }; }

    let save = JSON.parse(rawData);
    try {
        save = validateSave(save);
    } catch (e) {
        save = { ...orelse };
    }

    return save;
}