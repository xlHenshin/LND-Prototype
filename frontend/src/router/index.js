import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import CircularView from "../views/CircularView.vue";
import RadioSamanView from "../views/RadioSamanView.vue";

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
  {
    path: "/circular",
    name: "Circular",
    component: CircularView,
  },
  {
    path: "/radiosaman",
    name: "RadioSaman",
    component: RadioSamanView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
