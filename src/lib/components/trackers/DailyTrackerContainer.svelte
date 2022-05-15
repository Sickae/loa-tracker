<script lang="ts">
    import DailyTracker from "$lib/components/trackers/DailyTracker.svelte";
    import {DailyTrackerType} from "$lib/common-enums";
    import type {Character} from "$lib/common-interfaces";
    
    export let character: Character
</script>

<div class="m-5 flex flex-col">
    <table>
        <DailyTracker {character} type="{DailyTrackerType.CHAOS}" />
        <DailyTracker {character} type="{DailyTrackerType.GUARDIAN}" />
        <DailyTracker {character} type="{DailyTrackerType.UNA_TASK}" />
        <DailyTracker {character} type="{DailyTrackerType.GUILD_DONATION}" />
    </table>
</div>

