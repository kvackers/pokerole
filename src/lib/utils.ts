import { NATURES, RANKS } from "./data";

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

export const getRank = (rank: string): Rank => {
    return RANKS.filter(e => e.rank === rank)[0];
};

export const getNature = (nature: string): Nature => {
    return NATURES.filter(e => e.nature === nature)[0];
}