<script lang="ts">
    import type {Character} from "$lib/common-interfaces";
    import {CharacterClass} from "$lib/common-enums";

    export let character: Character;

    let classIcon; 
    
    $: {
        classIcon = CharacterClass[character?.class]?.toLowerCase();
    }
</script>

{#if character}
    <div id="header" class="p-5 flex">
        <img src="images/{classIcon}.png" class="class-icon-glow" alt="{classIcon}" />
        <h1 class="text-accent font-bold my-auto mx-5">{character.name}</h1>
    </div>
{/if}

<style>
    h1 {
        font-size: 2.5rem;
    }
    
    #header {
        height: 7rem;
        font-family: default;
    }
</style>

