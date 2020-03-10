import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import Axios from 'axios';

import 'ant-design-vue/dist/antd.css';

Vue.prototype.$axios = Axios;

//配置全局的axios默认值（可选）

Axios.defaults.baseURL = 'http:/127.0.0.1:8000';

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
    render: h => h(App)
}).$mount('#app');
