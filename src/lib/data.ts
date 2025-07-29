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