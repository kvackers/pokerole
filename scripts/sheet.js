import "https://esm.sh/preact@10.26.9/debug";
import { h, render } from 'https://esm.sh/preact@10.26.9';
import { useEffect, useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';

import { impureSetTheme, DEFAULT_APP_STATE, DEFAULT_UI_STATE } from './ui2.js';
import { TrainerMode } from './trainer.js';

const html = htm.bind(h);

function Navbar({ state, setState }) {
    const { textMode, mode, theme } = state;
    const setTheme = theme => setState({ ...state, theme });
    const setMode = mode => setState({ ...state, mode });

    const displayTheme = currTheme => theme === currTheme ? "d-none" : "";
    const displayMode = currMode => mode === currMode ? "d-none" : "";

    return html`
    <nav class="d-flex justify-content-between">
        <button class="btn ${displayMode("trainer")}" onclick=${() => setMode("trainer")}>
            Treinador <img src="assets/pokedex.png"/>
        </button>
        <button class="btn ${displayMode("pokemon")}" onclick=${() => setMode("pokemon")}>
            Pokémon <img src="assets/pokeball.png"/>
        </button>

        <button class="btn ${displayTheme("light")}" onclick=${() => setTheme("light")}>Claro ☀️</button>
        <button class="btn ${displayTheme("dark")}" onclick=${() => setTheme("dark")}>Escuro 🌙</button>
    </nav>
    `;
}

function App() {
    const [uiState, setUIState] = useState({ ...DEFAULT_UI_STATE });
    useEffect(() => impureSetTheme(uiState.theme), [uiState.theme]);

    const [appState, setAppState] = useState({ ...DEFAULT_APP_STATE });
    return html`
        <${Navbar} state=${uiState} setState=${setUIState}/>
        <${TrainerMode} state=${appState} setState=${setAppState} />
		`;
}

render(
    html`<${App} />`,
    document.body
);