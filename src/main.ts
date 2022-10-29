import { createApp } from 'vue';
import AntDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';

const app = createApp(App);

app.use(AntDesignVue);

app.mount('#app');
