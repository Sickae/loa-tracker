import {writable} from "svelte/store";
import type {Character} from "$lib/common-interfaces";
import {CharacterClass} from "$lib/common-enums";

function createCharacterStore(storageKey: string, initialValue: Character[]) {
    const {subscribe, set, update} = writable(initialValue);

    return {
        subscribe,
        add: (character: Character) => {
            update(characters => {
                return [...characters, character];
            });
        },
        remove: (character: Character) => {
            update(characters => {
                console.log('removing', character);
                return characters.filter(c => c.id !== character.id);
            });
        },
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(storageKey);
            if (storedValue) {
                set(JSON.parse(storedValue));
            }

            subscribe(value => {
                localStorage.setItem(storageKey, JSON.stringify(value));
            });
        }
    };
}

const DUMMY_DATA: Character[] = [
    {
        id: 'id1',
        name: 'Sickae',
        class: CharacterClass.BERSERKER,
    },
    {
        id: 'id2',
        name: 'Assasickae',
        class: CharacterClass.DEATHBLADE,
    },
    {
        id: 'id3',
        name: 'Chellerae',
        class: CharacterClass.GUNLANCER,
    },
];
    
export const characterStore = createCharacterStore("characters", []);
