<script context="module">
    import {CharacterClass} from "$lib/common-enums";
    const CLASSES = [
        {
            'name': 'Assassin',
            subClasses: [CharacterClass.DEATHBLADE, CharacterClass.SHADOWHUNTER],
        },
        {
            'name': 'Gunner',
            subClasses: [CharacterClass.ARTILLERIST, CharacterClass.DEADEYE, CharacterClass.GUNSLINGER, CharacterClass.SHARPSHOOTER],
        },
        {
            'name': 'Mage',
            subClasses: [CharacterClass.BARD, CharacterClass.SORCERESS],
        },
        {
            'name': 'Martial Artist',
            subClasses: [CharacterClass.GLAIVIER, CharacterClass.SCRAPPER, CharacterClass.SOULFIST, CharacterClass.STRIKER, CharacterClass.WARDANCER],
        },
        {
            'name': 'Warrior',
            subClasses: [CharacterClass.BERSERKER, CharacterClass.DESTROYER, CharacterClass.GUNLANCER, CharacterClass.PALADIN],
        }
    ];
</script>

<script lang="ts">

    export let selectedClass: CharacterClass;
    
    function firstCharToUpper(str: string) {
        return str.at(0).toUpperCase() + str.slice(1);
    }
    
    function getEnumString(enumValue: CharacterClass) {
        return CharacterClass[enumValue].toLowerCase();
    }
    
    function onSelect(cl: CharacterClass) {
        selectedClass = cl;
    }
    
</script>

<div class="overflow-y-auto">
    <div class="flex flex-wrap gap-4 justify-center">
        {#each CLASSES as cl}
            <div class="shadow-xl rounded p-2 bg-base-200 min-w-[13rem]">
                <h2 class="font-bold text-accent text-title">{cl.name}</h2>
                <ul class="mt-3">
                    {#each cl.subClasses as subCl}
                        <li class="flex gap-3 items-center mb-1 rounded p-2 hover:cursor-pointer hover:text-white 
                            {subCl === selectedClass ? 'bg-accent text-white' : 'hover:bg-base-300 active:bg-base-100'}"
                            on:click={() => onSelect(subCl)}>
                            <img class="class-icon-glow" src="./{getEnumString(subCl)}.png" alt="{getEnumString(subCl)}" width="42px" />
                            <span>{firstCharToUpper(getEnumString(subCl))}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</div>

<style>
   
    h2 {
        font-size: 2rem;
    }
    
</style>