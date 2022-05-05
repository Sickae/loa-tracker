import {writable} from "svelte/store";

function createSelectedCharacterIdStore(storageKey: string, initialValue: string) {
    const {subscribe, set} = writable<string>(initialValue);

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue) {
                set(storedValue);
            }

            subscribe(value => {
                localStorage.setItem(storageKey, value);
            });
        },
    }
};

export const selectedCharacterIdStore = createSelectedCharacterIdStore('selectedCharacterId', '');