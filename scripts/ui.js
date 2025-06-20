import { NATURES, RANKS, DEX, STATUS, VOLATILES, TYPES } from "./data.js";
import * as db from './db.js';


function updateHP() {
    const selection = document.getElementById('pokemon-species').value.toLowerCase();
    if (!DEX[selection]) { return; }

    const baseHP = +document.getElementById('pokemon-vit').value;
    const maxHP = +DEX[selection].baseHP + baseHP;
    document.getElementById('pokemon-hp').value = maxHP;
    document.getElementById('pokemon-max-hp').innerText = `/ ${maxHP}`;
}

function updateMaxConfidence(selectId, maxConfidenceId) {
    document.getElementById(selectId).onchange = event => {
        const selection = event.target.value;
        const index = NATURES.map(e => e.nature).indexOf(selection);
        const maxConfidence = index >= 0 ? NATURES[index].maxConfidence : 0;
        document.getElementById(maxConfidenceId).innerText = `/ ${maxConfidence}`;
    }
}

function populateSelect(selectQuery, population, mapper = x => x) {
    [...document.querySelectorAll(selectQuery)].forEach(select => {
        for (const val of population) {
            const option = document.createElement("option");
            option.value = mapper(val);
            option.innerText = mapper(val);

            select.appendChild(option);
        }
    });
}

function calculateSpentPoints(rankId, budgetId, skillClass) {
    const selection = document.getElementById(rankId).value;
    const index = RANKS.map(e => e.rank).indexOf(selection);

    const sumOfSkills = [...document.getElementsByClassName(skillClass)].map(e => e.value ? +e.value : 0).reduce((acc, e) => e + acc);
    const skillPoints = index >= 0 ? RANKS[index].skillPoints : 0;

    document.getElementById(budgetId).innerText = `Pontos: ${skillPoints - sumOfSkills}`;
}

function addRankUpdaters(rankId, budgetId, maxSkillClass, skillClass) {
    const rank = document.getElementById(rankId);

    rank.addEventListener('change', event => {
        const selection = event.target.value;
        const index = RANKS.map(e => e.rank).indexOf(selection);

        const { icon, skillCeiling } = index >= 0 ? RANKS[index] : { icon: '', skillCeiling: 5 };
        document.getElementById(rankId + '-icon').src = icon;
        [...document.getElementsByClassName(maxSkillClass)].forEach(e => e.innerText = `/ ${skillCeiling}`);
    });

    [rank, ...document.getElementsByClassName(skillClass)].forEach(elem => {
        elem.addEventListener('change', () => calculateSpentPoints(rankId, budgetId, skillClass))
    });
}

function collectTrainer() {
    return {
        personalInput: [...document.querySelectorAll('.player-input')].map(e => e.value),
        personalSelect: [...document.querySelectorAll('.player-select')].map(e => e.value),
        stats: [...document.querySelectorAll('.stat')].map(e => e.value),
        skills: [...document.querySelectorAll('.skill')].map(e => e.value),
        extraSkillNames: [...document.querySelectorAll('.player-extra-skill')].map(e => e.innerText),
        dexPotions: [...document.querySelectorAll('.pokedex, .potion, .potion-dose')].map(e => e.value),
        badgeBag: [...document.querySelectorAll('.badge, .bag, .bag-unit')].map(e => e.value),
        achievements: [...document.querySelectorAll('.achievement-text')].map(e => e.value),
        achieved: [...document.querySelectorAll('.achievement-box')].map(e => e.checked),
        notes: document.getElementById('player-obs').value
    };
}

function saveTrainer() {
    const trainer = collectTrainer();
    const database = db.editTrainer(trainer);
    loadDatabase(database);
}

function loadTrainer(trainer) {
    [...document.querySelectorAll('.player-select')].forEach((elem, idx) => {
        elem.value = trainer.personalSelect[idx];
        elem.dispatchEvent(new Event('change'));
    });

    [...document.querySelectorAll('.player-input')].forEach((elem, idx) => {
        elem.value = trainer.personalInput[idx];
    });

    [...document.querySelectorAll('.stat')].forEach((elem, idx) => {
        elem.value = trainer.stats[idx];
    });

    [...document.querySelectorAll('.skill')].forEach((elem, idx) => {
        elem.value = trainer.skills[idx];
    });

    [...document.querySelectorAll('.player-extra-skill')].forEach((elem, idx) => {
        elem.innerText = trainer.extraSkillNames[idx];
    });

    [...document.querySelectorAll('.pokedex, .potion, .potion-dose')].forEach((elem, idx) => {
        elem.value = trainer.dexPotions[idx];
    });

    [...document.querySelectorAll('.badge, .bag, .bag-unit')].forEach((elem, idx) => {
        elem.value = trainer.badgeBag[idx];
    });

    [...document.querySelectorAll('.achievement-text')].forEach((elem, idx) => {
        elem.value = trainer.achievements[idx];
    });

    [...document.querySelectorAll('.achievement-box')].forEach((elem, idx) => {
        elem.checked = !!trainer.achieved[idx];
    });

    document.getElementById('player-obs').value = trainer.notes;
}

