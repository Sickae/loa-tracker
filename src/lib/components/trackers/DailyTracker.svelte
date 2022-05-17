<script lang="ts">
    import {DailyTrackerType} from "$lib/common-enums";
    import {dailyTrackerStore} from "$lib/stores/dailyTrackerStore";
    import type {Character} from "$lib/common-interfaces";
    import {selectedCharacterIdStore} from "$lib/stores/selectedCharacterIdStore";
    import RestBonusIndicator from "./RestBonusIndicator.svelte";

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
        
        updateProgression();
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

    function updateProgression() {
        tracker.progression = progressions.filter(x => x).length;
        dailyTrackerStore.update(tracker);
    }
    
    function onDone() {
        progressions = progressions.map(() => true);
        updateProgression();
    }
    
</script>

<div class="flex items-center gap-4 p-3 rounded-lg bg-base-100 shadow-md">
    <img src="{metadata.iconSrc}" width="32px" />
    <div class="flex flex-col gap-1">
        <span class="font-bold">{metadata.name}</span>
        {#if metadata.hasRestBonus}
            <div class="flex gap-1">
                {#each Array(Math.floor(tracker.restBonus / 20)) as _, i}
                    <RestBonusIndicator restBonus="{20}" />
                {/each}
                {#each Array(5 - Math.floor(tracker.restBonus / 20)) as _, i}
                    <RestBonusIndicator restBonus="{tracker.restBonus % 20 > 0 && i === 0 ? 10 : 0}" />
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex gap-3 ml-auto">
        <div class="flex flex-col gap-2 items-end">
            <div class="flex gap-2">
                {#each progressions as p, i}
                    <input bind:checked={progressions[i]} type="checkbox" class="checkbox checkbox-xs"
                           on:change="{(e) => onChange(e)}" />
                {/each}
            </div>
            <button class="btn btn-sm btn-success text-white shadow-md" on:click={onDone}>Done</button>
        </div>
    </div>
</div>
