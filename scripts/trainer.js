import "https://esm.sh/preact@10.26.9/debug";
import { h } from 'https://esm.sh/preact@10.26.9';
import { useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';

import { DEFAULT_APP_STATE } from './ui2.js';
import { TRAINER_STATS, SKILLS } from "./data.js";

const html = htm.bind(h);

function TrainerStats({ state, setState }) {
    const updateStats = (event, id) => {
        const stats = state.trainer.stats;
        stats[+id] = +event.target.value;

        const trainer = { ...state.trainer, stats };
        setState({ ...state, trainer })
    };

    const statElems = TRAINER_STATS.map((stats, index) => {
        return stats.map((stat, subdIndex) => {
            const unrolledId = index * 4 + subdIndex;

            return html`
                <div class="input-group">
                    <span class="input-group-text w105px">${stat}</span>
                    <input type="number" class="form-control"
                           value=${state.trainer.stats[unrolledId]}
                           onChange=${event => updateStats(event, unrolledId)} />
                    <span class="input-group-text">/ 5</span>
                </div>`;
        });
    })

    return html`
    <p>Pontos a gastar: ${0}</p>
    
    ${statElems[0]}
    <hr />

    ${statElems[1]}
    `;
}

function TrainerSkills({ state, setState }) {
    const updateSkills = (event, id) => {
        const skills = state.trainer.skills;
        skills[+id] = +event.target.value;

        const trainer = { ...state.trainer, skills };
        setState({ ...state, trainer })
    };

    const updateExtraSkillNames = (event, id) => {
        const extraSkillNames = state.trainer.extraSkillNames;
        extraSkillNames[+id] = event.target.value;

        const trainer = { ...state.trainer, extraSkillNames };
        setState({ ...state, trainer })
    };

    const skillElems = Object.entries(SKILLS).map(([header, names], index) => {
        let elems;
        if (names) {
            const skillEntries = names.map((skill, subIndex) => {
                const unrolledIndex = index * 4 + subIndex;

                return html`
                    <div class="input-group">
                        <span class="input-group-text w105px">${skill}</span>
                        <input type="text" class="form-control" 
                               value=${state.trainer.skills[unrolledIndex]}
                               onChange=${event => updateSkills(event, unrolledIndex)} />
                        <span class="input-group-text">/ 1</span>
                    </div>
                `;
            });

            elems = html`
                <h5 class="text-center">Perícias ${header}</h5>
                <div class="mb-3">${skillEntries}</div>
            `;
        } else {
            const skillEntries = [16, 17, 18, 19].map((globalIndex, arrayIndex) => {
                return html`
                    <div class="input-group">
                        <input type="text" class="input-group-text text-start w105px"
                               value=${state.trainer.extraSkillNames[arrayIndex]} 
                               onChange=${event => updateExtraSkillNames(event, arrayIndex)} />
                        <input type="text" class="form-control" 
                               value=${state.trainer.skills[globalIndex]}
                               onChange=${event => updateSkills(event, globalIndex)} />
                        <span class="input-group-text">/ 1</span>
                    </div>
                `;
            });

            elems = html`
                <h5 class="text-center">Perícias ${header}</h5>
                <div class="mb-3">${skillEntries}</div>
            `;
        }

        return elems;
    });

    return html`
    <p>Pontos a gastar: ${0}</p>
    
    ${skillElems}
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
        <div class="mx-auto">
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

export function TrainerMode({ state, setState }) {
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
                <div class="accordion-body">
                    <${TrainerStats} state=${state} setState=${setState} />
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tma3">
                Perícias
            </button>
            </h2>
            <div id="tma3" class="accordion-collapse collapse" data-bs-parent="#tmaparent">
                <div class="accordion-body">
                    <${TrainerSkills} state=${state} setState=${setState} />
                </div>
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