<script lang="ts">
    import CharacterList from "$lib/components/CharacterList.svelte";
    import CharacterDetails from "$lib/components/CharacterDetails.svelte";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import DayOfWeek from "$lib/components/DayOfWeek.svelte";
    import DebugComponent from "$lib/components/DebugComponent.svelte";
</script>

<div class="bg-base-300 shadow-md flex">
    <h1 class="mx-5">LoaTracker</h1>
    
    <div class="ml-auto mr-5 flex items-center">
        <DebugComponent />
    </div>
</div>

<div class="flex justify-center mt-5">
    <DayOfWeek />
</div>

<div class="flex items-start mt-5">
    <CharacterList />
    {#if $selectedCharacterIdStore}
        <CharacterDetails />
    {/if}

</div>