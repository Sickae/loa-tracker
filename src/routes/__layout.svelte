<script lang="ts">
    import '$lib/global.css';
    import {characterStore} from "$lib/stores/characterStore";
    import {selectedCharacterIdStore} from "../lib/stores/selectedCharacterIdStore";
    
    import {onMount} from "svelte";
    
    onMount(() => {
        characterStore.useLocalStorage();
        selectedCharacterIdStore.useLocalStorage();
    });
</script>

<slot/>