import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css';

import '@popperjs/core';
import 'bootstrap';

import './assets/global.scss';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia);
app.use(router);

app.mount('#app')