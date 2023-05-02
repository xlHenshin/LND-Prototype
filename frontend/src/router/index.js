import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
