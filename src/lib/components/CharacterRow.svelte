<script context="module" lang="ts">
    import {writable} from "svelte/store";
    
    const contextMenuIdStore = writable('');
    
</script>

<script lang="ts">
    import type {Character, DailyTask} from "$lib/common-interfaces";
    import {CharacterClass} from "$lib/common-enums";
    import {selectedCharacterStore} from "$lib/stores/selectedCharacterStore";
    import {characterStore} from "../stores/characterStore";
    import {get} from "svelte/store";
    import {Icon, Trash} from "svelte-hero-icons";
    
    export let character: Character;
    
    if (!character) {
        throw new Error('Invalid character')
    }

    const classIcon = CharacterClass[character.class].toLowerCase();
    
    const dailyTask: DailyTask = {
        characterId: character.id,
        date: new Date(),
        chaos: Math.random() * 3 - 1,
        guardian: Math.random() * 3 - 1,
        una: Math.random() * 4 - 1,
        donation: (Math.random() * 5) > 2,
    }
    
    enum Colors {
        BASE = 'bg-base-300',
        CHAOS = 'bg-error',
        GUARDIAN = 'bg-info',
        DONATION = 'bg-yellow-500',
        UNA = 'bg-green-500',
    }
    
    function onSelect() {
        selectedCharacterStore.set(character);
    }
    
    function onContextMenu() {
        contextMenuIdStore.set($contextMenuIdStore === character.id ? '' : character.id);     
    }
    
    function onRemove() {
        console.log('remove clicked')
        characterStore.remove(character);
    }
    
</script>

<tr class="hover hover:cursor-pointer {$selectedCharacterStore?.id === character.id ? 'active' : ''}" on:click={onSelect} on:contextmenu|preventDefault={onContextMenu}>
    <td>
        {#if character.id === $contextMenuIdStore}
            <div on:click={onRemove}>
                <Icon src="{Trash}" solid class="text-error hover:text-red-500" size="32" />
            </div>
        {:else}
            <img src="images/{classIcon}.png" alt="{classIcon}" width="32px" height="32px">
        {/if}
    </td>
    <td class="text-accent font-bold">{character.name}</td>
    <td>
        <span class="dot {dailyTask.chaos > 0 ? Colors.CHAOS : Colors.BASE}"></span>
        <span class="dot {dailyTask.chaos > 1 ? Colors.CHAOS : Colors.BASE}"></span>
    </td>
    <td>
        <span class="dot {dailyTask.guardian > 0 ? Colors.GUARDIAN : Colors.BASE}"></span>
        <span class="dot {dailyTask.guardian > 1 ? Colors.GUARDIAN : Colors.BASE}"></span>
    </td>
    <td>
        <span class="dot {dailyTask.una > 0 ? Colors.UNA : Colors.BASE}"></span>
        <span class="dot {dailyTask.una > 1 ? Colors.UNA : Colors.BASE}"></span>
        <span class="dot {dailyTask.una > 2 ? Colors.UNA : Colors.BASE}"></span>
    </td>
    <td>
        <span class="dot {dailyTask.donation ? Colors.DONATION : Colors.BASE}"></span>
    </td>
</tr>

<style>
    tr:hover span.bg-base-300, tr.active span.bg-base-300 {
        background-color: hsl(var(--b1, var(--b3)) / var(--tw-bg-opacity)) !important;
    }
</style>