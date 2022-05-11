<script lang="ts">
    import CharacterDetailsHeader from "./CharacterDetailsHeader.svelte";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import {characterStore} from "$lib/stores/characterStore";
    
    let character;
    selectedCharacterIdStore.subscribe(id => character = characterStore.get(id));
</script>

{#if character}
    <div id="details-hero" class="w-full bg-base-300 mx-2">
        <CharacterDetailsHeader {character} />
    
        <div class="tabs uppercase font-bold bg-base-300">
            <a class="tab tab-sm tab-lifted">Chaos</a>
            <a class="tab tab-sm tab-lifted tab-active">Guardian Raid</a>
            <a class="tab tab-sm tab-lifted">Una's Taks</a>
        </div>
    </div>
{/if}

<style>
    #details-hero {
        min-height: 81vh;
        max-height: 81vh;
        border-radius: .5rem;
    }
</style>