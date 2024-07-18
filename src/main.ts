import './assets/main.css';
import { createApp, type Component } from 'vue';
import App from './App.vue';
import { pinia } from './stores';
import router from './router';

const app = createApp(App as Component);

app.use(pinia);
app.use(router);

app.mount('#app');
