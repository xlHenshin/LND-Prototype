<template>
    <main class="main">
        <section class="contentViewer">
            <RsContentView v-if="currentContent && currentContent.medio==='rs'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrAudioView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='sonoro'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrTextView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='escrito'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrVideoView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='audiovisual'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <div v-else>Cargando contenido...</div>
        </section>
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import { useAuthenticationStore } from '../stores/authentication';
import { useInteractionStore } from '../stores/interactionStore';
import { useUiStore } from '../stores/uiStore.js';
import RsContentView from "../components/detailviews/RsContentView.vue";
import CrAudioView from "../components/detailviews/circularviews/CrAudioView.vue";
import CrTextView from "../components/detailviews/circularviews/CrTextView.vue";
import CrVideoView from "../components/detailviews/circularviews/CrVideoView.vue";
import RsCard from "../components/cards/RsCard.vue";
import CrCard from "../components/cards/CrCard.vue";

export default {
    data() {
        return {
            currentContent: null,
            //relatedContent: [],
            userId: '', 
        }
    },
    computed: {
        ...mapStores(useContentStore, useAuthenticationStore, useInteractionStore, useUiStore),
        userIsLogged(){
            return this.authenticationStore.user !== null
            },
        userInfo(){
            return this.authenticationStore.getUserInfo;
        }
    },
    components:{
        RsContentView,
        CrAudioView,
        CrTextView,
        CrVideoView,
        RsCard,
        CrCard,
    },
    async created() {
        this.uiStore.toggleSidebar(true)
        await this.authenticationStore.authState();
        console.log('User is logged:', this.userIsLogged);
        if(this.userIsLogged){
            try {
                let userInfo = await this.loadUserData();
                console.log('User info after loadUserData: ', userInfo);
                this.userId = userInfo[0].id;
                console.log('User id:', this.userId);
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        }else {
            this.userId = localStorage.getItem('sessionId');
            console.log('User id:', this.userId);
        }
        console.log('User id RECHECK:', this.userId);
        let isRegistered = this.userIsLogged;

        const contentId = this.$route.params.id;
        this.currentContent = await this.contentStore.getContentById(contentId);
        console.log('Current content:', this.currentContent.medio);
        if (this.currentContent && this.currentContent.medio === 'c') {
            if (this.currentContent.tipo === 'escrito' || this.currentContent.tipo === 'sonoro' || this.currentContent.tipo === 'audiovisual') {
                this.currentContent.mediaUrl = await this.contentStore.fetchMediaUrl(this.currentContent.metadatos.url);
            }
        }
        console.log('Current content:', this.currentContent, 'userId ', this.userId);
        if (this.userId && this.currentContent) {
            console.log('Registering interaction');
            await this.interactionStore.registerInteraction(this.userId, isRegistered, this.currentContent.id, this.currentContent.categoria, 'view');
            this.interactionStore.updateCategoryProfile(this.userId, this.currentContent.categoria, 'view');
            this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'view');
        }

        //this.relatedContent = await this.contentStore.getRelatedContent(contentId, this.currentContent.categoria);

        window.addEventListener('beforeunload', this.recordInteraction);
    },
    methods: {
        getCardComponent(content) {
            return content.medio === 'rs' ? 'RsCard' : 'CrCard';
        },
        async loadUserData() {
            return new Promise((resolve, reject) => {
                if(this.userIsLogged){
                    this.authenticationStore.getUserData()
                        .then(() => {
                            console.log('User info after getUserData: ', this.userInfo);
                            console.log('User info from store after getUserData: ', this.authenticationStore.getUserInfo);
                            resolve(this.userInfo);
                        })
                        .catch((error) => {
                            console.error('Error cargando datos del usuario:', error);
                            reject(error);
                        });
                } else {
                    reject('User is not logged in');
                }
            });
        },
        handleLike() {
            let isRegistered = this.userIsLogged;

            if (isRegistered) {
                this.interactionStore.updateInteraction(this.userId, this.currentContent.id, this.currentContent.categoria, 'like');
                this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'like');
            } else {
                alert('¿Te gusta este contenido? Accede para hacer valer tu opinión.');
            }
        },

        handleShare() {
            let isRegistered = this.userIsLogged;

            if (isRegistered) {
                this.interactionStore.updateInteraction(this.userId, this.currentContent.id, this.currentContent.categoria, 'share');
                this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'share');
            } else {
                alert('¿Deseas compartir este contenido? Accede para mandarlo a tus amigos.');
            }
        },
        async recordInteraction() {
            let isRegistered = this.userIsLogged;

            if (this.userId && this.currentContent && this.currentContent.id && this.currentContent.categoria) {
                // Check if the user has not liked or shared this content yet
                const interaction = await this.interactionStore.getInteraction(this.userId, this.currentContent.id);
                if (!interaction || (!interaction.data().liked && !interaction.data().shared)) {
                    this.interactionStore.registerInteraction(this.userId, isRegistered, this.currentContent.id, this.currentContent.categoria, 'view');
                    this.interactionStore.updateCategoryProfile(this.userId, this.currentContent.categoria, 'view');
                    this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'view');
                }
            }
        },
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.recordInteraction);
    },
};
</script>

<style scoped lang="scss">

</style>