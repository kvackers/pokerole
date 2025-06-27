export function readThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    } else {
        return "light";
    }
}

export function impureSetTheme(preference) {
    const html = document.querySelector('html');
    if (preference === "dark") {
        html.setAttribute("data-bs-theme", "dark");
    } else {
        html.setAttribute("data-bs-theme", "");
    }
}

export const DEFAULT_UI_STATE = {
    theme: readThemePreference(),
    mode: "pokemon", //"trainer",
    textMode: "dropdown",
};

export const DEFAULT_POKEMON_STATE = {
    image: "assets/ditto_anon.png",
    nickname: "",
    species: "ditto",
    ability: "",
    rank: "Zero",
    nature: "Firme",
    types: ["Normal", "-"],
    evoTime: "",
    wins: 0,
    trainingSessions: 0,
    health: 6,
    confidence: 4,
    willPoints: 3,
    happiness: 2,
    loyalty: 2,
    stats: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    skills: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    status: "Saudável",
    volatile: "Saudável",
    extraSkillName: "",
    item: "",
    accessory: "",
    ribbons: ["", "", "", "", "", ""],
    attacks: [
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" },
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" },
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" },
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" },
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" },
        { name: "", type: "Normal", damage: "", accuracy: "", notes: "Efeito" }
    ],
    notes: ""
};

export const DEFAULT_TRAINER_STATE = {
    image: "assets/ditto_anon.png",
    name: "",
    concept: "",
    money: 500,
    health: 5,
    nature: "Firme",
    rank: "Zero",
    confidence: 4,
    willPoints: 3,
    stats: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    skills: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    extraSkillNames: ["", "", "", ""],
    dex: [0, 0],
    badges: ["", "", "", "", "", "", "", ""],
    potions: [0, 2, 0, 4, 0, 14],
    bag: ["", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0],
    achieved: [false, false, false, false, false],
    achievements: ["", "", "", "", ""],
    notes: ""
};

export const DEFAULT_APP_STATE = {
    version: 2,
    trainer: { ...DEFAULT_TRAINER_STATE },
    pokemon: { 0: { ...DEFAULT_POKEMON_STATE } },
    pokemonId: 0
};