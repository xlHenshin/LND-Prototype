<template>
  <div class="app">
    <Sidebar/>

    <router-view/>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components:{
    Sidebar
  }
}
</script>

<style>
.app {
  background-color: #EDEDED;
  display: flex;
}

</style>
