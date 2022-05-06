<script lang="ts">
    import CharacterDetailsHeader from "./CharacterDetailsHeader.svelte";
    import {selectedCharacterStore} from "$lib/stores/selectedCharacterStore";
</script>

<div class="hero bg-base-300 mx-2">
    <CharacterDetailsHeader character="{$selectedCharacterStore}" />
</div>

<style>
    div {
        min-height: 81vh;
        max-height: 81vh;
    }
</style>