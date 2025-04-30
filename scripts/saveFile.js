function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* TODO:
   - Reavaliar initSheet
*/

export function initSheet() {
    if (!localStorage.getItem('trainer')) {
        saveTrainer();
    } else {
        loadTrainer();
    }

    if (!localStorage.getItem('pokemon')) {
        localStorage.setItem('currentPokemon', 0);
        localStorage.setItem('pokemon', '[]');
        savePokemon();
    } else {
        loadPokemon();
    }

    const team = JSON.parse(localStorage.getItem('pokemon'));

    const dropdown = document.getElementById('team-dropdown');
    const createButtonRef = document.getElementById('create-pokemon-button-ref');
    for (const pokemon of team) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = "#";

        const nickname = pokemon.personalInput[0] || "???";
        const species = pokemon.personalSelect[0] === '-' ? "Pokémon" : capitalize(pokemon.personalSelect[0]);
        a.innerHTML = `<span class='d-none'>${pokemon.id}</span>${nickname} - ${species}`;
        a.onclick = () => loadPokemon(+pokemon.id);

        li.appendChild(a);
        dropdown.insertBefore(li, createButtonRef);
    }

    document.getElementById('create-pokemon-button').onclick = addPokemon;
}

export function saveTrainer() {
    const trainer = {
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

    localStorage.setItem('trainer', JSON.stringify(trainer, null, 0));
}

export function resetTrainer() {
    const trainer = {
        personalInput: ["", "", "", "", "", ""],
        personalSelect: ["-", "-"],
        stats: ["1", "1", "1", "1", "1", "1", "1", "1", "1"],
        skills: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        extraSkillNames: [],
        dexPotions: ["", "", "", "2", "", "4", "", "14"],
        badgeBag: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        achievements: ["", "", "", "", ""],
        achieved: [false, false, false, false, false],
        notes: ""
    };

    localStorage.setItem('trainer', JSON.stringify(trainer, null, 0));
};

export function loadTrainer(trainr) {
    const trainer = JSON.parse(trainr || localStorage.getItem('trainer'));

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

export function savePokemon() {
    const id = localStorage.getItem('currentPokemon');

    const pokemon = {
        id,
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

    const team = JSON.parse(localStorage.getItem('pokemon'));
    team.push(pokemon);

    localStorage.setItem('pokemon', JSON.stringify(team, null, 0));

    const nickname = pokemon.personalInput[0] || "???";
    const species = pokemon.personalSelect[0] === '-' ? "Pokémon" : capitalize(pokemon.personalSelect[0]);
    [...document.querySelectorAll('#team-dropdown > li > a > span.d-none')].forEach(elem => {
        if (elem.innerText == id) {
            const a = elem.parentNode;
            a.innerHTML = `<span class='d-none'>${id}</span>${nickname} - ${species}`;
        }
    });
}

export function resetPokemon(id) {
    const effectiveId = id || localStorage.getItem('currentPokemon') || 0;
    const pokemon = {
        id: effectiveId,
        personalInput: ["", "", "", "", "", "", "", "", ""],
        personalSelect: ["-", "-", "-", "", ""],
        stats: ["", "", "", "", "", "1", "1", "1", "1", "1"],
        skills: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        extraSkill: "",
        derived: ["", ""],
        items: ["", ""],
        ribbons: ["", "", "", "", "", ""],
        attackInputs: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        attackTypes: ["", "", "", "", "", ""],
        attackEffects: []
    };

    localStorage.setItem('currentPokemon', effectiveId);
    const team = JSON.parse(localStorage.getItem('pokemon'));
    let dict = team.filter(e => e.id == effectiveId)[0];
    dict = pokemon;

    localStorage.setItem('pokemon', JSON.stringify(team, null, 0));
    loadPokemon();
}

export function loadPokemon(id) {
    const team = localStorage.getItem('pokemon');
    const effectiveId = +id || +localStorage.getItem('currentPokemon');
    const pokemon = JSON.parse(team).filter(e => +e.id === effectiveId)[0];

    localStorage.setItem('currentPokemon', pokemon.id);

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

export function addPokemon() {
    savePokemon();

    const team = JSON.parse(localStorage.getItem('pokemon'));
    const maxID = team.map(e => +e.id).reduce((acc, e) => Math.max(acc, e));

    localStorage.setItem('currentPokemon', maxID + 1);
    resetPokemon(maxID + 1);

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.href = "#";
    a.innerHTML = `<span class='d-none'>${maxID + 1}</span>??? - Pokémon`;
    a.onclick = () => loadPokemon(maxID + 1);

    li.appendChild(a);

    const dropdown = document.getElementById('team-dropdown');
    const createButtonRef = document.getElementById('create-pokemon-button-ref');
    dropdown.insertBefore(li, createButtonRef);
}