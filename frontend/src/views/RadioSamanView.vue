<template>
    <main class="main">
        <section class="main__top">
            <div class="main__title">
                <h1>Medios</h1>
                <span>Radio Samán</span>
            </div>
            <div class="main__description">
                <div class="main__description left">

                </div>
                <div class="main__description right">
                    <h2>Radio Samán</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum euismod venenatis. Etiam sit amet massa quis nisi auctor suscipit. Curabitur nec erat quis est varius consequat. Donec vel arcu arcu. Aliquam scelerisque ornare gravida. Vivamus molestie lectus id massa venenatis, sed ultricies sapien lacinia. </p>
                </div>
            </div>
        </section>
        <section class="main__tendency">
            <div class="main__tendencyTitle">
                <span>Tendencias</span>
                <h2>Lo más escuchado de Radio Samán</h2>
            </div>
            <swiper
            class="swiper"
            :space-between="30"
            :slides-per-view="3"
            :free-mode="true"
            :pagination="{ clickable: true }"
            :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
            >
            <swiper-slide
                v-for="content in topTrendingRsContent"
                :key="content.id"
            >
                <RsCard :content="content" />
            </swiper-slide>
            <div class="swiper-button-prev">‹</div>
            <div class="swiper-button-next">›</div>
            </swiper>
        </section>

        <section class="main__contents">
            <div class="main__filters">
                <div class="main__filter">
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
                <div class="main__filter">
                    <h3>Ordenar</h3>
                    <select v-model="selectedOrder" @change="onOrderChange">
                        <option disabled value="">Ordenar por...</option>
                        <option value="masVistos">Más vistos</option>
                        <option value="masGustados">Más gustados</option>
                        <option value="masCompartidos">Más compartidos</option>
                    </select>
                </div>
                <button @click="onResetFilters">Reiniciar filtros</button>
            </div>

            <div class="main__programasContent">
                <div class="main__programasTitle">
                    <span>Programas</span>
                </div>
                <swiper
                class="swiper"
                :space-between="30"
                :slides-per-view="3"
                :free-mode="true"
                :pagination="{ clickable: true }"
                :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
                >
                <swiper-slide
                    v-for="content in programasContent"
                    :key="content.id"
                >
                    <ProgramaCard :content="content" />
                </swiper-slide>
                <div class="swiper-button-prev">‹</div>
                <div class="swiper-button-next">›</div>
                </swiper>
            </div>

            <div class="main__episodiosContent">
                <div class="main__episodiosTitle">
                    <span>Episodios</span>
                </div>
                <swiper
                class="swiper"
                :space-between="30"
                :slides-per-view="3"
                :free-mode="true"
                :pagination="{ clickable: true }"
                :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
                >
                <swiper-slide
                    v-for="content in rsContent"
                    :key="content.id"
                >
                    <RsCard :content="content" />
                </swiper-slide>
                <div class="swiper-button-prev">‹</div>
                <div class="swiper-button-next">›</div>
                </swiper>
            </div>
        </section>
    </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation } from "swiper";
import RsCard from "../components/cards/RsCard.vue";
import ProgramaCard from "../components/cards/ProgramaCard.vue";

export default {
    computed: {
        ...mapStores(useContentStore),
        topTrendingRsContent() {
            return this.contentStore.getTopTrendingRsContent;
            
        },
        rsContent(){
            return this.contentStore.getRadioSamanContent;
        },
        programasContent(){
            return this.contentStore.getProgramasContent;
        },
        
    },
    mounted() {
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

<style lang="scss">

</style>