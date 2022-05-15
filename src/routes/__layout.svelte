<script lang="ts">
    import '$lib/global.css';
    import {characterStore} from "$lib/stores/characterStore";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import {onMount} from "svelte";
    import {dailyTrackerStore} from "$lib/stores/dailyTrackerStore";
    
    onMount(() => {
        characterStore.useLocalStorage();
        selectedCharacterIdStore.useLocalStorage();
        dailyTrackerStore.useLocalStorage();
        
        dailyTrackerStore.refreshTrackers();
    });
</script>

<slot/>