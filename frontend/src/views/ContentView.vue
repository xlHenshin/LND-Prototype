<template>
    <main class="main">
        <RsContentView :content="currentContent"/>
        
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import RsContentView from "../components/detailviews/RsContentView.vue";

export default {
    data() {
        return {currentContent: {},};
    },
    computed: {
        ...mapStores(useContentStore),
    },
    components:{
        RsContentView
    },
    mounted() {
        this.currentContent = this.contentStore.getContentById(this.$route.params.id);
        console.log(this.currentContent)
    },
};
</script>

<style lang="scss">

</style>