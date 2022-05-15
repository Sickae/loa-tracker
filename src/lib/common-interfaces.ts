import type {CharacterClass} from "$lib/common-enums";
import type {DailyTrackerType} from "$lib/common-enums";

export interface Character {
    id: string,
    class: CharacterClass,
    name: string,
    itemLevel: number,
}

export interface DailyTracker {
    characterId: string;
    reset: Date;
    type: DailyTrackerType;
    progression: number;
}

export interface DailyTrackerMetadata {
    name: string;
    maxProgression: number;
    iconSrc: string;
}