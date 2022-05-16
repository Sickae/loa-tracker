<script lang="ts">
    import type {Character} from "$lib/common-interfaces";
    import {DailyTrackerType} from "$lib/common-enums";
    import {dailyTrackerStore} from "$lib/stores/dailyTrackerStore";
    
    export let character: Character = null;
    export let type: DailyTrackerType = null;
    
    if (character == null) {
        throw new Error("TrackerCol: character was not provided");
    }
    if (type == null) {
        throw new Error("TrackerCol: type was not provided");
    }
    
    const metadata = dailyTrackerStore.getMetadata(type);
    
    let tracker = dailyTrackerStore.get(character.id, type);
    dailyTrackerStore.subscribe(() => {
        tracker = dailyTrackerStore.get(character.id, type);
    });
    
</script>

<td>
    <div class="flex justify-center gap-1">
    {#each Array(metadata.maxProgression) as _, i}
        <span class="badge badge-sm {tracker.progression > i ? metadata.colorClass : 'bg-base-300 :hover bg-base-100'}"></span>    
    {/each}
    </div>
</td>