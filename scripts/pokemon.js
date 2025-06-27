import "https://esm.sh/preact@10.26.9/debug";
import { h } from 'https://esm.sh/preact@10.26.9';
import { useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';
import { POKEMON_STATS, POKEMON_SKILLS, TYPES, STATUS, VOLATILES, NATURES, RANKS, DEX } from "./data.js";

const html = htm.bind(h);

function getCurrentPokemon(state) {
    const { pokemon, pokemonId } = state;
    return pokemon[pokemonId];
}

function PokemonPersonal({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);

    const updateImage = url => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.image = url;

        setState({ ...state, pokemon });
    };

    const updateSpecies = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.species = event.target.value;

        const dexEntry = DEX[event.target.value];
        [dexEntry.baseSTR, dexEntry.baseDEX, dexEntry.baseVIT, dexEntry.baseSPC, dexEntry.baseINS].forEach((value, idx) => {
            currentPokemon.stats[idx] = +value;
        });

        currentPokemon.health = +dexEntry.baseHP + +dexEntry.baseVIT;
        currentPokemon.evoTime = dexEntry.evoTime;
        currentPokemon.types[0] = dexEntry.type1;
        currentPokemon.types[1] = dexEntry.type2 || '-';

        setState({ ...state, pokemon });
    };

    const updateNickname = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.nickname = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateAbility = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.ability = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateRank = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.rank = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateNature = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];

        const nature = event.target.value;
        currentPokemon.nature = nature;
        currentPokemon.confidence = NATURES.filter(e => e.nature === nature)[0].maxConfidence;

        setState({ ...state, pokemon });
    };

    const updateTypes = (event, id) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.types[id] = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateEvoTime = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.evoTime = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateWins = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.wins = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateTrainingSessions = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.trainingSessions = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateHealth = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.health = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateConfidence = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.confidence = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateWillPoints = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.willPoints = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateHappiness = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.happiness = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateLoyalty = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.loyalty = +event.target.value;

        setState({ ...state, pokemon });
    };

    const defaultURL = "assets/ditto_anon.png";
    const [flags, setFlags] = useState({ warning: state.trainer.image === defaultURL, error: false });

    const promptImageURL = () => {
        let url = prompt("Insira o link para a imagem, por favor:");
        if (url === null) { return; }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }

        updateImage(url);
        setFlags({ warning: false, error: false });
    };

    const onError = () => {
        updateImage(defaultURL);
        setFlags({ warning: false, error: true });
    };

    const rankIcon = RANKS.filter(e => e.rank === currentPokemon.rank)[0].icon;
    const maxConfidence = NATURES.filter(e => e.nature === currentPokemon.nature)[0].maxConfidence;
    const maxHealth = +DEX[currentPokemon.species].baseHP + +currentPokemon.stats[2];

    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    return html`
        <div class="mb-2">
            <img src="${currentPokemon.image}" class="mb-1" style="display: block"
                 onError=${onError}
                 onclick=${promptImageURL} />
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
            <span class="input-group-text w85px">Apelido</span>
            <input type="text" class="form-control"
                   value=${currentPokemon.nickname}
                   onChange=${updateNickname} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Espécie</span>
            <select class="form-select pokemon-select"
                    value=${currentPokemon.species}
                    onChange=${updateSpecies}>
                ${Object.keys(DEX).map(mon => html`<option value=${mon}>${capitalize(mon)}</option>`)}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Habilidade</span>
            <input type="text" class="form-control"
                   value=${currentPokemon.ability}
                   onChange=${updateAbility} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Rank</span>
            <select class="form-select"
                    value=${currentPokemon.rank}
                    onChange=${updateRank} >
                ${RANKS.map(({ rank }) => html`<option value=${rank}>${rank}</option>`)}
            </select>
            <span class="input-group-text">
                <img src=${rankIcon} />
            </span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Natureza</span>
            <select class="form-select"
                    value=${currentPokemon.nature}
                    onChange=${updateNature}>
                ${NATURES.map(({ nature }) => html`<option value=${nature}>${nature}</option>`)}
            </select>
        </div>
        <hr />
        
        <div class="input-group">
            <span class="input-group-text w85px">Tipos</span>
            <select class="form-select pokemon-select"
                    value=${currentPokemon.types[0]}
                    onChange=${event => updateTypes(event, 0)}>
                    ${TYPES.map(type => html`<option value=${type}>${type}</option>`)}
            </select>
            <select class="form-select pokemon-select"
                    value=${currentPokemon.types[1]}
                    onChange=${event => updateTypes(event, 1)}>>
                    ${TYPES.map(type => html`<option value=${type}>${type}</option>`)}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Evolução</span>
            <input type="text" class="form-control"
                   value=${currentPokemon.evoTime}
                   onChange=${updateEvoTime} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Vitórias</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.wins}
                   onChange=${updateWins} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Treinos</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.trainingSessions}
                   onChange=${updateTrainingSessions} />
        </div>
        <hr />
        
        <div class="input-group">
            <span class="input-group-text w85px">PV</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.health}
                   onChange=${updateHealth} />
            <span class="input-group-text w85px">/ ${maxHealth}</span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Confiança</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.confidence}
                   onChange=${updateConfidence} />
            <span class="input-group-text w85px">/ ${maxConfidence}</span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Vontade</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.willPoints}
                   onChange=${updateWillPoints} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Felicidade</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.happiness}
                   onChange=${updateHappiness} />
            <span class="input-group-text w85px">/ 5</span>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Lealdade</span>
            <input type="number" class="form-control"
                   value=${currentPokemon.loyalty}
                   onChange=${updateLoyalty}/>
            <span class="input-group-text w85px">/ 5</span>
        </div>`;
}