function collectPokemon() {
    return {
        personalInput: [...document.querySelectorAll('.pokemon-input')].map(e => e.value),
        personalSelect: [...document.querySelectorAll('.pokemon-select')].map(e => e.value),
        stats: [...document.querySelectorAll('.pokemon-stat')].map(e => e.value),
        skills: [...document.querySelectorAll('.pokemon-skill')].map(e => e.value),
        extraSkill: document.getElementById('pokemon-extra-skill').innerText,
        derived: [...document.querySelectorAll('.pokemon-derived')].map(e => e.value),
        items: [...document.querySelectorAll('.pokemon-items')].map(e => e.value),
        ribbons: [...document.querySelectorAll('.ribbon')].map(e => e.value),
        attackInputs: [...document.querySelectorAll('.atk-inputs')].map(e => e.value),
        attackTypes: [...document.querySelectorAll('.atk-types')].map(e => e.value),
        attackEffects: [...document.querySelectorAll('.atk-effects')].map(e => e.value)
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
    [...document.querySelectorAll('.pokemon-select')].forEach((elem, idx) => {
        elem.value = pokemon.personalSelect[idx];
        elem.dispatchEvent(new Event('change'));
    });

    [...document.querySelectorAll('.pokemon-input')].forEach((elem, idx) => {
        elem.value = pokemon.personalInput[idx];
    });

    [...document.querySelectorAll('.pokemon-stat')].forEach((elem, idx) => {
        elem.value = pokemon.stats[idx];
    });

    [...document.querySelectorAll('.pokemon-skill')].forEach((elem, idx) => {
        elem.value = pokemon.skills[idx];
    });

    document.getElementById('pokemon-extra-skill').innerText = pokemon.extraSkill;

    [...document.querySelectorAll('.pokemon-derived')].forEach((elem, idx) => {
        elem.value = pokemon.derived[idx];
    });

    [...document.querySelectorAll('.pokemon-items')].forEach((elem, idx) => {
        elem.value = pokemon.items[idx];
    });

    [...document.querySelectorAll('.ribbon')].forEach((elem, idx) => {
        elem.value = pokemon.ribbons[idx];
    });

    [...document.querySelectorAll('.atk-inputs')].forEach((elem, idx) => {
        elem.value = pokemon.attackInputs[idx];
    });

    [...document.querySelectorAll('.atk-types')].forEach((elem, idx) => {
        elem.value = pokemon.attackTypes[idx];
    });

    [...document.querySelectorAll('.atk-effects')].forEach((elem, idx) => {
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

function orelse(number, value = 0) {
    return +(isNaN(+number) ? value : number) || 0;
}

function initUI() {
    const trainerModeButton = document.getElementById('trainer-mode-button');
    const pokemonModeButton = document.getElementById('pokemon-mode-button');

    const trainerSection = document.getElementById('trainerModeAccordion');
    const pokemonSection = document.getElementById('pokemonModeSection');

    trainerModeButton.onclick = pokemonModeButton.onclick = () => {
        trainerModeButton.classList.toggle('d-none');
        pokemonModeButton.classList.toggle('d-none');

        trainerSection.classList.toggle('d-none');
        pokemonSection.classList.toggle('d-none');
    };

    const html = document.querySelector('html');
    const darkModeButton = document.getElementById('dark-mode-button');
    const lightModeButton = document.getElementById('light-mode-button');

    darkModeButton.onclick = lightModeButton.onclick = () => {
        html.setAttribute(
            'data-bs-theme',
            html.getAttribute('data-bs-theme') == 'dark' ? '' : 'dark'
        );

        darkModeButton.classList.toggle('d-none');
        lightModeButton.classList.toggle('d-none');
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute("data-bs-theme", "dark");
        darkModeButton.classList.add('d-none');
    } else {
        lightModeButton.classList.add('d-none');
    }

    trainerSection.onchange = saveTrainer;
    [...document.querySelectorAll('.player-extra-skill')].forEach(elem => {
        elem.onblur = saveTrainer;
        elem.oninput = saveTrainer;
    });

    pokemonSection.onchange = savePokemon;
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

    populateSelect('#player-nature', NATURES, obj => obj.nature);
    updateMaxConfidence('player-nature', 'player-max-confidence');

    populateSelect('#player-rank', RANKS, obj => obj.rank);
    addRankUpdaters('player-rank', 'skill-points', 'max-skill', 'skill');

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

function initPokemon() {
    populateSelect('#pokemon-nature-select', NATURES, obj => obj.nature);
    updateMaxConfidence('pokemon-nature-select', 'pokemon-max-confidence');

    populateSelect('#pokemon-rank', RANKS, obj => obj.rank);
    addRankUpdaters('pokemon-rank', 'pokemon-skill-points', 'pokemon-max-skill', 'pokemon-skill');

    populateSelect('#pokemon-status', STATUS);
    populateSelect('#pokemon-volatile', VOLATILES);
    populateSelect('.pokemon-type-select', TYPES);
    populateSelect('#pokemon-species', Object.keys(DEX), capitalize);

    document.getElementById('pokemon-species').onchange = event => {
        const pokemon = event.target.value.toLowerCase();

        if (!DEX[pokemon]) { return; }

        const types = [DEX[pokemon].type1, DEX[pokemon].type2 || '-'];
        [...document.getElementsByClassName('pokemon-type-select')].slice(0, 2).forEach((elem, idx) => {
            elem.value = types[idx];
        });

        const attributes = ['STR', 'DEX', 'VIT', 'SPC', 'INS'];
        for (const attribute of attributes) {
            const lower = attribute.toLowerCase();

            document.getElementById('pokemon-' + lower).value = DEX[pokemon]['base' + attribute];
            document.getElementById('pokemon-max-' + lower).innerText = '/ ' + DEX[pokemon]['max' + attribute];
        }
        updateHP();

        document.getElementById('pokemon-evo-time').value = DEX[pokemon].evoTime;
        document.getElementById('pokemon-defense').value = DEX[pokemon].baseVIT;
        document.getElementById('pokemon-spdef').value = DEX[pokemon].baseINS;
        document.getElementById('pokemon-will').value = +DEX[pokemon].baseINS + 2;

        const dex = +DEX[pokemon].baseDEX;
        document.getElementById('pokemon-initiative').value = +(document.getElementById('pokemon-alert').value || 0) + dex;
        document.getElementById('pokemon-evasion').value = +(document.getElementById('pokemon-dodge').value || 0) + dex;

        const str = +DEX[pokemon].baseSTR;
        const spc = +DEX[pokemon].baseSPC;
        const clash = +document.getElementById('pokemon-clash').value;

        document.getElementById('pokemon-clash2').value = `${str + clash} / ${spc + clash}`;
    };

    document.getElementById('pokemon-vit').onchange = event => {
        updateHP();
        document.getElementById('pokemon-defense').value = +event.target.value;
    }

    document.getElementById('pokemon-ins').onchange = event => {
        document.getElementById('pokemon-spdef').value = +event.target.value;
        document.getElementById('pokemon-will').value = +event.target.value + 2;
    }

    document.getElementById('pokemon-dex').onchange = event => {
        let dex = orelse(+event.target.value);

        document.getElementById('pokemon-initiative').value = orelse(document.getElementById('pokemon-alert').value) + dex;
        document.getElementById('pokemon-evasion').value = orelse(document.getElementById('pokemon-dodge').value) + dex;
    }

    document.getElementById('pokemon-alert').onchange = event => {
        let alert = orelse(event.target.value);

        document.getElementById('pokemon-initiative').value = orelse(document.getElementById('pokemon-dex').value) + alert;
    }

    document.getElementById('pokemon-dodge').onchange = event => {
        const dodge = orelse(event.target.value);
        document.getElementById('pokemon-evasion').value = orelse(document.getElementById('pokemon-dex').value) + dodge;
    }

    [document.getElementById('pokemon-str'), document.getElementById('pokemon-spc'), document.getElementById('pokemon-clash')]
        .forEach(elem => elem.addEventListener('change', () => {
            const str = orelse(document.getElementById('pokemon-str').value);
            const spc = orelse(document.getElementById('pokemon-spc').value);
            const clash = orelse(document.getElementById('pokemon-clash').value);

            document.getElementById('pokemon-clash2').value = `${str + clash} / ${spc + clash}`;
        }));

    document.getElementById('delete-pokemon-button').onclick = () => {
        const consent = confirm('Essa ação vai deletar o Pokémon atual. Deseja continuar?');
        if (!consent) { return; }

        const database = db.deletePokemon();
        loadDatabase(database);
    }
}

function initSheet() {
    initUI();
    initTrainer();
    initPokemon();

    const database = db.readDatabase();
    loadDatabase(database);
}

initSheet();
console.log('Sheet initialized');