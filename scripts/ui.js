import { initPokemon } from "./createPokemon.js";
import { NATURES } from "./data.js";
import * as db from './db.js';

function updateMaxConfidence(selectId, maxConfidenceId) {
    document.getElementById(selectId).onchange = event => {
        const selection = event.target.value;
        const index = NATURES.map(e => e.nature).indexOf(selection);
        const maxConfidence = index >= 0 ? NATURES[index].maxConfidence : 0;
        document.getElementById(maxConfidenceId).innerText = `/ ${maxConfidence}`;
    }
}

function populateNatures(selectId) {
    const select = document.getElementById(selectId);
    for (const { nature } of NATURES) {
        const option = document.createElement("option");
        option.value = nature;
        option.innerText = nature;

        select.appendChild(option);
    }
}

function collectTrainer() {
    return {
        personalInput: [...document.querySelectorAll('#flush-collapseOne > .accordion-body > .mb-3 > input')].map(e => e.value),
        personalSelect: [...document.querySelectorAll('#flush-collapseOne > .accordion-body > .mb-3 > select')].map(e => e.value),
        stats: [...document.querySelectorAll('#flush-collapseTwo > .accordion-body > .mb-3 > input')].map(e => e.value),
        skills: [...document.querySelectorAll('#flush-collapseThree > .accordion-body > .mb-3 > input')].map(e => e.value),
        extraSkillNames: [...document.querySelectorAll('#flush-collapseThree > .accordion-body > .mb-3 > span[contentEditable="]')].map(e => e.value),
        dexPotions: [...document.querySelectorAll('#flush-collapseFour > .accordion-body > .mb-3 > input')].map(e => e.value),
        badgeBag: [...document.querySelectorAll('#flush-collapseFour > .accordion-body > .d-flex > .pb-1 > input')].map(e => e.value),
        achievements: [...document.querySelectorAll('#flush-collapseFive > .accordion-body > .d-flex > .pb-1 > input[type="text"]')].map(e => e.value),
        achieved: [...document.querySelectorAll('#flush-collapseFive > .accordion-body > .d-flex > .pb-1 > input[type="checkbox"]')].map(e => e.checked),
        notes: document.getElementById('player-obs').value
    };
}

function saveTrainer() {
    const trainer = collectTrainer();
    const database = db.editTrainer(trainer);
    loadDatabase(database);
}

function loadTrainer(trainer) {
    [...document.querySelectorAll('#flush-collapseOne > .accordion-body > .mb-3 > select')].forEach((elem, idx) => {
        elem.value = trainer.personalSelect[idx];
        elem.dispatchEvent(new Event('change'));
    });

    [...document.querySelectorAll('#flush-collapseOne > .accordion-body > .mb-3 > input')].forEach((elem, idx) => {
        elem.value = trainer.personalInput[idx];
    });

    [...document.querySelectorAll('#flush-collapseTwo > .accordion-body > .mb-3 > input')].forEach((elem, idx) => {
        elem.value = trainer.stats[idx];
    });

    [...document.querySelectorAll('#flush-collapseThree > .accordion-body > .mb-3 > input')].forEach((elem, idx) => {
        elem.value = trainer.skills[idx];
    });

    [...document.querySelectorAll('#flush-collapseThree > .accordion-body > .mb-3 > span[contentEditable="]')].forEach((elem, idx) => {
        elem.value = trainer.extraSkillNames[idx];
    });

    [...document.querySelectorAll('#flush-collapseFour > .accordion-body > .mb-3 > input')].forEach((elem, idx) => {
        elem.value = trainer.dexPotions[idx];
    });

    [...document.querySelectorAll('#flush-collapseFour > .accordion-body > .d-flex > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = trainer.badgeBag[idx];
    });

    [...document.querySelectorAll('#flush-collapseFive > .accordion-body > .d-flex > .pb-1 > input[type="text"]')].forEach((elem, idx) => {
        elem.value = trainer.achievements[idx];
    });

    [...document.querySelectorAll('#flush-collapseFive > .accordion-body > .d-flex > .pb-1 > input[type="checkbox"]')].forEach((elem, idx) => {
        elem.checked = !!trainer.achieved[idx];
    });

    document.getElementById('player-obs').value = trainer.notes;
}

