<template>
    <main class="main">
        
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";

export default {
    data() {
        return {currentContent: {},};
    },
    computed: {
        ...mapStores(useContentStore),
    },
    mounted() {
        this.currentContent = this.contentStore.getContentById(this.$route.params.id);
        console.log(this.currentContent)
    },
};
</script>

<style lang="scss">

</style>