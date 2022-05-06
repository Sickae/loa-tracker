<script lang="ts">
    import type {Character} from "$lib/common-interfaces";

    export let character: Character;
    
    console.log('ch', character)
</script>

<h1>{character?.name ?? 'asd'}</h1>

