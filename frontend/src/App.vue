<template>
  <div id="app">
    <Sidebar/>
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #EDEDED;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
