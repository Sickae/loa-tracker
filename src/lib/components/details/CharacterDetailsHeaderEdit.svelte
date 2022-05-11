<script lang="ts">
    import {characterStore} from "$lib/stores/characterStore";
    import type {Character} from "$lib/common-interfaces";
    import {createEventDispatcher} from "svelte";
    import {CheckCircle, Icon, Trash, XCircle} from "svelte-hero-icons";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    
    export let character: Character;
    
    const dispatch = createEventDispatcher();
    
    let editValues = getEditValues();
    let isConfirmDeleteModalOpen = false;

    function getEditValues() {
        return {
            name: character.name,
            itemLevel: character.itemLevel,
        }
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
            close();
        }
    }

    function saveEdit() {
        applyEdit();
        characterStore.update(character);
        close();
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
        selectedCharacterIdStore.set(null);
    }
    
    function close() {
        dispatch('close');
    }
</script>

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
    <div on:click={close} class="hover:cursor-pointer hover:text-gray-200 active:text-gray-500"
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