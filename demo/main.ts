import { createApp } from 'vue';
import AntDesignVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';

// import I18n from './i18n';

const app = createApp(App);

app.use(AntDesignVue);
// app.use(I18n);

app.mount('#app');
