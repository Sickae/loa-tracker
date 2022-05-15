<script lang="ts">
    import {characterStore} from "$lib/stores/characterStore";
    import type {Character} from "$lib/common-interfaces";
    import {createEventDispatcher} from "svelte";
    import {ArrowCircleDown, CheckCircle, Icon, Play, Trash, XCircle} from "svelte-hero-icons";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import {CharacterClass} from "$lib/common-enums";
    import ClassesModalContent from "$lib/components/details/ClassesModalContent.svelte";
    
    export let character: Character;
    
    if (!character) {
        throw new Error("No character provided");
    }
    
    const dispatch = createEventDispatcher();
    
    let editValues = {
        name: character.name,
        itemLevel: character.itemLevel,
        class: character.class,
    };
    let isConfirmDeleteModalOpen = false;
    let isClassesModalOpen = false;

    $: classIcon = CharacterClass[editValues.class].toLowerCase();

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
        character.class = editValues.class;
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
    
    function toggleClassesModal() {
        isClassesModalOpen = !isClassesModalOpen;
    }
    
</script>

<div class="relative hover:cursor-pointer rounded p-2 hover:bg-accent shadow-md bg-base-100 hover:text-white"
     width="100px"
     on:click={toggleClassesModal}>
    <img src="./{classIcon}.png" class="class-icon-glow" alt="{classIcon}" width="48px" />
    <div class="absolute left-12 -bottom-2 rotate-90">
        <Icon src="{Play}" solid size="1.6rem" />
    </div>
</div>

<div class="flex flex-col justify-between" on:keyup={onKeyUp}>
    <input type="text" class="input input-accent input-sm mx-5" value="{character.name}"
           placeholder="Name" on:change={onNameChange} />
    <input type="number" class="input input-accent input-sm mx-5" value="{character.itemLevel}"
           placeholder="Item level" on:change={onItemLevelChange} />
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

<input bind:checked={isClassesModalOpen} type="checkbox" id="classes-modal" class="modal-toggle" />
<div class="modal">
    <div class="modal-box bg-base-300 shadow-md w-2/3 max-w-4xl">
        <ClassesModalContent bind:selectedClass={editValues.class} />
        <div class="modal-action">
            <label for="classes-modal" class="btn btn-accent">Confirm</label>
        </div>
    </div>
</div>