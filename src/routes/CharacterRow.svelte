<script lang="ts">
    import type {Character, DailyTask} from "../common-interfaces";
    import {CharacterClass} from "../common-enums";

    export let character: Character;
    
    if (!character) {
        throw new Error('Invalid character')
    }
    
    const classIcon = CharacterClass[character.class].toLowerCase();
    
    const dailyTask: DailyTask = {
        characterId: character.id,
        date: new Date(),
        chaos: Math.random() * 3 - 1,
        guardian: Math.random() * 3 - 1,
        una: Math.random() * 4 - 1,
        donation: (Math.random() * 5) > 2,
    }
    
    enum Colors {
        BASE = 'bg-base-300',
        CHAOS = 'bg-error',
        GUARDIAN = 'bg-info',
        DONATION = 'bg-yellow-500',
        UNA = 'bg-green-500',
    };
    
</script>

<tr>
    <td><img src="images/{classIcon}.png" alt="{classIcon}" width="32px" height="32px"> </td>
    <td class="text-accent font-bold">{character.name}</td>
    <td>
        <span class="knob {dailyTask.chaos > 0 ? Colors.CHAOS : Colors.BASE}"></span>
        <span class="knob {dailyTask.chaos > 1 ? Colors.CHAOS : Colors.BASE}"></span>
    </td>
    <td>
        <span class="knob {dailyTask.guardian > 0 ? Colors.GUARDIAN : Colors.BASE}"></span>
        <span class="knob {dailyTask.guardian > 1 ? Colors.GUARDIAN : Colors.BASE}"></span>
    </td>
    <td>
        <span class="knob {dailyTask.una > 0 ? Colors.UNA : Colors.BASE}"></span>
        <span class="knob {dailyTask.una > 1 ? Colors.UNA : Colors.BASE}"></span>
        <span class="knob {dailyTask.una > 2 ? Colors.UNA : Colors.BASE}"></span>
    </td>
    <td>
        <span class="knob {dailyTask.donation ? Colors.DONATION : Colors.BASE}"></span>
    </td>
</tr>