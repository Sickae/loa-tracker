<script lang="ts">
    import '$lib/global.css';
    import {characterStore} from "$lib/stores/characterStore";
    import {selectedCharacterStore} from "$lib/stores/selectedCharacterStore";
    
    import {onMount} from "svelte";
    
    onMount(() => {
        characterStore.useLocalStorage();
        selectedCharacterStore.useLocalStorage();
    });
</script>

<slot/>