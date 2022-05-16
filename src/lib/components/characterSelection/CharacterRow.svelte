<script lang="ts">
    import type {Character, DailyTracker} from "$lib/common-interfaces";
    import {CharacterClass, DailyTrackerType} from "$lib/common-enums";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import {dailyTrackerStore} from "$lib/stores/dailyTrackerStore";
    import TrackerCol from "./TrackerCol.svelte";

    export let character: Character;
    
    if (!character) {
        throw new Error('CharacterRow: Character was not provided');
    }
    
    const MAX_NAME_LENGTH = 16;

    $: classIcon = CharacterClass[character.class].toLowerCase();
    
    let chaosTracker: DailyTracker;
    let guardianTracker: DailyTracker;
    let unaTracker: DailyTracker;
    let guildDonoTracker: DailyTracker;
    
    dailyTrackerStore.subscribe(() => {
        chaosTracker = dailyTrackerStore.get(character.id, DailyTrackerType.CHAOS);
        guardianTracker = dailyTrackerStore.get(character.id, DailyTrackerType.GUARDIAN);
        unaTracker = dailyTrackerStore.get(character.id, DailyTrackerType.UNA_TASK);
        guildDonoTracker = dailyTrackerStore.get(character.id, DailyTrackerType.GUILD_DONATION);
    });
    
    function onSelect() {
        selectedCharacterIdStore.set(character.id);
    }
    
</script>

<tr class="hover hover:cursor-pointer {$selectedCharacterIdStore === character.id ? 'active' : ''}" 
    on:click={onSelect}>
    <td>
        <img src="./{classIcon}.png" class="class-icon-glow" alt="{classIcon}" width="32px" height="2rem">
    </td>
    <td class="text-accent font-bold">
        {character.name.length > MAX_NAME_LENGTH ? `${character.name.substring(0, MAX_NAME_LENGTH)}...` : character.name}
    </td>
    
    <TrackerCol type="{DailyTrackerType.CHAOS}" {character} />
    <TrackerCol type="{DailyTrackerType.GUARDIAN}" {character} />
    <TrackerCol type="{DailyTrackerType.UNA_TASK}" {character} />
    <TrackerCol type="{DailyTrackerType.GUILD_DONATION}" {character} />
</tr>