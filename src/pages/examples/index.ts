import { createApp } from 'vue';
import App from './index.vue';
import router from './router';

/**
 * 改为插件 unplugin-vue-components 自动导入
 *
  import ElementPlus from 'element-plus'
  import 'element-plus/dist/index.css'
  app.use(ElementPlus)
 */

import './styles/index.scss';

const app = createApp(App);

app.use(router);

app.mount('#app');
