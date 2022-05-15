<script lang="ts" context="module">
    const day = new Date().getDay();
</script>

<div class="tabs tabs-boxed uppercase font-bold">
    <span class="tab mx-1 {day === 4 ? 'tab-active' : ''}">Thu</span>
    <span class="tab mx-1 {day === 5 ? 'tab-active' : ''}">Fri</span>
    <span class="tab mx-1 {day === 6 ? 'tab-active' : ''}">Sat</span>
    <span class="tab mx-1 {day === 0 ? 'tab-active' : ''}">Sun</span>
    <span class="tab mx-1 {day === 1 ? 'tab-active' : ''}">Mon</span>
    <span class="tab mx-1 {day === 2 ? 'tab-active' : ''}">Tue</span>
    <span class="tab mx-1 {day === 3 ? 'tab-active' : ''}">Wed</span>
</div>

