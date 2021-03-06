<script lang="ts">
    import type {Character} from "$lib/common-interfaces";
    import {CharacterClass} from "$lib/common-enums";
    import {Icon, PencilAlt} from "svelte-hero-icons";
    import CharacterDetailsHeaderEdit from "$lib/components/details/CharacterDetailsHeaderEdit.svelte";
    import {selectedCharacterIdStore} from "../../stores/selectedCharacterIdStore";

    export let character: Character;
    
    if (!character) {
        throw new Error("CharacterDetailsHeader: No character provided");
    }
    
    const MAX_NAME_LENGTH = 16;

    let editMode = false;
    
    $: classIcon = CharacterClass[character.class]?.toLowerCase();
    
    selectedCharacterIdStore.subscribe(() => editMode = false);

    function toggleEditMode() {
        editMode = !editMode;
    }
    
</script>

{#if character}
    <div id="header" class="p-5 flex">
        {#if editMode}
            <CharacterDetailsHeaderEdit bind:character={character} on:close={toggleEditMode} />
        {:else}
            <img src="./{classIcon}.png" class="class-icon-glow" alt="{classIcon}" />
            
            <div>
                <h1 class="text-accent font-bold my-auto mx-5 text-title">
                    {character.name.length > MAX_NAME_LENGTH ? `${character.name.substring(0, MAX_NAME_LENGTH)}...` : character.name}
                </h1>
                <p id="item-level" class="mx-5 text-gray-500">{character.itemLevel ?? ''}</p>
            </div>

            <div on:click={toggleEditMode} class="ml-auto hover:cursor-pointer hover:text-accent" title="Edit">
                <Icon src="{PencilAlt}" size="2rem" />
            </div>
        {/if}
    </div>
{/if}

<style>
    h1 {
        font-size: 2.5rem;
    }
    
    #header {
        height: 7rem;
        font-family: default;
    }
    
    #item-level {
        margin-top: -1rem;
    }
</style>