function PokemonStats({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);

    const updateStat = (event, id) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];

        // VIT updates HP
        if (id === 2) {
            currentPokemon.health += +event.target.value - currentPokemon.stats[id];
        } // INS updates Will
        else if (id === 4) {
            currentPokemon.willPoints += +event.target.value - currentPokemon.stats[id];
        }

        currentPokemon.stats[id] = +event.target.value;

        setState({ ...state, pokemon });
    };

    const get = (dict, key, orelse) => dict && dict[key] ? dict[key] : orelse;
    const dexEntry = DEX[currentPokemon.species];
    const statNames = ['STR', 'DEX', 'VIT', 'SPC', 'INS']
    const maxStats = statNames.map(stat => +get(dexEntry, 'max' + stat, 1)).concat(statNames.map(_ => 5));

    const statElems = POKEMON_STATS.map((stats, index) => {
        return stats.map((stat, subdIndex) => {
            const unrolledId = index * 5 + subdIndex;

            return html`
                    <div class="input-group">
                        <span class="input-group-text w105px">${stat}</span>
                        <input type="number" class="form-control"
                               value=${currentPokemon.stats[unrolledId]}
                               onChange=${event => updateStat(event, unrolledId)} />
                        <span class="input-group-text">/ ${maxStats[unrolledId]}</span>
                    </div>`;
        });
    });

    const rawStats = currentPokemon.stats;

    const stats = rawStats.slice(0, 5);
    const maxStatPoints = RANKS.filter(e => e.rank === currentPokemon.rank)[0].statPoints - 2;
    const spentStatsPoints = stats.reduce((acc, x) => acc + x) -
        statNames.map(stat => +get(dexEntry, 'base' + stat, 1)).reduce((acc, e) => acc + e);

    const social = rawStats.slice(5);
    const maxSocialPoints = RANKS.filter(e => e.rank === currentPokemon.rank)[0].socialPoints - 2;
    const spentSocialPoints = social.reduce((acc, x) => acc + x) - social.length;

    return html`
    <p>Pontos a gastar: ${maxStatPoints - spentStatsPoints}</p>
    ${statElems[0]}

    <hr />

    <p>Pontos a gastar: ${maxSocialPoints - spentSocialPoints}</p>
    ${statElems[1]}
    `;
}

