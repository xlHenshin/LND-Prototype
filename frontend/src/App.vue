<template>
  <div class="app">
    <Sidebar v-if="uiStore.showSidebar" class="sidebar"/>

    <div class="main-content" :style="{ 'padding-left': contentPadding }">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import { mapStores } from 'pinia';
import { useUiStore } from './stores/uiStore.js';

export default {
  components: {
    Sidebar
  },
  computed: {
    ...mapStores(useUiStore),
    isSidebarExpanded() {
      return this.uiStore.isSidebarExpanded;
    },
    contentPadding() {
      if (!this.uiStore.showSidebar) {
        return '0';
      }
      return this.isSidebarExpanded ? 'calc(16vw + 32px)' : 'calc(6vw + 32px)';
    }
  },
  watch: {
    'uiStore.showSidebar': function(newVal) {
      if (!newVal) {
        this.uiStore.isSidebarExpanded = false;
      }
    }
  },
};
</script>

<style lang="scss">
.app {
  background-color: #EDEDED;
}

.sidebar {
  position: fixed;
  z-index: 1000;
}

.main-content {
  width: 100%;
  transition: padding-left 0.2s ease-out;
}
</style>