function collectPokemon() {
    return {
        personalInput: [...document.querySelectorAll('#collapseOne > .accordion-body > .pb-1 > input')].map(e => e.value),
        personalSelect: [...document.querySelectorAll('#collapseOne > .accordion-body > .pb-1 > select')].map(e => e.value),
        stats: [...document.querySelectorAll('#collapseTwo > .accordion-body > .pb-1 > input')].map(e => e.value),
        skills: [...document.querySelectorAll('#collapseThree > .accordion-body > .pb-1 > input')].map(e => e.value),
        extraSkill: document.getElementById('pokemon-extra-skill').innerText,
        derived: [...document.querySelectorAll('#collapseFour > .accordion-body > .pb-1 > select')].map(e => e.value),
        items: [...document.querySelectorAll('#collapseFive > .accordion-body > .input-group > input')].map(e => e.value),
        ribbons: [...document.querySelectorAll('#collapseFive > .accordion-body > .d-flex > .pb-1 > input')].map(e => e.value),
        attackInputs: [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > input')].map(e => e.value),
        attackTypes: [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > select')].map(e => e.value),
        attackEffects: [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > textarea')].map(e => e.value)
    }
}

function savePokemon() {
    const pokemon = collectPokemon();
    const database = db.editPokemon(pokemon);
    loadDatabase(database);
}

function createPokemon() {
    savePokemon();
    const database = db.createPokemon();
    loadDatabase(database);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateDropdown(database) {
    const dropdown = document.getElementById('team-dropdown');

    const { currentPokemon, pokemon: team } = database;
    const children = [];
    const keys = Object.keys(team).sort();
    for (const id of keys) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = "#";

        const nickname = team[id].personalInput[0] || "???";

        const speciesRaw = team[id].personalSelect[0];
        const species = speciesRaw === '-' ? "Pokémon" : capitalize(speciesRaw);
        a.innerHTML = `<span class='d-none'>${id}</span>${nickname} - ${species}`;
        a.onclick = () => switchToPokemon(+id);
        if (id == currentPokemon) {
            a.classList.add('active');
        }

        li.appendChild(a);
        children.push(li);
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.href = "#";
    a.innerHTML = "Novo Pokémon";
    a.onclick = createPokemon;

    li.appendChild(a);
    children.push(li);

    dropdown.replaceChildren(...children);
}

function loadPokemon(pokemon) {
    [...document.querySelectorAll('#collapseOne > .accordion-body > .pb-1 > select')].forEach((elem, idx) => {
        elem.value = pokemon.personalSelect[idx];
        elem.dispatchEvent(new Event('change'));
    });

    [...document.querySelectorAll('#collapseOne > .accordion-body > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = pokemon.personalInput[idx];
    });

    [...document.querySelectorAll('#collapseTwo > .accordion-body > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = pokemon.stats[idx];
    });

    [...document.querySelectorAll('#collapseThree > .accordion-body > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = pokemon.skills[idx];
    });

    document.getElementById('pokemon-extra-skill').innerText = pokemon.extraSkill;

    [...document.querySelectorAll('#collapseFour > .accordion-body > .pb-1 > select')].forEach((elem, idx) => {
        elem.value = pokemon.derived[idx];
    });

    [...document.querySelectorAll('#collapseFive > .accordion-body > .input-group > input')].forEach((elem, idx) => {
        elem.value = pokemon.items[idx];
    });

    [...document.querySelectorAll('#collapseFive > .accordion-body > .d-flex > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = pokemon.ribbons[idx];
    });

    [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > input')].forEach((elem, idx) => {
        elem.value = pokemon.attackInputs[idx];
    });

    [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > select')].forEach((elem, idx) => {
        elem.value = pokemon.attackTypes[idx];
    });

    [...document.querySelectorAll('#collapseSix > .accordion-body > .pb-1 > textarea')].forEach((elem, idx) => {
        elem.value = pokemon.attackEffects[idx];
    });
}

function switchToPokemon(id) {
    const database = db.switchPokemon(id);
    loadDatabase(database);
}

function loadDatabase(db) {
    loadTrainer(db.trainer);

    const currentPokemon = db.currentPokemon;
    loadPokemon(db.pokemon[currentPokemon]);
    updateDropdown(db);
}

function initTrainer() {
    document.getElementById('player-vit').onchange = () => {
        const vitality = +document.getElementById('player-vit').value;
        document.getElementById('player-max-hp').innerText = `/ ${4 + vitality}`;
    }

    document.getElementById('player-ins').onchange = () => {
        const insight = +document.getElementById('player-ins').value;
        document.getElementById('player-will').value = 2 + insight;
    }

    populateNatures('player-nature');
    updateMaxConfidence('player-nature', 'player-max-confidence');

    document.getElementById('export-button').onclick = () => {
        const database = db.readDatabase();
        const serialized = JSON.stringify(database, null, 2);

        document.getElementById('export-area').value = serialized;
        navigator.clipboard.writeText(serialized);

        const alert = document.getElementById('export-alert');
        alert.classList.remove('d-none');
        setTimeout(() => alert.classList.add('d-none'), 2000);
    }

    document.getElementById('import-button').onclick = () => {
        try {
            const newDB = JSON.parse(document.getElementById('export-area').value);
            const database = db.importDatabase(newDB);

            loadDatabase(database);
        } catch (e) {
            console.log(e);
            const alert = document.getElementById('save-alert');
            alert.classList.remove('d-none');
            setTimeout(() => alert.classList.add('d-none'), 2000);
        }
    }

    document.getElementById('clear-sheet').onclick = () => {
        const consent = confirm('Essa ação vai deletar a ficha inteira. Deseja continuar?');
        if (!consent) { return; }

        const database = db.nukeDatabase();
        loadDatabase(database);
    }
}

function initSheet() {
    initTrainer();
    initPokemon();

    const database = db.readDatabase();
    loadDatabase(database);
}

/* Adding listeners */
const trainerModeButton = document.getElementById('trainer-mode-button');
const pokemonModeButton = document.getElementById('pokemon-mode-button');

trainerModeButton.onclick = () => {
    trainerModeButton.classList.toggle('d-none');
    pokemonModeButton.classList.toggle('d-none');

    document.getElementById('trainerModeAccordion').classList.toggle('d-none');
    document.getElementById('pokemonModeSection').classList.toggle('d-none');
}

pokemonModeButton.onclick = () => {
    trainerModeButton.classList.toggle('d-none');
    pokemonModeButton.classList.toggle('d-none');

    document.getElementById('trainerModeAccordion').classList.toggle('d-none');
    document.getElementById('pokemonModeSection').classList.toggle('d-none');
}

const darkModeButton = document.getElementById('dark-mode-button');
const lightModeButton = document.getElementById('light-mode-button');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('html').setAttribute("data-bs-theme", "dark");
    darkModeButton.classList.add('d-none');
} else {
    lightModeButton.classList.add('d-none');
}

darkModeButton.onclick = lightModeButton.onclick = () => {
    const html = document.querySelector('html');

    if (html.getAttribute('data-bs-theme') == 'dark') {
        html.setAttribute('data-bs-theme', '');
    } else {
        html.setAttribute('data-bs-theme', 'dark');
    }

    darkModeButton.classList.toggle('d-none');
    lightModeButton.classList.toggle('d-none');
}

document.getElementById('delete-pokemon-button').onclick = () => {
    const consent = confirm('Essa ação vai deletar o Pokémon atual. Deseja continuar?');
    if (!consent) { return; }

    const database = db.deletePokemon();
    loadDatabase(database);
}

document.getElementById('trainerModeAccordion').onchange = saveTrainer;
document.getElementById('pokemonModeSection').onchange = savePokemon;

initSheet();
console.log('Sheet initialized');