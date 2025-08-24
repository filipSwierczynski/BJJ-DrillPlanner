export interface Technique {
    id: string;
    title: string;
    positions: string[];
    tags: string[];
    difficulty: 1|2|3|4|5;
    videoUrl?: string;
    notes?: string;

    createdAt: number;
    updatedAt:number;
    lastReviewedAt?: number;
    nextDueAt?: number;
    ease: number;
    intervalDay?:number; // how many days till next review
    reviews: number; // number of reviews;
}

export interface DrillItem {
    techniqueId: string;
    rounds: number;
    secondsPerRound: number;
}

export interface DrillSession {
    id: string;
    createdAt: number;
    items: DrillItem[];
    activeIndex: number;
    status: 'idle' | 'running' | 'paused' | 'finished';
    remainingSec: number;
    roundIndex: number;
}

export type ReviewOutcome = 'good' | 'struggled' | 'forgot';