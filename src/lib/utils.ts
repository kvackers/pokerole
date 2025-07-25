import { AGES, NATURES, RANKS } from "./data";

type Rank = {
    rank: string;
    skillCeiling: number;
    skillPoints: number;
    statPoints: number;
    socialPoints: number;
    icon: string;
};

type Nature = {
    nature: string;
    maxConfidence: number;
};

type Age = {
    age: string;
    statPoints: number;
    socialPoints: number;
};

type Mode = 'sm' | 'md' | 'lg' | 'xl';

export const getRank = (rank: string): Rank => {
    return RANKS.filter(e => e.rank === rank)[0];
};

export const getNature = (nature: string): Nature => {
    return NATURES.filter(e => e.nature === nature)[0];
}

export const getAge = (age: string): Age => {
    return AGES.filter(e => e.age === age)[0];
}

export const getMode = (width: any): Mode => {
    if (width >= 1280) { return 'xl'; }
    if (width >= 960) { return 'lg'; }
    if (width > 640) { return 'md'; }
    return 'sm';
}