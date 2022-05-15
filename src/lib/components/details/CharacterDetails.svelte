<script lang="ts">
    import CharacterDetailsHeader from "$lib/components/details/CharacterDetailsHeader.svelte";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import {characterStore} from "$lib/stores/characterStore";
    import DailyTrackerContainer from "$lib/components/trackers/DailyTrackerContainer.svelte";
    
    let character;
    selectedCharacterIdStore.subscribe(id => character = characterStore.get(id));
</script>

{#if character}
    <div id="details-hero" class="w-full bg-base-300 mx-2 shadow-md">
        <CharacterDetailsHeader {character} />
    
        <DailyTrackerContainer bind:character={character} />
    </div>
{/if}

<style>
    #details-hero {
        min-height: 81vh;
        max-height: 81vh;
        border-radius: .5rem;
    }
</style>