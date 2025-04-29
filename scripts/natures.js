import { NATURES } from './data.js';

const playerNatureSelect = document.getElementById("player-nature");
for (const { nature } of NATURES) {
    const option = document.createElement("option");
    option.value = nature;
    option.innerText = nature;

    playerNatureSelect.appendChild(option);
}

playerNatureSelect.onchange = () => {
    const selection = playerNatureSelect.value;
    const index = NATURES.map(e => e.nature).indexOf(selection);
    const maxConfidence = index >= 0 ? NATURES[index].maxConfidence : 0;
    document.getElementById("player-max-confidence").innerText = `/ ${maxConfidence}`;
};