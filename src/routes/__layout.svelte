<script lang="ts">
    import '../app.css';

    enum CharacterClass {
        BERSERKER,
        GUNLANCER,
        DEATHBLADE,
    }

    interface Character {
        id: string,
        class: CharacterClass,
        name: string,
    }
</script>

<slot/>