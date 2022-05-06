import {writable} from "svelte/store";
import type {Character} from "$lib/common-interfaces";

function createSelectedCharacterStore(storageKey: string, initialValue: Character | null) {
    const {subscribe, set} = writable<Character | null>(initialValue);

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue) {
                set(JSON.parse(storedValue));
            }

            subscribe(value => {
                localStorage.setItem(storageKey, JSON.stringify(value));
            });
        },
    }
};

export const selectedCharacterStore = createSelectedCharacterStore('selectedCharacter', null);