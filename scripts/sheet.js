import "https://esm.sh/preact@10.26.9/debug";
import { h, render } from 'https://esm.sh/preact@10.26.9';
import { useEffect, useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';

import { impureSetTheme, DEFAULT_APP_STATE, DEFAULT_UI_STATE } from './ui2.js';
import { TrainerMode } from './trainer.js';
import { PokemonMode } from "./pokemon.js";
import { loadSave } from "./save.js";

const html = htm.bind(h);

function Navbar({ state, setState }) {
    const { mode, theme } = state;
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

const old = {
    "trainer": {
        "personalInput": [
            "Ray",
            "Phantom Thief",
            "500",
            "5",
            "4",
            "9"
        ],
        "personalSelect": [
            "Atrevida",
            "Zero"
        ],
        "stats": [
            "1",
            "2",
            "1",
            "2",
            "1",
            "2",
            "2",
            "1",
            "1"
        ],
        "skills": [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "0",
            "1",
            "1",
            "1",
            "0",
            "0",
            "",
            "",
            "",
            ""
        ],
        "extraSkillNames": [
            "",
            "",
            "",
            ""
        ],
        "dexPotions": [
            "10",
            "4",
            "",
            "2",
            "",
            "4",
            "",
            "14"
        ],
        "badgeBag": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Pokébolas",
            "3",
            "Ração",
            "5",
            "Comida Enlatada",
            "5",
            "Chesto Berry",
            "0",
            "Park Ball",
            "0",
            "Cateira Batida (Pelo Aipom)",
            "1",
            "Meio Maço de Cigarros",
            "1",
            "moedas do cassino",
            "10",
            "",
            "",
            "",
            ""
        ],
        "achievements": [
            "",
            "",
            "",
            "",
            ""
        ],
        "achieved": [
            false,
            false,
            false,
            false,
            false
        ],
        "notes": "Prof Juno - Formas Regionais\n   - Recomendação (Arranjar um Porygon/Poke Elétrico)\n   - Reuniões de Sexta Feira a tarde\n\nProf Pipa Buano - Fósseis\n\nCateira Batida (Pelo Aipom)\n      30 Pokedollares\n      Fotos\n      Camisinha\n      Nº de Telefone\n\n\n"
    },
    "pokemon": {
        "0": {
            "personalInput": [
                "Thorn",
                "",
                "1",
                "Médio",
                "4",
                "4",
                "7",
                "2",
                "2",
                "3"
            ],
            "personalSelect": [
                "Bulbasaur",
                "Zero",
                "Alegre",
                "Grama",
                "Veneno"
            ],
            "stats": [
                "2",
                "2",
                "2",
                "2",
                "2",
                "1",
                "1",
                "1",
                "1",
                "1"
            ],
            "skills": [
                "1",
                "0",
                "1",
                "1",
                "1",
                "0",
                "1",
                "0",
                "0",
                "0",
                "0",
                "0",
                ""
            ],
            "extraSkill": "",
            "derived": [
                "Saudável",
                "Saudável",
                "3",
                "3",
                "3 / 3",
                "2",
                "2"
            ],
            "items": [
                "",
                ""
            ],
            "ribbons": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackInputs": [
                "Tackle",
                "4d6",
                "3d6",
                "Growl",
                "-",
                "Tough/Cute +Perform",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackTypes": [
                "Normal",
                "Normal",
                "",
                "",
                "",
                ""
            ],
            "attackEffects": [
                "-",
                "-",
                "undefined",
                "undefined",
                "undefined",
                "undefined"
            ]
        },
        "1": {
            "personalInput": [
                "Mugi (Aipom Regional)",
                "Pickup",
                "0",
                "Médio",
                "3",
                "4",
                "6",
                "2",
                "1",
                "3"
            ],
            "personalSelect": [
                "Aipom",
                "Zero",
                "Sapeca",
                "Normal",
                "Lutador"
            ],
            "stats": [
                "2",
                "2",
                "2",
                "1",
                "2",
                "1",
                "1",
                "1",
                "1",
                "1"
            ],
            "skills": [
                "1",
                "0",
                "0",
                "1",
                "1",
                "0",
                "0",
                "1",
                "0",
                "0",
                "0",
                "1",
                ""
            ],
            "extraSkill": "",
            "derived": [
                "",
                "",
                "3",
                "3",
                "NaN / 1",
                "2",
                "2"
            ],
            "items": [
                "",
                ""
            ],
            "ribbons": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackInputs": [
                "Tackle",
                "4d6",
                "3d6",
                "Tail Whip",
                "",
                "Cute + Perform",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackTypes": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackEffects": [
                "undefined",
                "-1 de Def",
                "undefined",
                "undefined",
                "undefined",
                "undefined"
            ]
        },
        "2": {
            "personalInput": [
                "Ermac (Porygon Wireframe)",
                "Trace",
                "0",
                "Troca",
                "5",
                "4",
                "9",
                "2",
                "3",
                "1"
            ],
            "personalSelect": [
                "Porygon",
                "Zero",
                "Peculiar",
                "Normal",
                ""
            ],
            "stats": [
                "2",
                "1",
                "2",
                "2",
                "2",
                "1",
                "1",
                "1",
                "1",
                "1"
            ],
            "skills": [
                "1",
                "1",
                "0",
                "0",
                "0",
                "0",
                "0",
                "1",
                "1",
                "1",
                "0",
                "0",
                ""
            ],
            "extraSkill": "",
            "derived": [
                "",
                "",
                "1",
                "1",
                "2 / 2",
                "2",
                "2"
            ],
            "items": [
                "",
                ""
            ],
            "ribbons": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackInputs": [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackTypes": [
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            "attackEffects": [
                "undefined",
                "undefined",
                "undefined",
                "undefined",
                "undefined",
                "undefined"
            ]
        }
    },
    "currentPokemon": 1
};

function App() {
    const [uiState, setUIState] = useState({ ...DEFAULT_UI_STATE });
    useEffect(() => impureSetTheme(uiState.theme), [uiState.theme]);

    let save = { ...DEFAULT_APP_STATE };
    useEffect(() => {
        try {
            save = JSON.parse(localStorage.getItem('database'));
            save = loadSave(save);
        }
        catch (e) { ; }
    }, []);

    const [appState, setAppState] = useState(save);
    const currentMode = uiState.mode === "trainer" ?
        html`<${TrainerMode} state=${appState} setState=${setAppState} />` :
        html`<${PokemonMode} state=${appState} setState=${setAppState} />`;

    useEffect(() => {
        localStorage.setItem("database", JSON.stringify(appState));
    }, [appState]);

    return html`
        <button class="btn" onclick=${() => loadSave(old)}>teste</button>
        <${Navbar} state=${uiState} setState=${setUIState}/>
        ${currentMode}
		`;
}

render(
    html`<${App} />`,
    document.body
);