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

/* Updating PV and Will */
document.getElementById('player-vit').onchange = () => {
    const vitality = +document.getElementById('player-vit').value;
    document.getElementById('player-max-hp').innerText = `/ ${4 + vitality}`;
}

document.getElementById('player-ins').onchange = () => {
    const insight = +document.getElementById('player-ins').value;
    document.getElementById('player-will').value = 2 + insight;
}

const IDS = [
    "player-name",
    "player-concept",
    "player-nature",
    "player-rank",
    "player-money",
    "player-hp",
    "player-max-hp",
    "player-will",
    "player-confidence",
    "player-max-confidence",

    "player-str",
    "player-dex",
    "player-vit",
    "player-ins",

    "player-tough",
    "player-cool",
    "player-beauty",
    "player-clever",
    "player-cute",

    "player-brawl",
    "player-shoot",
    "player-dodge",
    "player-weapons",

    "player-empathy",
    "player-etiquette",
    "player-intimidate",
    "player-perform",

    "player-alert",
    "player-athletics",
    "player-nature",
    "player-stealth",

    "player-craft",
    "player-lore",
    "player-medicine",
    "player-science",

    "player-extra-skill1",
    "player-extra1",
    "player-extra-skill2",
    "player-extra2",
    "player-extra-skill3",
    "player-extra3",
    "player-extra-skill4",
    "player-extra4",

    "pokedex-seen",
    "pokedex-caught",

    "badge1",
    "badge2",
    "badge3",
    "badge4",
    "badge5",
    "badge6",
    "badge7",
    "badge8",

    "potion-unit",
    "potion-dose",

    "super-unit",
    "super-dose",

    "hyper-unit",
    "hyper-dose",

    "bag1",
    "bag-unit1",
    "bag2",
    "bag-unit2",
    "bag3",
    "bag-unit3",
    "bag4",
    "bag-unit4",
    "bag5",
    "bag-unit5",
    "bag6",
    "bag-unit6",
    "bag7",
    "bag-unit7",
    "bag8",
    "bag-unit8",
    "bag9",
    "bag-unit9",
    "bag10",
    "bag-unit10",

    "achieved1",
    "achievement1",
    "achieved2",
    "achievement2",
    "achieved3",
    "achievement3",
    "achieved4",
    "achievement4",
    "achieved5",
    "achievement5",

    "player-obs",
];

function collectSave() {
    const results = {};
    for (const id of IDS) {
        const elem = document.getElementById(id);
        if (elem.type === "checkbox") {
            results[id] = elem.checked ? true : '';
        } else {
            results[id] = elem.value || elem.innerText;
        }
    }

    console.log(results);
    return results;
}

document.getElementById('export-button').onclick = () => {
    document.getElementById('export-area').value = JSON.stringify(collectSave(), null, 2);
}

document.getElementById('import-button').onclick = () => {
    try {
        const data = JSON.parse(document.getElementById('export-area').value);

        for (const id of IDS) {
            if (!(id in data)) {
                throw new ReferenceError(`${id} not in save`);
            }

            const elem = document.getElementById(id);
            if (elem.type === "checkbox") {
                elem.checked = !!data[id];
            } else if (elem.tagName === 'INPUT') {
                elem.value = data[id];
            } else {
                elem.value = elem.innerText = data[id];
            }
        }
    } catch (e) {
        console.log(e);
        const alert = document.getElementById('save-alert');
        alert.classList.toggle('d-none');
        setTimeout(() => alert.classList.toggle('d-none'), 3000);
    }
}

document.getElementById('clear-sheet').onclick = () => {
    const confirmation = confirm("Continuar vai limpar todos os dados. Tem certeza que deseja prosseguir?");
    if (confirmation) {
        for (const id of IDS) {
            const elem = document.getElementById(id);
            if (elem.type === "checkbox") {
                elem.checked = false;
            } else if (elem.tagName === 'INPUT') {
                elem.value = '';
            } else {
                elem.value = elem.innerText = '';
            }
        }
    }
}