export const DEFAULT_IMAGE: string = "./ditto_anon.png";

export const NATURES = [
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

export const AGES = [
    { age: "Criança", statPoints: 0, socialPoints: 0 },
    { age: "Adolescente", statPoints: 2, socialPoints: 2 },
    { age: "Adulto", statPoints: 4, socialPoints: 4 },
    { age: "Idoso", statPoints: 3, socialPoints: 6 },
];

export const RANKS = [
    { rank: 'Zero', skillCeiling: 1, skillPoints: 5, statPoints: 0, socialPoints: 0, icon: './premierball.png' },
    { rank: 'Iniciante', skillCeiling: 2, skillPoints: 9, statPoints: 2, socialPoints: 2, icon: './pokeball.png' },
    { rank: 'Amador', skillCeiling: 3, skillPoints: 12, statPoints: 4, socialPoints: 4, icon: './greatball.png' },
    { rank: 'Ás', skillCeiling: 4, skillPoints: 13, statPoints: 6, socialPoints: 6, icon: './ultraball.png' },
    { rank: 'Profissional', skillCeiling: 5, skillPoints: 14, statPoints: 8, socialPoints: 8, icon: './cherishball.png' },
    { rank: 'Mestre', skillCeiling: 5, skillPoints: 15, statPoints: 10, socialPoints: 14, icon: './masterball.png' },
    { rank: 'Campeão', skillCeiling: 5, skillPoints: 16, statPoints: 14, socialPoints: 14, icon: './parkball.png' },
];