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

export const DEFAULT_APP_STATE = {
    theme: readThemePreference(),
    mode: "trainer",
    version: 2,
    trainer: {
        image: "assets/ditto_anon.png",
        name: "",
        concept: "",
        money: 0,
        health: 0,
        nature: "Firme",
        rank: "Zero",
        confidence: 0,
        willPoints: 0,
        stats: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        skills: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        extraSkillNames: ["", "", "", ""],
        dex: [0, 0],
        badges: ["", "", "", "", "", "", "", ""],
        potions: [0, 2, 0, 4, 0, 14],
        bag: ["", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0],
        achieved: [false, false, false, false, false],
        achievements: ["", "", "", "", ""],
        notes: ""
    }
};