import "https://esm.sh/preact@10.26.9/debug";
import { h, render } from 'https://esm.sh/preact@10.26.9';
import { useEffect, useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';

import { impureSetTheme, DEFAULT_APP_STATE } from './ui2.js';

// Initialize htm with Preact
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

function TrainerMisc({ state, setState }) {
    const updateNotes = event => {
        const trainer = { ...state.trainer, notes: event.target.value };
        setState({ ...state, trainer })
    }

    const updateCheckbox = (event, id) => {
        const achieved = state.trainer.achieved;
        achieved[+id] = event.target.checked;

        const trainer = { ...state.trainer, achieved };
        setState({ ...state, trainer })
    };

    const updateAchievements = (event, id) => {
        const achievements = state.trainer.achievements;
        achievements[+id] = event.target.value;

        const trainer = { ...state.trainer, achievements };
        setState({ ...state, trainer })
    }

    const achievementElems = [0, 1, 2, 3, 4].map(id => {
        return html`
        <div class="w100pc pb-1 achievement-container">
            <input type="checkbox" class="form-check-input achievement-box" onclick=${event => updateCheckbox(event, id)} />
            <input type="text" class="form-control achievement-text"
                   value=${state.trainer.achievements[id]}
                   onChange=${event => updateAchievements(event, id)}/>
        </div>`
    })

    return html`
    <h5 class="text-center">Conquistas</h5>
    <div class="d-flex flex-column">
        ${achievementElems}
    </div>

    <hr />

    <h5 class="text-center">Observações e Anotações</h5>
    <textarea rows="20" class="w100pc" value=${state.trainer.notes} onChange=${updateNotes}></textarea>
    `;
}

function ExportImport({ state, setState }) {
    const [flags, setFlags] = useState({ error: false, success: false });
    const displayFlag = flag => flags[flag] ? "" : "d-none";

    const [text, setText] = useState('');
    const updateText = event => setText(event.target.value);

    const exportSheet = () => {
        setText(JSON.stringify(state, null, 2));
        setFlags({ error: false, success: true });
        setTimeout(() => setFlags({ ...flags, success: false }), 3000);
    }

    const importSheet = () => {
        try {
            /*TODO: impl later lol */
            throw new Error("unimpl");
        } catch (e) {
            console.log(e);
            setFlags({ error: true, success: false });
            setTimeout(() => setFlags({ ...flags, error: false }), 3000);
        }
    }

    const nukeSheet = () => {
        const consent = confirm("Ao concordar, todos os dados de treinador e Pokémon vão ser apagados.\n\nDeseja continuar?");
        if (consent) {
            setState({ ...DEFAULT_APP_STATE });
        }
    }

    return html`
        <button class="w49pc btn" onclick=${exportSheet}>Exportar Save</button>
        <button class="w49pc btn" onclick=${importSheet}>Importar Save</button>
        <p class="alert alert-warning ${displayFlag("error")}">
            Algo de errado aconteceu ao importar o save.
            Por favor, cheque o arquivo ou contate o administrador.
        </p>
        <p class="alert alert-success ${displayFlag("success")}">
            Exportação feita com sucesso. O save já deve estar carregado na sua área de transferência.
        </p>
        <textarea rows="20" class="w100pc" value=${text} onChange=${updateText}>
        </textarea>
        <button class="w100pc btn btn-danger" onclick=${nukeSheet}>Limpar Ficha</button>`;
}

function TrainerMode({ state, setState }) {
    return html`
    <div class="accordion" id="tmaparent">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tma1">
                    Dados Pessoais
                </button>
            </h2>
            <div id="tma1" class="accordion-collapse collapse show" data-bs-parent="#tmaparent">
                <div class="accordion-body">body</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma2">
                Atributos
            </button>
            </h2>
            <div id="tma2" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">body</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma3">
                Perícias
            </button>
            </h2>
            <div id="tma3" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">body</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma4">
                Bolsa
            </button>
            </h2>
            <div id="tma4" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">body</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma5">
                Misc.
            </button>
            </h2>
            <div id="tma5" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">
                    <${TrainerMisc} state=${state} setState=${setState}/>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma6">
                Exportar e Importar
            </button>
            </h2>
            <div id="tma6" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">
                    <${ExportImport} state=${state} setState=${setState}/>
                </div>
            </div>
        </div>
    </div>
`;
}

function App() {
    const [state, setState] = useState({ ...DEFAULT_APP_STATE });
    useEffect(() => impureSetTheme(state.theme), [state.theme]);

    return html`
        <${Navbar} state=${state} setState=${setState}/>
        <${TrainerMode} state=${state} setState=${setState}/>
		`;
}

render(
    html`<${App} />`,
    document.body
);