function PokemonSkills({ state, setState }) {
    const updateSkills = (event, id) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.skills[id] = +event.target.value;

        setState({ ...state, pokemon });
    };

    const updateExtraSkillName = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.extraSkillName = event.target.value;

        setState({ ...state, pokemon });
    };

    const currentPokemon = getCurrentPokemon(state);

    const skillElems = Object.entries(POKEMON_SKILLS).map(([header, names], index) => {
        let elems;
        if (names) {
            const skillEntries = names.map((skill, subIndex) => {
                const unrolledIndex = index * 4 + subIndex;

                return html`
                        <div class="input-group">
                            <span class="input-group-text w105px">${skill}</span>
                            <input type="text" class="form-control" 
                                   value=${currentPokemon.skills[unrolledIndex]}
                                   onChange=${event => updateSkills(event, unrolledIndex)} />
                            <span class="input-group-text">/ ${1}</span>
                        </div>
                    `;
            });

            elems = html`
                    <h5 class="text-center">Perícias ${header}</h5>
                    <div class="mb-3">${skillEntries}</div>
                `;
        } else {
            const unrolledIndex = index * 4;
            return html`
                    <h5 class="text-center">Perícias ${header}</h5>
                    <div class="input-group">
                        <input type="text" class="input-group-text text-start w105px"
                                value=${currentPokemon.extraSkillName} 
                                onChange=${updateExtraSkillName} />
                        <input type="text" class="form-control" 
                                value=${currentPokemon.skills[unrolledIndex]}
                                onChange=${event => updateSkills(event, unrolledIndex)} />
                        <span class="input-group-text">/ ${1}</span>
                    </div>
                `;
        }

        return elems;
    });

    const maxSkillPoints = RANKS.filter(e => e.rank === currentPokemon.rank)[0].skillPoints;
    const spentSkillPoints = currentPokemon.skills.reduce((acc, x) => acc + x);

    return html`
        <p>Pontos a gastar: ${maxSkillPoints - spentSkillPoints}</p>
        
        ${skillElems}
        `;
}

function PokemonDerived({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);

    const updateStatus = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.status = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateVolatile = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.volatile = event.target.value;

        setState({ ...state, pokemon });
    };

    return html`
        <div class="input-group">
            <span class="input-group-text w85px">Status</span>
            <select class="form-select" value=${currentPokemon.status}
                    onChange=${updateStatus}>
                ${STATUS.map(status => html`<option value=${status}>${status}</status>`)}
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Volátil</span>
            <select class="form-select" value=${currentPokemon.volatile}
                    onChange=${updateVolatile}>
                ${VOLATILES.map(volatile => html`<option value=${volatile}>${volatile}</status>`)}
            </select>
        </div>
        <hr />

        <div class="input-group">
            <span class="input-group-text w85px">Iniciativa</span>
            <input type="text" class="form-control"
                   comment="Iniciativa = 1d6 + DES + Alerta"
                   value="1d6 + ${currentPokemon.stats[1] + currentPokemon.skills[4]}" />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Evasão</span>
            <input type="number" class="form-control"
                   comment="DES + Esquiva"
                   value=${currentPokemon.stats[1] + currentPokemon.skills[3]}/>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Revide</span>
            <input type="text" class="form-control"
                   comment="FOR + Revide / SPC + Revide"
                   value="${currentPokemon.stats[0] + currentPokemon.skills[2]} / ${currentPokemon.stats[3] + currentPokemon.skills[2]}"/>
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Defesa</span>
            <input type="number" class="form-control"
                   comment="VIT"
                   value=${currentPokemon.stats[2]} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Def. Esp.</span>
            <input type="number" class="form-control"
                   comment="INT"
                   value=${currentPokemon.stats[4]} />
        </div>`;
}

