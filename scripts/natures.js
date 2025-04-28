const NATURES = [
    { nature: "Firme", maxConfidence: 4 },
    { nature: "Tímida", maxConfidence: 6 },
    { nature: "Audaciosa", maxConfidence: 9 },
    { nature: "Valente", maxConfidence: 9 },
    { nature: "Calma", maxConfidence: 8 },
    { nature: "Cuidadosa", maxConfidence: 5 },
    { nature: "Dócil", maxConfidence: 7 },
    { nature: "Gentil", maxConfidence: 10 },
    { nature: "Esforçada", maxConfidence: 9 },
    { nature: "Agitada", maxConfidence: 7 },
    { nature: "Rebelde", maxConfidence: 7 },
    { nature: "Alegre", maxConfidence: 10 },
    { nature: "Negligente", maxConfidence: 8 },
    { nature: "Carente", maxConfidence: 5 },
    { nature: "Tranquila", maxConfidence: 8 },
    { nature: "Modesta", maxConfidence: 10 },
    { nature: "Ingênua", maxConfidence: 7 },
    { nature: "Sapeca", maxConfidence: 6 },
    { nature: "Quieta", maxConfidence: 5 },
    { nature: "Peculiar", maxConfidence: 9 },
    { nature: "Rabugenta", maxConfidence: 6 },
    { nature: "Relaxada", maxConfidence: 8 },
    { nature: "Atrevida", maxConfidence: 7 },
    { nature: "Séria", maxConfidence: 4 },
    { nature: "Isolada", maxConfidence: 4 },
];

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