import { NATURES, RANKS, STATUS, VOLATILES, TYPES, DEX } from "./data.js";

function calculateSkillPoints() {
    const selection = document.getElementById('pokemon-rank').value;
    const index = RANKS.map(e => e.rank).indexOf(selection);

    const sumOfSkills = [...document.getElementsByClassName('pokemon-skill')].map(e => e.value ? +e.value : 0).reduce((acc, e) => e + acc);
    const skillPoints = index >= 0 ? RANKS[index].skillPoints : 0;
    return skillPoints - sumOfSkills;
}

function updateHP() {
    const selection = document.getElementById('pokemon-species').value.toLowerCase();
    if (!DEX[selection]) { return; }

    const baseHP = +document.getElementById('pokemon-vit').value;
    const maxHP = +DEX[selection].baseHP + baseHP;
    document.getElementById('pokemon-hp').value = maxHP;
    document.getElementById('pokemon-max-hp').innerText = `/ ${maxHP}`;
}

function initPokemon() {
    [...document.getElementsByClassName('nature-select')].forEach(select => {
        for (const { nature } of NATURES) {
            const option = document.createElement("option");
            option.value = nature;
            option.innerText = nature;

            select.appendChild(option);
        }
    });

    [...document.getElementsByClassName('rank-select')].forEach(select => {
        for (const { rank } of RANKS) {
            const option = document.createElement("option");
            option.value = rank;
            option.innerText = rank;

            select.appendChild(option);
        }
    });

    [...document.getElementsByClassName('pokemon-status-select')].forEach(select => {
        for (const status of STATUS) {
            const option = document.createElement("option");
            option.value = status;
            option.innerText = status;

            select.appendChild(option);
        }
    });

    [...document.getElementsByClassName('pokemon-volatile-select')].forEach(select => {
        for (const volatile of VOLATILES) {
            const option = document.createElement("option");
            option.value = volatile;
            option.innerText = volatile;

            select.appendChild(option);
        }
    });

    [...document.getElementsByClassName('pokemon-type-select')].forEach(select => {
        for (const type of TYPES) {
            const option = document.createElement("option");
            option.value = type;
            option.innerText = type;

            select.appendChild(option);
        }
    });

    [...document.getElementsByClassName('pokemon-species-select')].forEach(select => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        for (const pokemon in DEX) {
            const option = document.createElement("option");
            option.value = option.innerText = capitalizeFirstLetter(pokemon);

            select.appendChild(option);
        }
    });

    document.getElementById('pokemon-nature-select').onchange = event => {
        const selection = event.target.value;
        const index = NATURES.map(e => e.nature).indexOf(selection);
        const maxConfidence = index >= 0 ? NATURES[index].maxConfidence : 0;

        document.getElementById("pokemon-confidence").value = maxConfidence;
        document.getElementById("pokemon-max-confidence").innerText = `/ ${maxConfidence}`;
    }

    document.getElementById('pokemon-rank').onchange = event => {
        const selection = event.target.value;
        const index = RANKS.map(e => e.rank).indexOf(selection);

        const icon = index >= 0 ? RANKS[index].icon : '';
        document.getElementById('pokemon-rank-icon').src = icon;

        const skillCeiling = index >= 0 ? RANKS[index].skillCeiling : 5;
        [...document.getElementsByClassName('pokemon-max-skill')].forEach(e => e.innerText = `/ ${skillCeiling}`);

        document.getElementById('pokemon-skill-points').innerText = `Pontos: ${calculateSkillPoints()}`;
    };

    [...document.getElementsByClassName('pokemon-skill')].forEach(input => input.onchange = event => {
        document.getElementById('pokemon-skill-points').innerText = `Pontos: ${calculateSkillPoints()}`;
    });

    document.getElementById('pokemon-species').onchange = event => {
        const pokemon = event.target.value.toLowerCase();

        if (!DEX[pokemon]) { return; }

        document.getElementById('pokemon-type1').value = DEX[pokemon].type1;
        document.getElementById('pokemon-type2').value = DEX[pokemon].type2 || DEX[pokemon].type1;

        const attributes = ['STR', 'DEX', 'VIT', 'SPC', 'INS'];
        for (const attribute of attributes) {
            const lower = attribute.toLowerCase();

            document.getElementById('pokemon-' + lower).value = DEX[pokemon]['base' + attribute];
            document.getElementById('pokemon-max-' + lower).innerText = '/ ' + DEX[pokemon]['max' + attribute];
        }

        document.getElementById('pokemon-evo-time').value = DEX[pokemon].evoTime;
        updateHP();

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
        const dex = +event.target.value;

        document.getElementById('pokemon-initiative').value = +(document.getElementById('pokemon-alert').value || 0) + dex;
        document.getElementById('pokemon-evasion').value = +(document.getElementById('pokemon-dodge').value || 0) + dex;
    }

    document.getElementById('pokemon-alert').onchange = event => {
        const alert = +event.target.value;
        document.getElementById('pokemon-initiative').value = +document.getElementById('pokemon-dex').value + alert;
    }

    document.getElementById('pokemon-dodge').onchange = event => {
        const dodge = +event.target.value;
        document.getElementById('pokemon-evasion').value = +document.getElementById('pokemon-dex').value + dodge;
    }

    document.getElementById('pokemon-str').onchange = event => {
        const str = +event.target.value;
        const spc = +document.getElementById('pokemon-spc').value;
        const clash = +document.getElementById('pokemon-clash').value;

        document.getElementById('pokemon-clash2').value = `${str + clash} / ${spc + clash}`;
    };

    document.getElementById('pokemon-spc').onchange = event => {
        const str = +document.getElementById('pokemon-str').value;
        const spc = +event.target.value;
        const clash = +document.getElementById('pokemon-clash').value;

        document.getElementById('pokemon-clash2').value = `${str + clash} / ${spc + clash}`;
    };

    document.getElementById('pokemon-clash').onchange = event => {
        const str = +document.getElementById('pokemon-str').value;
        const spc = +document.getElementById('pokemon-spc').value;
        const clash = +event.target.value;

        document.getElementById('pokemon-clash2').value = `${str + clash} / ${spc + clash}`;
    };
}

initPokemon();