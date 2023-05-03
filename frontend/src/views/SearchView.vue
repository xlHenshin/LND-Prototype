<template>

  <main class="main">
    <ContentFilter/>

    <div class="main__rs">
      <h3>Radio Samán</h3>
      <h2>Nuevos episodios</h2>
      <div class="main__cards">
        <ContentCard/>
      </div>
    </div>
    
  </main>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import ContentFilter from "../components/ContentFilter.vue";
import ContentCard from "../components/ContentCard.vue";

export default {

  computed: {
    ...mapStores(useContentStore),
    rsContent(){
      return this.contentStore.getRadioSamanContent;
    }
  },

  mounted() {
    this.contentStore.getRsData()
  },

  components:{
        ContentFilter,
        ContentCard
  }
}
</script>

<style lang="scss">
  .main{
    width: 100%;

    &__rs{
      padding: 8vw 10vw 4vw 10vw;
    }

    &__cards{
      margin: 0;
      width: 100%;
    }
  }
</style>