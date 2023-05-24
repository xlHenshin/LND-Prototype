<template>

  <main class="main">
    <ContentFilter
      @category-change="onCategoryChange"
      @order-change="onOrderChange"
      @reset-filters="onResetFilters"
    />

    <div class="recommendation" v-if="this.userIsLogged">
      <div class="contentTitle">
          <span>Lo mejor para ti</span>
      </div>
      <div class="cards">
        <swiper
          class="swiper"
          :space-between="30"
          :slides-per-view="3"
          :free-mode="true"
        >
          <swiper-slide
            v-for="(content, index) in recommendations"
            :key="index"
          >
            <router-link :to="`/content/${content.id}`">
              <component :is="getCardComponent(content)" :content="content" />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="recommendation" v-if="this.userIsLogged">
      <div class="contentTitle">
          <span>Te puede gustar</span>
      </div>
      <div class="cards">
        <swiper
          class="swiper"
          :space-between="30"
          :slides-per-view="3"
          :free-mode="true"
        >
          <swiper-slide
            v-for="(content, index) in secondaryRecommendations"
            :key="index"
          >
            <router-link :to="`/content/${content.id}`">
              <component :is="getCardComponent(content)" :content="content" />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="recommendation">
      <div class="recommendationTitle">
          <span>Radio Samán</span>
          <h2 v-if="isShowingNewContent">Nuevos episodios</h2>
      </div>
      <div class="cards">
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
            <router-link class="routerlink" :to="`/content/${content.id}`">
              <RsCard :content="content" />
            </router-link>
          </swiper-slide>
        </swiper>

      </div>

    </div>

    <div class="recommendation">
      <div class="recommendationTitle">
          <span>Circular</span>
          <h2 v-if="isShowingNewContent">Nuevos episodios</h2>
      </div>
      <div class="cards">
        <swiper
          class="swiper"
          :space-between="30"
          :slides-per-view="3"
          :free-mode="true"
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
import { useAuthenticationStore } from '../stores/authentication';
import { useUiStore } from '../stores/uiStore.js';
import ContentFilter from "../components/ContentFilter.vue";
import RsCard from "../components/cards/RsCard.vue";
import CrCard from "../components/cards/CrCard.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation } from "swiper";

export default {

  computed: {
    ...mapStores(useContentStore, useAuthenticationStore, useUiStore),
    rsContent(){
      return this.contentStore.getRadioSamanContent;
    },
    cContent(){
      return this.contentStore.getCircularContent;
    },
    topCategories() {
      if (!this.authenticationStore.userInfo || !this.authenticationStore.userInfo.category_profile) return [];
      const categoryProfile = this.authenticationStore.userInfo.category_profile;
      const categories = Object.keys(categoryProfile);
      categories.sort((a, b) => categoryProfile[b].score - categoryProfile[a].score);
      return categories.slice(0, 3);
    },
    userIsLogged(){
      console.log(this.authenticationStore.user)
      return this.authenticationStore.user !== null
    },
    userInfo(){
      return this.authenticationStore.getUserInfo;
    },
  },

  async created() {
    this.uiStore.toggleSidebar(true)
    await this.authenticationStore.authState();
    this.contentStore.getRsData();
    this.contentStore.getCrData();
    if(this.userIsLogged){
        try {
            await this.loadUserData();
            this.recommendations = await this.calculateRecommendations();
            this.secondaryRecommendations = await this.calculateSecondaryRecommendations();
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    }
  },

  components:{
    ContentFilter,
    RsCard, CrCard,
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
  async calculateRecommendations() {
    let recommendationPairs = [];
    const tCat = this.topCategories;
    const recommendedContent = await this.contentStore.getContentByCategories(tCat);
    if (recommendedContent) {
      for (let content of recommendedContent) {
        for (let category of this.topCategories) {
          if (content.categoria.includes(category)) {
            recommendationPairs.push({category, content});
          }
        }
      }
    }

    recommendationPairs.sort((a, b) => {
      const scoreA = Math.max(...a.content.categoria.map(category => this.authenticationStore.userInfo.category_profile[category]?.score || 0));
      const scoreB = Math.max(...b.content.categoria.map(category => this.authenticationStore.userInfo.category_profile[category]?.score || 0));
      
      return scoreB - scoreA;
    });
      const recommendations = recommendationPairs.slice(0, 9).map(pair => pair.content);
      return recommendations;
  },
    async calculateSecondaryRecommendations() {
      let secondaryRecommendationPairs = [];

      // Find the most similar user
      const mostSimilarUser = await this.contentStore.findSimilarUser(this.authenticationStore.userInfo);

      if (!mostSimilarUser) {
        console.log('No similar user found.');
        return [];
      }


      // Get the 2nd and 3rd top categories of the most similar user
      const categories = Object.keys(mostSimilarUser.category_profile);
      categories.sort((a, b) => mostSimilarUser.category_profile[b].score - mostSimilarUser.category_profile[a].score);
      const secondaryCategories = categories.slice(1, 3);

      // Get content based on the 2nd and 3rd top categories
      const secondaryRecommendedContent = await this.contentStore.getContentByCategories(secondaryCategories);

      // Rest of the recommendation logic
      if (secondaryRecommendedContent) {
        for (let content of secondaryRecommendedContent) {
          for (let category of secondaryCategories) {
            if (content.categoria.includes(category)) {
              secondaryRecommendationPairs.push({category, content});
            }
          }
        }
      }

      secondaryRecommendationPairs.sort((a, b) => {
        const scoreA = Math.max(...a.content.categoria.map(category => this.authenticationStore.userInfo.category_profile[category]?.score || 0));
        const scoreB = Math.max(...b.content.categoria.map(category => this.authenticationStore.userInfo.category_profile[category]?.score || 0));

        return scoreB - scoreA;
      });

      // Filter out the recommendations that are already in the primary set.
      const primaryRecommendationIds = this.recommendations.map(r => r.id);
      secondaryRecommendationPairs = secondaryRecommendationPairs.filter(pair => !primaryRecommendationIds.includes(pair.content.id));

      const secondaryRecommendations = secondaryRecommendationPairs.slice(0, 9).map(pair => pair.content);
      return secondaryRecommendations;
    },
    getCardComponent(content) {
      return content.medio === 'rs' ? 'RsCard' : 'CrCard';
    },
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
      recommendations: [],
      secondaryRecommendations: [],
    };
  }
}
</script>

<style scoped lang="scss">
  .main{
    width: 100%;

    .recommendation{
        padding: 0 10vw 0 10vw;
        margin-bottom: 4vw;

        .recommendationTitle{
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

        .contentTitle{
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
                    background-color: #6546FC;
                }
            }
        }
      }
  }
  .routerlink{
    text-decoration: none;
  }

</style>