<script lang="ts">
    import CharacterList from "$lib/components/CharacterList.svelte";
    import CharacterDetails from "$lib/components/CharacterDetails.svelte";
    import {selectedCharacterStore} from "$lib/stores/selectedCharacterStore";
</script>

<style>
    
</style>

<div class="bg-base-300 shadow-md">
    <h1 class="mx-5">LoaTracker</h1>
</div>

<div class="flex items-start mt-5">

    <CharacterList />
    {#if $selectedCharacterStore}
        <CharacterDetails />
    {/if}

</div>