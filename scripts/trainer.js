import "https://esm.sh/preact@10.26.9/debug";
import { h } from 'https://esm.sh/preact@10.26.9';
import { useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';

import { DEFAULT_APP_STATE } from './ui.js';
import { NATURES, RANKS, TRAINER_STATS, TRAINER_SKILLS } from "./data.js";
import { loadSave } from "./save.js";

const html = htm.bind(h);

function TrainerPersonal({ state, setState }) {
    const updateImage = image => {
        const trainer = { ...state.trainer, image };
        setState({ ...state, trainer })
    };

    const updateName = event => {
        const trainer = { ...state.trainer, name: event.target.value };
        setState({ ...state, trainer })
    };

    const updateConcept = event => {
        const trainer = { ...state.trainer, concept: event.target.value };
        setState({ ...state, trainer })
    };

    const updateMoney = event => {
        const trainer = { ...state.trainer, money: +event.target.value };
        setState({ ...state, trainer })
    };

    const updateHealth = event => {
        const trainer = { ...state.trainer, health: +event.target.value };
        setState({ ...state, trainer })
    };

    const updateConfidence = event => {
        const trainer = { ...state.trainer, confidence: +event.target.value };
        setState({ ...state, trainer })
    };

    const updateWillPoints = event => {
        const trainer = { ...state.trainer, willPoints: +event.target.value };
        setState({ ...state, trainer })
    };

    const getMaxConfidence = nature => NATURES.filter(e => e.nature === nature)[0].maxConfidence;

    const updateNature = event => {
        const nature = event.target.value;
        const trainer = { ...state.trainer, nature, confidence: getMaxConfidence(nature) };
        setState({ ...state, trainer })
    };

    const updateRank = event => {
        const trainer = { ...state.trainer, rank: event.target.value };
        setState({ ...state, trainer })
    };

    const promptImageURL = () => {
        let url = prompt("Insira o link para a imagem, por favor:");
        if (url === null) { return; }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }

        updateImage(url);
        setFlags({ warning: false, error: false });
    };

    const getRankIcon = rank => RANKS.filter(e => e.rank === rank)[0].icon;


    const defaultURL = "assets/ditto_anon.png";
    const [flags, setFlags] = useState({ warning: state.trainer.image === defaultURL, error: false });

    const onError = () => {
        updateImage(defaultURL);
        setFlags({ warning: false, error: true });
    };

    return html`
    <div class="mb-3">
        <div class="mb-2">
            <img src=${state.trainer.image} class="mb-1" style="display: block"
                 onclick=${promptImageURL}
                 onerror=${onError} />
            <div class="text-center alert alert-info ${flags.warning ? "" : "d-none"}"
                 onclick=${() => setFlags({ ...flags, warning: false })}>
                Para mudar a imagem, clique nela.<br />
                Clique aqui para deletar o aviso.
            </div>
            <div class="text-center alert alert-warning ${flags.error ? "" : "d-none"}"
                 onclick=${() => setFlags({ ...flags, error: false })}>
                O link não apontava para uma imagem, ou a ficha não tem permissão para vê-la.<br />
                Por favor, tente novamente com outro link.<br />
                Clique aqui para deletar o aviso.
            </div>
        </div>

        <div class="input-group">
            <span class="input-group-text w85px">Nome</span>
            <input type="text" class="form-control"
                value=${state.trainer.name}
                onChange=${updateName} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Conceito</span>
            <input type="text" class="form-control" 
                value=${state.trainer.concept}
                onChange=${updateConcept} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">₽</span>
            <input type="number" class="form-control"
                value=${state.trainer.money}
                onChange=${updateMoney} />
        </div>
    </div>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text w85px">Natureza</span>
            <select class="form-select"
                    value=${state.trainer.nature}
                    onChange=${updateNature}>
                ${NATURES.map(({ nature }) => html`<option value=${nature}>${nature}</option>`)}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Rank</span>
            <select class="form-select"
                    value=${state.trainer.rank}
                    onChange=${updateRank}>
                ${RANKS.map(({ rank }) => html`<option value=${rank}>${rank}</option>`)}
            </select>
            <span class="input-group-text">
                <img src=${getRankIcon(state.trainer.rank)} />
            </span>
        </div>
    </div>
    <div>
        <div class="input-group">
            <span class="input-group-text w85px">PV</span>
            <input type="number" class="form-control" 
                value=${state.trainer.health}
                onChange=${updateHealth} />
                <span class="input-group-text">/ ${+state.trainer.stats[2] + 4}</span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Confiança</span>
            <input type="number" class="form-control" 
                value=${state.trainer.confidence}
                onChange=${updateConfidence} />
                <span class="input-group-text">/ ${getMaxConfidence(state.trainer.nature)}</span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Vontade</span>
            <input type="number" class="form-control" 
                value=${state.trainer.willPoints}
                onChange=${updateWillPoints} />
        </div>
    </div>`;
}

function TrainerStats({ state, setState }) {
    const updateStats = (event, id) => {
        const stats = state.trainer.stats;
        stats[+id] = +event.target.value;

        /* Derived values */
        const insight = +stats[3];
        const vitality = +stats[2];

        const health = vitality + 4;
        const willPoints = insight + 2;

        const trainer = { ...state.trainer, stats, health, willPoints };
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
    });

    const rawStats = state.trainer.stats;

    const stats = rawStats.slice(0, 4);
    const maxStatPoints = RANKS.filter(e => e.rank === state.trainer.rank)[0].statPoints;
    const spentStatsPoints = stats.reduce((acc, x) => acc + x) - stats.length;

    const social = rawStats.slice(4);
    const maxSocialPoints = RANKS.filter(e => e.rank === state.trainer.rank)[0].socialPoints;
    const spentSocialPoints = social.reduce((acc, x) => acc + x) - social.length;

    return html`
    <p>Pontos a gastar: ${maxStatPoints - spentStatsPoints}</p>
    ${statElems[0]}

    <hr />

    <p>Pontos a gastar: ${maxSocialPoints - spentSocialPoints}</p>
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

    const currentRank = RANKS.filter(e => e.rank === state.trainer.rank)[0];

    const skillElems = Object.entries(TRAINER_SKILLS).map(([header, names], index) => {
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
                        <span class="input-group-text">/ ${currentRank.skillCeiling}</span>
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
                        <span class="input-group-text">/ ${currentRank.skillCeiling}</span>
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

    const maxSkillPoints = currentRank.skillPoints;
    const spentSkillPoints = state.trainer.skills.reduce((acc, x) => acc + x);

    return html`
    <p>Pontos a gastar: ${maxSkillPoints - spentSkillPoints}</p>
    
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
            const parsed = JSON.parse(text);
            const newState = loadSave(parsed);
            setState(newState);
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

export function TrainerMode({ state, setState, display }) {
    return html`
        <div class="accordion" id="tmaparent">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tma1">
                        Dados Pessoais
                    </button>
                </h2>
                <div id="tma1" class="accordion-collapse collapse show" data-bs-parent="#tmaparent">
                    <div class="accordion-body">
                        <${TrainerPersonal} state=${state} setState=${setState} />
                    </div>
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