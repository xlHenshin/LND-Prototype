<template>

  <main class="main">
    <ContentFilter
      @category-change="onCategoryChange"
      @order-change="onOrderChange"
      @reset-filters="onResetFilters"
    />

    <div class="main__rs">
      <h3>Radio Samán</h3>
      <h2 v-if="isShowingNewContent">Nuevos episodios</h2>
      <div class="main__cards">
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
            <router-link :to="`/content/${content.id}`">
              <RsCard :content="content" />
            </router-link>
          </swiper-slide>
        </swiper>

      </div>

    </div>

    <div class="main__c">
      <h3>Circular</h3>
      <h2 v-if="isShowingNewContent">Nuevos episodios</h2>
      <div class="main__cards">
        <swiper
          class="swiper"
          :space-between="30"
          :slides-per-view="3"
          :free-mode="true"
          :pagination="{ clickable: true }"
          :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
        >
          <swiper-slide
            v-for="content in cContent"
            :key="content.id"
          >
            <router-link :to="`/content/${content.id}`">
              <CrCard :content="content" />
            </router-link>
          </swiper-slide>
        </swiper>

      </div>

    </div>
    
  </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import ContentFilter from "../components/ContentFilter.vue";
import RsCard from "../components/cards/RsCard.vue";
import CrCard from "../components/cards/CrCard.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation } from "swiper";

export default {

  computed: {
    ...mapStores(useContentStore),
    rsContent(){
      return this.contentStore.getRadioSamanContent;
    },
    cContent(){
      return this.contentStore.getCircularContent;
    }
  },

  mounted() {
    this.contentStore.getRsData()
    this.contentStore.getCrData()
  },
  

  components:{
        ContentFilter,
        RsCard, CrCard,
        Swiper,
        SwiperSlide,
  },
  methods: {
    onCategoryChange(category) {
      this.selectedCategory = category;
      this.contentStore.updateContentList(this.selectedCategory, this.selectedOrder);
      this.isShowingNewContent = !category && !this.selectedOrder;
    },

    onOrderChange(order) {
      this.selectedOrder = order;
      this.contentStore.updateContentList(this.selectedCategory, this.selectedOrder);
      this.isShowingNewContent = !this.selectedCategory && !order;
    },

    onResetFilters() {
      this.selectedCategory = null;
      this.selectedOrder = null;
      this.contentStore.updateContentList(this.selectedCategory, this.selectedOrder);
      this.isShowingNewContent = true;
    },
    onFilterType(type) {
      console.log('Received filter-type event:', type);
      this.selectedType = type;
      // Lógica para aplicar los filtros según el tipo seleccionado
    },
  },
  data() {
    return {
      swiperOptions: {
        modules: [Pagination, Navigation],
      },
      selectedCategory: null,
      selectedOrder: null,
      isShowingNewContent: true,
    };
  }
}
</script>

<style lang="scss">
  .main{
    width: 100%;

    &__rs{
      padding: 0 10vw 4vw 10vw;
    }

    &__c{
      padding: 0 10vw 4vw 10vw;
    }

    &__cards{
      margin: 0;
      width: 100%;
    }
  }

  .swiper-button-prev, .swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 10;
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
}

</style>