function PokemonItems({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);

    const updateItem = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.item = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateAccessory = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.accessory = event.target.value;

        setState({ ...state, pokemon });
    };

    const updateRibbon = (event, id) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.ribbons[id] = event.target.value;

        setState({ ...state, pokemon });
    };

    const ribbonElems = Array.from({ length: 3 }).map((_, id) => {
        const unrolledId = 2 * id;
        return html`
            <div class="mx-auto">
                <input type="text" class="form-control w49pc"
                       value=${currentPokemon.ribbons[unrolledId]}
                       onChange=${event => updateRibbon(event, unrolledId)} />
                <input type="text" class="form-control w49pc"
                       value=${currentPokemon.ribbons[unrolledId + 1]}
                       onChange=${event => updateRibbon(event, unrolledId + 1)} />
            </div>`;
    });



    return html`
        <div class="input-group">
            <span class="input-group-text w85px">Item</span>
            <input type="text" class="form-control" 
                   value=${currentPokemon.item}
                   onChange=${updateItem} />
        </div>
        <div class="input-group">
            <span class="input-group-text w85px">Acessório</span>
            <input type="text" class="form-control"
                   value=${currentPokemon.accessory}
                   onChange=${updateAccessory} />
        </div>
        
        <hr />
        <h5 class="text-center">Fitas</h5>
        <div class="d-flex flex-column">
            ${ribbonElems}
        </div>`;
}

function PokemonAttacks({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);
    const attacks = currentPokemon.attacks;

    const updateAttack = (event, id, key) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.attacks[id][key] = event.target.value;

        setState({ ...state, pokemon });
    }

    const attackElems = attacks.map((attack, id) => {
        const { name, type, damage, accuracy, notes } = attack;
        return html`
            <div class="input-group">
                <span class="input-group-text w85px">Ataque</span>
                <input type="text" class="form-control"
                       value=${name}
                       onChange=${event => updateAttack(event, id, "name")} />
            </div>
            <div class="input-group">
                <span class="input-group-text w85px">Tipo</span>
                <select class="form-select"
                        value=${type}
                        onChange=${event => updateAttack(event, id, "type")}>
                    ${TYPES.map(type => html`<option value=${type}>${type}</option>`)}
                </select>
            </div>
            <div class="input-group">
                <span class="input-group-text w85px">Dano</span>
                <input type="text" class="form-control"
                       value=${damage}
                       onChange=${event => updateAttack(event, id, "damage")} />
            </div>
            <div class="input-group">
                <span class="input-group-text w85px">Acurácia</span>
                <input type="text" class="form-control"
                       value=${accuracy}
                       onChange=${event => updateAttack(event, id, "accuracy")} />
            </div>
            <textarea class="form-control w100pc" rows="3"
                      value=${notes}
                      onChange=${event => updateAttack(event, id, "notes")}>
            </textarea>`;
    });

    return html`${attackElems.reduce(
        (acc, elem) => { acc.push(elem); return acc.concat(html`<hr />`); },
        []
    ).slice(0, attacks.length * 2 - 1)}`;
}

function PokemonNotes({ state, setState }) {
    const updateNotes = event => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.notes = event.target.value;

        setState({ ...state, pokemon });
    }

    return html`
        <textarea rows="20" class="w100pc" 
                  value=${getCurrentPokemon(state).notes} onChange=${updateNotes}>
        </textarea>`;
}

export function PokemonMode({ state, setState, display }) {
    return html`
            <div class="accordion" id="pkaparent">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pka1">
                        Dados Pessoais
                    </button>
                </h2>
                <div id="pka1" class="accordion-collapse collapse show" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                        <${PokemonPersonal} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka2">
                    Atributos
                </button>
                </h2>
                <div id="pka2" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                       <${PokemonStats} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka3">
                    Perícias
                </button>
                </h2>
                <div id="pka3" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                        <${PokemonSkills} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka7">
                    Derivados
                </button>
                </h2>
                <div id="pka7" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                        <${PokemonDerived} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka4">
                    Itens
                </button>
                </h2>
                <div id="pka4" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                        <${PokemonItems} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka5">
                    Ataques
                </button>
                </h2>
                <div id="pka5" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                       <${PokemonAttacks} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pka6">
                    Observações e Anotações
                </button>
                </h2>
                <div id="pka6" class="accordion-collapse collapse" data-bs-parent="#pkaparent">
                    <div class="accordion-body">
                        <${PokemonNotes} state=${state} setState=${setState} />
                    </div>
                </div>
            </div>
        </div>
        <button class="mt-2 btn btn-danger w100pc" onclick=${() => console.log(state.pokemon[0])}>Limpar Pokémon</button>
    `;
}