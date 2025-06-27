import "https://esm.sh/preact@10.26.9/debug";
import { h } from 'https://esm.sh/preact@10.26.9';
import { useState } from 'https://esm.sh/preact@10.26.9/hooks';
import htm from 'https://esm.sh/htm@3.1.1';
import { TYPES } from "./data.js";

const html = htm.bind(h);

function getCurrentPokemon(state) {
    const { pokemon, pokemonId } = state;
    return pokemon[pokemonId];
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
                        b
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
                        c
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
                        d
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