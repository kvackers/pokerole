const RANKS = [
    { rank: 'Zero', skillCeiling: 1, skillPoints: 5, icon: 'https://archives.bulbagarden.net/media/upload/5/55/Bag_Premier_Ball_Sprite.png' },
    { rank: 'Iniciante', skillCeiling: 2, skillPoints: 9, icon: 'https://archives.bulbagarden.net/media/upload/9/93/Bag_Pok%C3%A9_Ball_Sprite.png' },
    { rank: 'Amador', skillCeiling: 3, skillPoints: 12, icon: 'https://archives.bulbagarden.net/media/upload/c/ca/Bag_Great_Ball_Sprite.png' },
    { rank: 'Ás', skillCeiling: 4, skillPoints: 13, icon: 'https://archives.bulbagarden.net/media/upload/0/03/Bag_Ultra_Ball_Sprite.png' },
    { rank: 'Profissional', skillCeiling: 5, skillPoints: 14, icon: 'https://archives.bulbagarden.net/media/upload/f/ff/Bag_Cherish_Ball_Sprite.png' },
    { rank: 'Mestre', skillCeiling: 5, skillPoints: 14, icon: 'https://archives.bulbagarden.net/media/upload/6/6d/Bag_Master_Ball_Sprite.png' },
    { rank: 'Campeão', skillCeiling: 5, skillPoints: 15, icon: 'https://archives.bulbagarden.net/media/upload/b/b2/Bag_Park_Ball_Sprite.png' },
];

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