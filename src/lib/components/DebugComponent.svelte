<script lang="ts">
    function clearLocalStorage() {
        localStorage.clear();
    }
</script>

<button class="btn" on:click={clearLocalStorage}>Clear localStorage</button>