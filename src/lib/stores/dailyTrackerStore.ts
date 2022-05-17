import {get, writable} from "svelte/store";
import type {DailyTracker, DailyTrackerMetadata} from "$lib/common-interfaces";
import {DailyTrackerType} from "$lib/common-enums";

function createDailyTrackerStore(storageKey: string, initialValue: DailyTracker[]) {
    const store = writable(initialValue);
    
    return {
        subscribe: store.subscribe,
        get: (characterId: string, type: DailyTrackerType) => {
            let tracker = get(store).find(x => x.characterId === characterId && x.type === type);
            if (!tracker) {
                tracker = {
                    characterId,
                    type,
                    progression: 0,
                    reset: calc_reset(),
                    restBonus: 20,
                };
                store.update(trackers => [...trackers, tracker as DailyTracker]);
            }
            
            return tracker;
        },
        update: (tracker: DailyTracker) => {
            store.update(trackers => trackers.map(tr => {
                if (tracker.characterId === tr.characterId && tracker.type === tr.type) {
                    return tracker
                }
                return tr;
            }));
        },
        getMetadata: (type: DailyTrackerType) => {
            return METADATA[type];
        },
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue) {
                store.set(JSON.parse(storedValue));
            }

            store.subscribe(value => {
                localStorage.setItem(storageKey, JSON.stringify(value));
            });
        },
        refreshTrackers() {
            store.update(trackers => trackers.map(tracker => {
                if (new Date(tracker.reset) < new Date()) {
                    tracker.progression = 0;
                    tracker.previousRestBonus = tracker.restBonus;
                    tracker.reset = calc_reset();
                }
                return tracker;
            }));
        },
    }
}

export const dailyTrackerStore = createDailyTrackerStore("dailyTrackers", []);

const METADATA: Record<DailyTrackerType, DailyTrackerMetadata> = {
    [DailyTrackerType.CHAOS]: {
        name: 'Chaos Dungeon',
        maxProgression: 2,
        hasRestBonus: true,
        iconSrc: './chaos_dungeon.png',
        colorClass: 'bg-error'
    },
    [DailyTrackerType.GUARDIAN]: {
        name: 'Guardian Raid',
        maxProgression: 2,
        hasRestBonus: true,
        iconSrc: './guardian_raid.png',
        colorClass: 'bg-info',
    },
    [DailyTrackerType.UNA_TASK]: {
        name: "Una's Tasks",
        maxProgression: 3,
        hasRestBonus: true,
        iconSrc: './unas_tasks.png',
        colorClass: 'bg-yellow-500',
    },
    [DailyTrackerType.GUILD_DONATION]: {
        name: 'Guild Donation',
        maxProgression: 1,
        hasRestBonus: false,
        iconSrc: './guild_donation.png',
        colorClass: 'bg-green-500',
    },
}

const RESET_HOUR_UTC = 10;
const calc_reset = () => {
    const now = new Date();
    const addDay = now.getUTCHours() >= RESET_HOUR_UTC ? 1 : 0;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + addDay, RESET_HOUR_UTC - (now.getTimezoneOffset() / 60));
} 