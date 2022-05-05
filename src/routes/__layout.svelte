<script lang="ts">
    import '$lib/global.css';
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    
    import {onMount} from "svelte";
    
    onMount(() => {
        selectedCharacterIdStore.useLocalStorage();
    });
</script>

<slot/>