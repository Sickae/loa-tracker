<script lang="ts">

    import type {Character} from "../common-interfaces";
    import {CharacterClass} from "../common-enums";
    import CharacterRow from "./CharacterRow.svelte";

    const characters: Character[] = [
        {
            id: 'id1',
            name: 'Sickae',
            class: CharacterClass.BERSERKER,
        },
        {
            id: 'id3',
            name: 'Assasickae',
            class: CharacterClass.DEATHBLADE,
        },
        {
            id: 'id2',
            name: 'Chellerae',
            class: CharacterClass.GUNLANCER,
        },
    ] 
</script>

<div class="hero w-1/3 mx-2">

    <table class="table w-full">
        
        <thead>
        <tr class="font-bold">
            <th>Class</th>
            <th>Name</th>
            <th>Chaos</th>
            <th>Guardian</th>
            <th>Una's Tasks</th>
            <th>Donation</th>
        </tr>
        </thead>
        
        <tbody>
        {#each characters as char}
            <CharacterRow character="{char}" />
        {/each}
        </tbody>

    </table>

</div>