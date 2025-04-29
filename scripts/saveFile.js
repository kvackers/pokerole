export function initSheet() {
    if (!localStorage.getItem('trainer')) {
        saveTrainer();
    } else {
        loadTrainer();
    }

    if (!localStorage.getItem('pokemon')) {
        localStorage.setItem('currentPokemon', 0);
        savePokemon();
    } else {
        loadPokemon();
    }
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

    localStorage.setItem('trainer', JSON.stringify(trainer, null, 2));
}

export function loadTrainer(trainer) {
    const trainer = trainer || localStorage.getItem('trainer');

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
        elem.checked = trainer.achieved[idx];
    });

    document.getElementById('player-obs').value = trainer.notes;
}

export function savePokemon() {
    const pokemon = {
        id: localStorage.getItem('currentPokemon'),
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

    localStorage.setItem('pokemon', JSON.stringify(pokemon, null, 2));
}

export function loadPokemon(pokemon) {
    const pokemon = pokemon || localStorage.getItem('pokemon');

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