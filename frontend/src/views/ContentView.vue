<template>
    <main class="main">
        <section class="contentViewer">
            <RsContentView v-if="currentContent && currentContent.medio==='rs'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrAudioView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='sonoro'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrTextView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='escrito'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <CrVideoView v-else-if="currentContent && currentContent.medio==='c' && currentContent.tipo==='audiovisual'" :content="currentContent" @like="handleLike" @share="handleShare"/>
            <div v-else>Cargando contenido...</div>
        </section>

        <section class="relatedContent">
            <div class="contentTitle">
                <span>Contenido relacionado</span>
            </div>
            <swiper
            class="swiper"
            :space-between="30"
            :slides-per-view="3"
            :free-mode="true"
            
            >
                <swiper-slide
                    v-for="(content, index) in relatedContent"
                    :key="index"
                >
                    <router-link :to="`/content/${content.id}`">
                        <component :is="getCardComponent(content)" :content="content" />
                    </router-link>
                </swiper-slide>
            </swiper>
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
            relatedContent: [],
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
        if(this.userIsLogged){
            try {
                await this.loadUserData();
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        }

        let userId = this.userIsLogged ? this.userInfo.id : localStorage.getItem('sessionId');
        let isRegistered = this.userIsLogged;

        const contentId = this.$route.params.id;
        this.currentContent = await this.contentStore.getContentById(contentId);
        if (this.currentContent && this.currentContent.medio === 'c') {
            if (this.currentContent.tipo === 'escrito' || this.currentContent.tipo === 'sonoro' || this.currentContent.tipo === 'audiovisual') {
                this.currentContent.mediaUrl = await this.contentStore.fetchMediaUrl(this.currentContent.metadatos.url);
            }
        }
        if (userId && this.currentContent) {
            await this.interactionStore.registerInteraction(userId, isRegistered, this.currentContent.id, this.currentContent.categoria, false, false);
            this.interactionStore.updateCategoryProfile(userId, this.currentContent.categoria, 'view');
            this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'view');
        }

        this.relatedContent = await this.contentStore.getRelatedContent(contentId, this.currentContent.categoria);

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
                            resolve();
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
            let userId = this.userIsLogged ? this.userInfo.id : localStorage.getItem('sessionId');
            let isRegistered = this.userIsLogged;

            if (isRegistered) {
                this.interactionStore.updateInteraction(userId, this.currentContent.id, this.currentContent.categoria, 'like');
                this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'like');
            } else {
                alert('¿Te gusta este contenido? Accede para hacer valer tu opinión.');
            }
        },

        handleShare() {
            let userId = this.userIsLogged ? this.userInfo.id : localStorage.getItem('sessionId');
            let isRegistered = this.userIsLogged;

            if (isRegistered) {
                this.interactionStore.updateInteraction(userId, this.currentContent.id, this.currentContent.categoria, 'share');
                this.interactionStore.updateContentInteraction(this.currentContent.id, this.currentContent.medio, 'share');
            } else {
                alert('¿Deseas compartir este contenido? Accede para mandarlo a tus amigos.');
            }
        },
        async recordInteraction() {
            let userId = this.userIsLogged ? this.userInfo.id : localStorage.getItem('sessionId');
            let isRegistered = this.userIsLogged;

            if (userId && this.currentContent && this.currentContent.id && this.currentContent.categoria) {
                // Check if the user has not liked or shared this content yet
                const interaction = await this.interactionStore.getInteraction(userId, this.currentContent.id);
                if (!interaction || (!interaction.data().liked && !interaction.data().shared)) {
                    this.interactionStore.registerInteraction(userId, isRegistered, this.currentContent.id, this.currentContent.categoria, false, false);
                    this.interactionStore.updateCategoryProfile(userId, this.currentContent.categoria, 'view');
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

<style lang="scss">

</style>