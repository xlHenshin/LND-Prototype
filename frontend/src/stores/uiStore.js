import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
    state: () => ({
        showSidebar: true,
        isSidebarExpanded: false,
    }),
    actions: {
        toggleSidebar(show) {
            this.showSidebar = show;
        },
        toggleSidebarExpanded(expanded) {
            this.isSidebarExpanded = expanded;
        }
    },
});