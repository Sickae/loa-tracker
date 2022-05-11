<script lang="ts">
    import type {Character} from "$lib/common-interfaces";
    import {CharacterClass} from "$lib/common-enums";
    import {CheckCircle, Icon, PencilAlt, Trash, XCircle} from "svelte-hero-icons";
    import {characterStore} from "$lib/stores/characterStore";

    export let character: Character;

    let editMode = false;
    let editValues = getEditValues();
    let isConfirmDeleteModalOpen = false;
    
    $: classIcon = CharacterClass[character?.class]?.toLowerCase();

    function getEditValues() {
        return {
            name: character.name,
            itemLevel: character.itemLevel,
        }
    }
    
    function openEditMode() {
        editMode = true;
        editValues = getEditValues();
    }
    
    function onNameChange() {
        editValues.name = this.value;
    }
    
    function onItemLevelChange() {
        editValues.itemLevel = this.value;
    }
    
    function onKeyUp(event: KeyboardEvent) {
        if (event.key === "Enter") {
            saveEdit();
        } else if (event.key === "Escape") {
            cancelEdit();
        }
    }
    
    function cancelEdit() {
        editMode = false;
    }
    
    function saveEdit() {
        applyEdit();
        characterStore.update(character);
        cancelEdit();
    }
    
    function applyEdit() {
        character.name = editValues.name;
        character.itemLevel = editValues.itemLevel;
    }
    
    function deleteCharacter() {
        isConfirmDeleteModalOpen = true;
    }
    
    function confirmDelete() {
        characterStore.remove(character);
    }

</script>

{#if character}
    <div id="header" class="p-5 flex">
        <img src="./{classIcon}.png" class="class-icon-glow" alt="{classIcon}" />
        
        {#if editMode}
            <div class="flex flex-col justify-between" on:keyup={onKeyUp}>
                <input type="text" class="input input-accent input-sm mx-5" value="{character.name}" 
                       on:change={onNameChange} />
                <input type="number" class="input input-accent input-sm mx-5" value="{character.itemLevel}" 
                       on:change={onItemLevelChange} />
            </div>
            
            <div class="ml-auto flex">
                <div on:click={deleteCharacter} class="hover:cursor-pointer text-red-600 hover:text-red-500 active:text-red-700 mr-5" 
                     title="Delete">
                    <Icon src="{Trash}" solid size="3rem" />
                </div>
                <div on:click={cancelEdit} class="hover:cursor-pointer hover:text-gray-200 active:text-gray-500" 
                     title="Cancel">
                    <Icon src="{XCircle}" solid size="3rem" />
                </div>
                <div on:click={saveEdit} class="hover:cursor-pointer text-green-600 hover:text-green-500 active:text-green-700"
                    title="Save">
                    <Icon src="{CheckCircle}" solid size="3rem" />
                </div>
            </div>

            <input bind:checked={isConfirmDeleteModalOpen} type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are you sure you want to delete this character?</h3>
                    <div class="modal-action">
                        <label for="delete-confirm-modal" class="btn">Cancel</label>
                        <label for="delete-confirm-modal" 
                               class="btn border-red-700 hover:border-red-600 bg-red-500 hover:bg-red-600 text-white" 
                               on:click={confirmDelete}>
                            Yes
                        </label>
                    </div>
                </div>
            </div>
            
        {:else}
            <div>
                <h1 class="text-accent font-bold my-auto mx-5">{character.name}</h1>
                <p id="item-level" class="mx-5 text-gray-500">{character.itemLevel}</p>
            </div>

            <div on:click={openEditMode} class="ml-auto hover:cursor-pointer hover:text-accent" title="Edit">
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

