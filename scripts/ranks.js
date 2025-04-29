import { RANKS } from './data.js';

const playerRankSelect = document.getElementById('player-rank');
for (const { rank } of RANKS) {
    const option = document.createElement("option");
    option.value = rank;
    option.innerText = rank;

    playerRankSelect.appendChild(option);
}

playerRankSelect.onchange = () => {
    const selection = playerRankSelect.value;
    const index = RANKS.map(e => e.rank).indexOf(selection);
    const icon = index >= 0 ? RANKS[index].icon : '';
    document.getElementById('player-rank-icon').src = icon;

    const skillCeiling = index >= 0 ? RANKS[index].skillCeiling : 5;
    [...document.getElementsByClassName('max-skill')].forEach(e => e.innerText = `/ ${skillCeiling}`);

    const sumOfSkills = [...document.getElementsByClassName('skill')].map(e => e.value ? +e.value : 0).reduce((acc, e) => e + acc);
    const skillPoints = index >= 0 ? RANKS[index].skillPoints : 0;
    const spentPoints = skillPoints - sumOfSkills;
    document.getElementById('skill-points').innerText = `Pontos: ${spentPoints}`;
}

[...document.getElementsByClassName('skill')].forEach(elem => {
    elem.onchange = () => {
        const selection = playerRankSelect.value;
        const index = RANKS.map(e => e.rank).indexOf(selection);
        const sumOfSkills = [...document.getElementsByClassName('skill')].map(e => e.value ? +e.value : 0).reduce((acc, e) => e + acc);
        const skillPoints = index >= 0 ? RANKS[index].skillPoints : 0;
        const spentPoints = skillPoints - sumOfSkills;
        document.getElementById('skill-points').innerText = `Pontos: ${spentPoints}`;
    }
})