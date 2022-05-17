<script lang="ts">
    
    export let restBonus = 0;
    
    $: console.log('restBonus', restBonus)
    
</script>

<div class="flex">
    {#if restBonus >= 20}
        <div class="rest-bonus bg-success shadow-md glow"></div>
    {:else if restBonus >= 10}
        <div class="rest-bonus shadow-md flex">
            <div class="bg-success w-1/2 h-full"></div>
            <div class="bg-base-300 w-1/2 h-full"></div>
        </div>
    {:else}
        <div class="rest-bonus bg-base-300 shadow-md"></div>
    {/if}
</div>

<style>

    .rest-bonus {
        width: 2rem;
        height: .3rem;
        border-radius: .1rem;
    }

    .glow {
        filter: drop-shadow(0 0 .5rem rgba(2, 250, 89, 0.5));
    }

</style>