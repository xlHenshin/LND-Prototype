import { createApp, provide } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "swiper/swiper-bundle.css";
import "bootstrap/dist/css/bootstrap.css";
import "@popperjs/core";
import "bootstrap";
import "@/assets/global.scss";
import { v4 as uuidv4 } from 'uuid';

const app = createApp(App);
const pinia = createPinia();
const emitter = createEmitter();
app.use(pinia);
app.use(router);
app.provide('emitter',emitter)

let sessionId = localStorage.getItem('sessionId');

if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('sessionId', sessionId);
}

app.mount("#app");

function createEmitter() {
    const listeners = new Map();
  
    return {
      $on(event, callback) {
        if (!listeners.has(event)) {
          listeners.set(event, []);
        }
        listeners.get(event).push(callback);
      },
      $off(event, callback) {
        if (!listeners.has(event)) {
          return;
        }
        const stack = listeners.get(event);
        stack.splice(stack.indexOf(callback), 1);
      },
      $emit(event, ...args) {
        if (!listeners.has(event)) {
          return;
        }
        listeners.get(event).forEach((callback) => callback(...args));
      },
    };
}