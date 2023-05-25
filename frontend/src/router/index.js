import { createRouter, createWebHistory } from "vue-router";
import { useContentStore } from "@/stores/contentStore";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import CircularView from "../views/CircularView.vue";
import RadioSamanView from "../views/RadioSamanView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ContentView from "../views/ContentView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/search/:type",
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
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: '/content/:id',
    name: 'Content',
    component: ContentView,
    beforeEnter: async (to, from, next) => {
      const contentId = to.params.id;
      const contentStore = useContentStore();
      
      // Cargar los datos si no están disponibles
      if (contentStore.allRsContent.length === 0) {
        await contentStore.getRsData();
      }

      // Comprobar si el contenido existe
      const content = contentStore.getContentById(contentId);
      if (content) {
        next();
      } else {
        // Redirigir a una página de error 404 personalizada o a otra página si el contenido no se encuentra
        next({ name: "Home" });  // Debes definir esta ruta en caso de que el contenido no exista
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
