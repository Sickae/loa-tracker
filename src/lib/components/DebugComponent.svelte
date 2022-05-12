<script lang="ts">
    function clearLocalStorage() {
        localStorage.clear();
        window.location.reload();
    }
</script>

<button class="btn" on:click={clearLocalStorage}>Clear localStorage</button>
