<template>
  <div class="app">
    <Sidebar class="sidebar" @toggle="handleSidebarToggle"/>

    <div :class="{'main-content': true, 'sidebar-expanded': isSidebarExpanded}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      isSidebarExpanded: false
    };
  },
  methods: {
    handleSidebarToggle(expanded) {
      this.isSidebarExpanded = expanded;
    }
  }
};
</script>

<style lang="scss">
.app {
  background-color: #EDEDED;
  display: flex;
}

.sidebar {
  position: fixed;
  z-index: 1000;
}

.main-content {
  margin-left: calc(8rem + 32px);
  transition: margin-left 0.2s ease-out;
}

.sidebar-expanded {
  margin-left: 16vw;
}
</style>
