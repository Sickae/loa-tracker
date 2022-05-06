<script lang="ts">

    import CharacterRow from "./CharacterRow.svelte";
    import {characterStore} from "$lib/stores/characterStore";
    import {CharacterClass} from "$lib/common-enums";
    
    function onClickAdd() {
        characterStore.add({
            id: (Math.random() * 100000).toString(),
            name: "New Character",
            class: CharacterClass.GUNLANCER
        });
    }
</script>

<div class="hero w-1/3 mx-2 mb-5">

    <table class="table w-full">
        
        <thead>
        <tr>
            <th>Class</th>
            <th>Name</th>
            <th>Chaos</th>
            <th>Guardian</th>
            <th>Una's Tasks</th>
            <th>Donation</th>
        </tr>
        </thead>
        
        <tbody>
        {#each $characterStore as char}
            <CharacterRow character="{char}" />
        {/each}
        </tbody>
        
        <tfoot>
            <tr>
                <td colspan="6"><button class="btn btn-accent btn-sm" on:click={onClickAdd} >Add new</button></td>
            </tr>
        </tfoot>

    </table>

</div>
