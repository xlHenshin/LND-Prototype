<template>
    <main class="main">
        <RsContentView v-if="currentContent" :content="currentContent"/>
        <div v-else>Cargando contenido...</div>
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import RsContentView from "../components/detailviews/RsContentView.vue";

export default {
    data() {
        return {currentContent: null,};
    },
    computed: {
        ...mapStores(useContentStore),
    },
    components:{
        RsContentView
    },
    mounted() {
        const contentId = this.$route.params.id
        this.currentContent = this.contentStore.getContentById(contentId);
        console.log(this.currentContent)
    },
};
</script>

<style lang="scss">

</style>