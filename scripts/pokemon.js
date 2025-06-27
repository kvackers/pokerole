import "https://esm.sh/preact@10.26.9/debug";
import { h } from 'https://esm.sh/preact@10.26.9';
import { useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';
import { POKEMON_STATS, POKEMON_SKILLS, TYPES, STATUS, VOLATILES } from "./data.js";

const html = htm.bind(h);

function getCurrentPokemon(state) {
    const { pokemon, pokemonId } = state;
    return pokemon[pokemonId];
}

function PokemonPersonal({ state, setState }) { }

function PokemonStats({ state, setState }) {
    const currentPokemon = getCurrentPokemon(state);

    const updateStat = (event, id) => {
        const { pokemon, pokemonId } = state;
        const currentPokemon = pokemon[pokemonId];
        currentPokemon.stats[id] = +event.target.value;

        setState({ ...state, pokemon });
    };

    const statElems = POKEMON_STATS.map((stats, index) => {
        return stats.map((stat, subdIndex) => {
            const unrolledId = index * 5 + subdIndex;

            return html`
                    <div class="input-group">
                        <span class="input-group-text w105px">${stat}</span>
                        <input type="number" class="form-control"
                               value=${currentPokemon.stats[unrolledId]}
                               onChange=${event => updateStat(event, unrolledId)} />
                        <span class="input-group-text">/ 5</span>
                    </div>`;
        });
    });

    return html`
    <p>Pontos a gastar: ${0}</p>
    ${statElems[0]}

    <hr />

    <p>Pontos a gastar: ${0}</p>
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

    /*const maxSkillPoints = currentRank.skillPoints;
    const spentSkillPoints = state.trainer.skills.reduce((acc, x) => acc + x);*/

    return html`
        <p>Pontos a gastar: ${0}</p>
        
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