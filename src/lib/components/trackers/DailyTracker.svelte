<script lang="ts">
    import {DailyTrackerType} from "$lib/common-enums";
    import {dailyTrackerStore} from "$lib/stores/dailyTrackerStore";
    import type {Character} from "$lib/common-interfaces";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";

    export let type: DailyTrackerType = null;
    if (type == null) {
        throw new Error("DailyTracker: type is undefined");
    }
    
    export let character: Character = null;
    if (character == null) {
        throw new Error("DailyTracker: character is undefined");
    }
    
    const metadata = dailyTrackerStore.getMetadata(type);
    
    let tracker = dailyTrackerStore.get(character.id, type);
    let progressions = Array<boolean>(metadata.maxProgression).fill(false);

    selectedCharacterIdStore.subscribe(id => {
        tracker = dailyTrackerStore.get(id, type);
        progressions = progressions.map((_, i) => i < tracker.progression);
    });
    
    function onChange(event: Event) {
        if ((event.target as HTMLInputElement).checked) {
            onSelect();
        } else {
            onDeselect();
        }
        
        tracker.progression = progressions.filter(x => x).length;
        dailyTrackerStore.update(tracker);
    }

    function onSelect() {
        for (let i = progressions.length - 1; i >= 0; i--) {
            if (progressions[i]) {
                for (let j = i; j >= 0; j--) {
                    progressions[j] = true;
                }
                break;
            }
        }
    }

    function onDeselect() {
        for (let i = 0; i < progressions.length; i++) {
            if (!progressions[i]) {
                for (let j = i; j < progressions.length; j++) {
                    progressions[j] = false;
                }
                break;
            }
        }
    }
    
</script>

<tr>
    <div class="flex items-center gap-4 p-2">
        <img src="{metadata.iconSrc}" width="32px" />
        <span class="font-bold text-lg w-1/6">{metadata.name}</span>
        <div class="flex gap-3">
            {#each progressions as p, i}
                <input bind:checked={progressions[i]} type="checkbox" class="checkbox"
                       on:change="{(e) => onChange(e)}" />
            {/each}
        </div>
    </div>
</tr>
