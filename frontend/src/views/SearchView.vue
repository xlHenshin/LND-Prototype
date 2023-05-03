<template>
  <ContentFilter/>
</template>

<script>
import { mapStores } from "pinia";
import { useContentStore } from "@/stores/contentStore";
import ContentFilter from "../components/ContentFilter.vue";

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
        ContentFilter
  }
}
</script>

<style>

</style>