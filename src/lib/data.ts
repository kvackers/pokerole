export const DEFAULT_IMAGE: string = "./ditto_anon.png";

export const DEFAULT_TRAINER = {
    image: DEFAULT_IMAGE,
    name: '',
    concept: '',
    money: 1500,

    health: 0,
    confidence: 0,
    willPoints: 0,

    stats: Array.from({ length: 9 }, () => 1),
    skills: Array.from({ length: 16 }, () => 0),

    extraSkills: [{ name: '???', value: 0 }],

    badges: 0,
    potions: Array.from({ length: 6 }, () => 0),
    bag: [{ item: '???', count: 0 }],
    notes: ''
};

export const DEFAULT_POKEMON = {
    image: DEFAULT_IMAGE,
    name: '',
    species: 'ditto',
    ability: '',

    health: 0,
    confidence: 0,
    willPoints: 0,

    types: ['Normal', '-'],
    evoTime: '',
    wins: 0,
    training: 0,
    happiness: 2,
    loyalty: 2,

    stats: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    skills: Array.from({ length: 12 }, () => 0),
    extraSkills: [{ name: '???', value: 0 }],

    item: '',
    accessory: '',
    ribbons: 0,

    status: 'Saudável',
    notes: '',
};

export const TYPES = [
    "-",
    "Aço",
    "Água",
    "Dragão",
    "Elétrico",
    "Fada",
    "Fantasma",
    "Fogo",
    "Gelo",
    "Grama",
    "Inseto",
    "Lutador",
    "Normal",
    "Pedra",
    "Psíquico",
    "Sinistro",
    "Solo",
    "Veneno",
    "Voador",
];

export const STATUS = [
    'Saudável',
    'Queimado 1',
    'Queimado 2',
    'Queimado 3',
    'Parálise',
    'Congelado',
    'Veneno',
    'Tóxico',
    'Sono'
];

export const DEX = {
    "bulbasaur": {
        "baseHP": "3",
        "baseSTR": "2",
        "maxSTR": "4",
        "baseDEX": "2",
        "maxDEX": "4",
        "baseVIT": "2",
        "maxVIT": "4",
        "baseSPC": "2",
        "maxSPC": "4",
        "baseINS": "2",
        "maxINS": "4",
        "evoTime": "Médio",
        "type1": "Grama",
        "type2": "Veneno"
    },
    "ditto": {
        "baseHP": "4",
        "baseSTR": "2",
        "maxSTR": "4",
        "baseDEX": "2",
        "maxDEX": "4",
        "baseVIT": "2",
        "maxVIT": "4",
        "baseSPC": "2",
        "maxSPC": "4",
        "baseINS": "2",
        "maxINS": "4",
        "evoTime": "Final",
        "type1": "Normal",
        "type2": ""
    },
};