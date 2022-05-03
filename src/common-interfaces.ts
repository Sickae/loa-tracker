import type {CharacterClass} from "./common-enums";

export interface Character {
    id: string,
    class: CharacterClass,
    name: string,
}

export interface DailyTask {
    characterId: string;
    date: Date;
    chaos?: number| 0 | 1 | 2,
    guardian?: number | 0 | 1 | 2,
    donation: boolean,
    una?: number,
}