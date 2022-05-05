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
            id: 'id2',
            name: 'Assasickae',
            class: CharacterClass.DEATHBLADE,
        },
        {
            id: 'id3',
            name: 'Chellerae',
            class: CharacterClass.GUNLANCER,
        },
    ];
    
    let selectedCharId = characters[0].id;
    function onCharSelected(event: CustomEvent): void {
        selectedCharId = event.detail;
    }
</script>

<div class="hero w-1/3 mx-2">

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
        {#each characters as char}
            <CharacterRow character="{char}" bind:selectedCharId={selectedCharId} activeCharStore on:character-select={onCharSelected} />
        {/each}
        </tbody>
        
        <tfoot>
            <tr>
                <td colspan="6"><button class="btn btn-accent btn-sm">Add new</button></td>
            </tr>
        </tfoot>

    </table>

</div>