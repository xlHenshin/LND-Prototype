<template>
    <main class="main">
        <section class="contentViewer">
            <RsContentView v-if="currentContent && currentContent.medio==='rs'" :content="currentContent"/>
            <CrAudioView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='sonoro'" :content="currentContent"/>
            <CrTextView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='escrito'" :content="currentContent"/>
            <CrVideoView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='audiovisual'" :content="currentContent"/>
            <div v-else>Cargando contenido...</div>
        </section>
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import RsContentView from "../components/detailviews/RsContentView.vue";
import CrAudioView from "../components/detailviews/circularviews/CrAudioView.vue";
import CrTextView from "../components/detailviews/circularviews/CrTextView.vue";
import CrVideoView from "../components/detailviews/circularviews/CrVideoView.vue";

export default {
    data() {
        return {currentContent: null,};
    },
    computed: {
        ...mapStores(useContentStore),
    },
    components:{
        RsContentView,
        CrAudioView,
        CrTextView,
        CrVideoView,
    },
    mounted() {
        const contentId = this.$route.params.id;
        this.currentContent = this.contentStore.getContentById(contentId);
        if (this.currentContent && this.currentContent.medio === 'c') {
            if (this.currentContent.tipo === 'escrito' || this.currentContent.tipo === 'sonoro' || this.currentContent.tipo === 'audiovisual') {
                this.currentContent.mediaUrl = this.contentStore.fetchMediaUrl(this.currentContent.metadatos.url);
            }
        }
    },
};
</script>

<style lang="scss">

</style>