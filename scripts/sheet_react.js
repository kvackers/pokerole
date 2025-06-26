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

function TrainerBag({ state, setState }) {
    const updateDex = (event, id) => {
        const dex = state.trainer.dex;
        dex[+id] = +event.target.value;

        const trainer = { ...state.trainer, dex };
        setState({ ...state, trainer })
    }

    const updateBadge = (event, id) => {
        const badges = state.trainer.badges;
        badges[+id] = event.target.value;

        const trainer = { ...state.trainer, badges };
        setState({ ...state, trainer })
    }

    const updatePotions = (event, id) => {
        const potions = state.trainer.potions;
        potions[+id] = +event.target.value;

        const trainer = { ...state.trainer, potions };
        setState({ ...state, trainer })
    }

    const updateBag = (event, id) => {
        const bag = state.trainer.bag;
        bag[+id] = id % 2 == 0 ? event.target.value : +event.target.value;

        const trainer = { ...state.trainer, bag };
        setState({ ...state, trainer })
    }

    const badgeElements = [0, 1, 2, 3].map(row => {
        const unrolledId = row * 2;
        return html`
            <div class="mx-auto">
                <input type="text" class="form-control w49pc"
                       value=${state.trainer.badges[unrolledId]}
                       onChange=${event => updateBadge(event, unrolledId)} />
                <input type="text" class="form-control w49pc"
                       value=${state.trainer.badges[unrolledId + 1]}
                       onChange=${event => updateBadge(event, unrolledId + 1)} />
            </div>
        `;
    })

    const potionElements = ["Normal", "Super", "Hiper"].map((text, id) => {
        const unrolledId = id * 2;
        return html`
        <div class="input-group">
            <span class="input-group-text w85px">${text}</span>
            <input type="number" min=1 max=5 class="form-control"
                   value=${state.trainer.potions[unrolledId]}
                   onChange=${event => updatePotions(event, unrolledId)} />
            <span class="input-group-text">uds</span>
            <input type="number" class="form-control"
                   value=${state.trainer.potions[unrolledId + 1]}
                   onChange=${event => updatePotions(event, unrolledId + 1)} />
            <span class="input-group-text">/ 2</span>
        </div>`;
    });

    const bagElements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => {
        const unrolledId = id * 2;
        return html`
        <div class="mx-auto pb-1">
            <input type="text" class="form-control w80pc"
                   value=${state.trainer.bag[unrolledId]}
                   onChange=${event => updateBag(event, unrolledId)} />
            <input type="number" class="form-control w18pc"
                   value=${state.trainer.bag[unrolledId + 1]}
                   onChange=${event => updateBag(event, unrolledId + 1)} />
        </div>`;
    });

    return html`
        <h5 class="text-center">Pokédex</h5>
        <div class="input-group">
            <span class="input-group-text w105px">Vistos</span>
            <input type="number" min=0 class="form-control pokedex"
                   value=${state.trainer.dex[0]} onChange=${event => updateDex(event, 0)}/>
        </div>
        <div class="input-group">
            <span class="input-group-text w105px">Capturados</span>
            <input type="number" min=0 class="form-control pokedex"
                   value=${state.trainer.dex[1]} onChange=${event => updateDex(event, 1)}/>
        </div>

        <hr />

        <h5 class="text-center">Insígnias</h5>
        <div class="d-flex flex-column">
            ${badgeElements}
        </div>

        <hr />

        <h5 class="text-center">Poções</h5>
        ${potionElements}
        
        <hr />
        
        <h5 class="text-center">Bolsa</h5>
        <div class="d-flex flex-column">
            ${bagElements}
        </div>`;
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
        <div class="w100pc achievement-container">
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
                <div class="accordion-body">
                    <${TrainerBag} state=${state} setState=${setState} />
                </div>
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