import { createApp } from 'vue';
import App from './index.vue';
import router from './router';
import store from './store/index';

const app = createApp(App);

// 将 router 实例作为插件
app.use(router);

// 将 store 实例作为插件
app.use(store);

app.mount('#app');
