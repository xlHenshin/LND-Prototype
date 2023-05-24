<template>
    <main class="main">
        <section class="main__top">
            <div class="title">
                <h1>Medios</h1>
                <span>Radio Samán</span>
            </div>
            <div class="description">
                <div class="description left">
                    <img src="@/assets/icons/rsiconoriginal.png" alt="">
                </div>
                <div class="description right">
                    <h2>Radio Samán</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum euismod venenatis. Etiam sit amet massa quis nisi auctor suscipit. Curabitur nec erat quis est varius consequat. Donec vel arcu arcu. Aliquam scelerisque ornare gravida. Vivamus molestie lectus id massa venenatis, sed ultricies sapien lacinia. </p>
                </div>
            </div>
        </section>
        <section class="main__tendency">
            <div class="tendencyTitle">
                <span>Tendencias</span>
                <h2>Lo más escuchado de Radio Samán</h2>
            </div>
            <swiper
            class="swiper"
            :space-between="30"
            :slides-per-view="3"
            :free-mode="true"
            >
            <swiper-slide
                v-for="content in topTrendingRsContent"
                :key="content.id"
            >
                <RsCard :content="content" />
            </swiper-slide>
            </swiper>
        </section>

        <section class="main__contents">
            <div class="filters">
                <div class="filter">
                    <h3>Filtra los contenidos por categorías</h3>
                    <select v-model="selectedCategory" @change="onCategoryChange">
                        <option disabled value="">Selecciona una categoría</option>
                        <option value="Social y Político">Social y Político</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Educación">Educación</option>
                        <option value="Género y Feminismo">Género y Feminismo</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Comunicación">Comunicación</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Arte, cultura y literatura">Arte, Cultura y Literatura</option>
                    </select>
                </div>
                <div class="filter">
                    <h3>Ordenar</h3>
                    <select v-model="selectedOrder" @change="onOrderChange">
                        <option disabled value="">Ordenar por...</option>
                        <option value="masVistos">Más vistos</option>
                        <option value="masGustados">Más gustados</option>
                        <option value="masCompartidos">Más compartidos</option>
                    </select>
                </div>
                <button class="resetBtn" @click="onResetFilters">Reiniciar filtros</button>
            </div>

            <div class="programasContent">
                <div class="programasTitle">
                    <span>Programas</span>
                </div>
                <swiper
                class="swiper"
                :space-between="30"
                :slides-per-view="3"
                :free-mode="true"
                >
                <swiper-slide
                    v-for="content in programasContent"
                    :key="content.id"
                >
                    <ProgramaCard :content="content" />
                </swiper-slide>
                </swiper>
            </div>

            <div class="episodiosContent">
                <div class="episodiosTitle">
                    <span>Episodios</span>
                </div>
                <swiper
                class="swiper"
                :space-between="30"
                :slides-per-view="3"
                :free-mode="true"
                >
                <swiper-slide
                    v-for="content in rsContent"
                    :key="content.id"
                >
                    <RsCard :content="content" />
                </swiper-slide>
                </swiper>
            </div>
        </section>
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import { useAuthenticationStore } from '../stores/authentication';
import { useUiStore } from '../stores/uiStore.js';
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation } from "swiper";
import RsCard from "../components/cards/RsCard.vue";
import ProgramaCard from "../components/cards/ProgramaCard.vue";

export default {
    computed: {
        ...mapStores(useContentStore, useAuthenticationStore, useUiStore),
        topTrendingRsContent() {
            return this.contentStore.getTopTrendingRsContent;
            
        },
        rsContent(){
            return this.contentStore.getRadioSamanContent;
        },
        programasContent(){
            return this.contentStore.getProgramasContent;
        },
        userIsLogged(){
            return this.authenticationStore.user !== null
            },
        userInfo(){
            return this.authenticationStore.getUserInfo;
        }
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
        this.contentStore.getRsData()
        this.contentStore.getProgramasData()
    },
    components:{
        RsCard,
        ProgramaCard,
        Swiper,
        SwiperSlide,
    },
    methods: {
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
        onCategoryChange(category) {
            this.contentStore.updateContentList(this.selectedCategory, this.selectedOrder);
            this.isShowingNewContent = !category && !this.selectedOrder;
        },

        onOrderChange(order) {
            this.contentStore.updateContentList(this.selectedCategory, this.selectedOrder);
            this.isShowingNewContent = !this.selectedCategory && !order;
        },

        onResetFilters() {
            this.selectedCategory = "";
            this.selectedOrder = "";
            this.contentStore.updateContentList(null, null);
            this.isShowingNewContent = true;
        },
    },
    data() {
    return {
        swiperOptions: {
            modules: [Pagination, Navigation],
        },
        selectedCategory: "",
        selectedOrder: "",
        isShowingNewContent: true,
    };
  }
}
</script>

