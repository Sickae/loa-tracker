import {get, writable} from "svelte/store";
import type {Character} from "$lib/common-interfaces";

function createCharacterStore(storageKey: string, initialValue: Character[]) {
    const store = writable(initialValue);

    return {
        subscribe: store.subscribe,
        add: (character: Character) => {
            store.update(characters => {
                return [...characters, character];
            });
        },
        remove: (character: Character) => {
            store.update(characters => {
                return characters.filter(c => c.id !== character.id);
            });
        },
        update: (character: Character) => {
            store.update(characters => {
                return characters.map(c => {
                    if (c.id === character.id) {
                        return character;
                    }
                    return c;
                });
            });
        },
        get: (id: string) => {
            return get(store).find(c => c.id === id);
        },
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue) {
                store.set(JSON.parse(storedValue));
            }

            store.subscribe(value => {
                localStorage.setItem(storageKey, JSON.stringify(value));
            });
        }
    };
}
    
export const characterStore = createCharacterStore("characters", []);
