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
        achieved: [false, false, false, false, false],
        achievements: ["", "", "", "", ""],
        notes: ""
    }
};