<style scoped lang="scss">
    $notosansmono-fontfamily: 'NotoSansMono', sans-serif;
    .main{
        padding: 5vw 10vw 5vw 10vw;

        &__top{
            display: flex;
            flex-direction: column;
            margin-bottom: 5vw;

            .title{
                display: flex;
                flex-direction: row;
                align-items: baseline;
                margin-bottom: 2vw;

                h1{
                font-size: 2.5vw;
                font-weight: 600;
                margin-right: 3vw;
                }

                span {
                    font-family: $notosansmono-fontfamily;
                    font-size: 1vw;
                    font-weight: normal;
                    color: #6546FC;
                }
            }

            .description{
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .left{
                    width: 30%;
                    overflow: hidden;
                    margin-right: 4vw;

                    img{
                        width: 100%;
                        object-fit: cover;
                    }
                }

                .right{
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    
                    h2{
                        font-weight: 600;
                        font-size: 2.5vw;
                        margin-bottom: 1vw;

                        position: relative;
                        padding-bottom: 0.5vw;

                        &::after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: .125vw;// Este será el grosor de tu línea. Ajusta según necesites.
                            background-color: #6546FC;
                        }
                    }
                    p{
                        font-weight: normal;
                        font-size: 1vw;
                    }
                }
            }

        }

        &__tendency{
            margin-bottom: 4vw;

            .tendencyTitle{
                display: flex;
                flex-direction: column;
                margin-bottom: 2vw;
                span{
                    font-size: 1vw;
                    font-weight: 600;
                    margin-bottom: 1vw;
                    position: relative;
                    padding-bottom: 0.5vw;

                    &::after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: .125vw; // Este será el grosor de tu línea. Ajusta según necesites.
                        background-color: #6546FC;
                    }
                }
                h2{
                    font-weight: 600;
                    font-size: 1.875vw;
                }
            }
        }

        &__contents{
            margin-bottom: 2vw;

            .filters{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 4vw;
                align-items: flex-end;

                .filter{
                    margin-right: 6vw;
                    h3{
                        font-size: 1vw;
                        font-weight: 600;
                        margin-bottom: 1vw;
                    }

                    select{
                        font-size: 1vw;
                        width: 15.5vw;
                        padding: .5vw;
                        font-weight: 300;
                        color: #6546FC;
                        border-color: #6546FC;
                    }

                }

                .resetBtn{
                    width: 10vw;
                    height: 3vw;
                    font-size: 1vw;
                    padding: .5vw;
                    font-weight: 600;
                    border-radius: .5vw;
                    color: #6546FC;
                    border-color: #6546FC;
                }
            }

            .programasContent{
                margin-bottom: 2vw;

                .programasTitle{
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2vw;
                    width: 100%;

                    span{
                        font-size: 1vw;
                        font-weight: 600;
                        margin-bottom: 1vw;
                        position: relative;
                        padding-bottom: 0.5vw;

                        &::after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: .125vw; // Este será el grosor de tu línea. Ajusta según necesites.
                            background-color: #aaaaaa;
                        }
                    }
                }
            }

            .episodiosContent{
                margin-bottom: 2vw;

                .episodiosTitle{
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2vw;
                    width: 100%;

                    span{
                        font-size: 1vw;
                        font-weight: 600;
                        margin-bottom: 1vw;
                        position: relative;
                        padding-bottom: 0.5vw;

                        &::after {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: .125vw; // Este será el grosor de tu línea. Ajusta según necesites.
                            background-color: #aaaaaa;
                        }
                    }
                }
            }
        }
    }

</style>