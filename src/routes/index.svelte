<script lang="ts">
    import CharacterList from "$lib/components/CharacterList.svelte";
    import CharacterDetails from "$lib/components/CharacterDetails.svelte";
</script>

<style>
    
</style>

<div class="bg-base-300 shadow-md">
    <h1 class="mx-5">LoaTracker</h1>
</div>

<div class="flex mt-5">

    <CharacterList />
    <CharacterDetails />

</div>