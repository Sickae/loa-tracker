<script lang="ts">
    import CharacterDetailsHeader from "./CharacterDetailsHeader.svelte";
    import {selectedCharacterStore} from "$lib/stores/selectedCharacterStore";
</script>

<div id="details-hero" class="w-full bg-base-300 mx-2">
    <CharacterDetailsHeader character="{$selectedCharacterStore}" />

    <div class="tabs uppercase font-bold bg-base-300">
        <a class="tab tab-sm tab-lifted">Chaos</a>
        <a class="tab tab-sm tab-lifted tab-active">Guardian Raid</a>
        <a class="tab tab-sm tab-lifted">Una's Taks</a>
    </div>
</div>

<style>
    #details-hero {
        min-height: 81vh;
        max-height: 81vh;
        border-radius: .5rem;
    }
</style>