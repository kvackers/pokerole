import { initPokemon } from "./createPokemon.js";
import { initSheet } from "./saveFile.js";

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

/* Initializing sheet */
initPokemon();
initSheet();
console.log('Sheet initialized');