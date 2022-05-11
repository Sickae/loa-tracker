import {writable} from "svelte/store";

function createSelectedCharacterIdStore(storageKey: string, initialValue: string | null) {
    const {subscribe, set} = writable(initialValue);

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
}

export const selectedCharacterIdStore = createSelectedCharacterIdStore('selectedCharacterId', null);