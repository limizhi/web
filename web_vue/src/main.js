import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Bootstrap-vue和Bootstrap
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue); // 在全局注册组件

// 引入axios
import {
  axios_instance
} from "./util/axios"
// 使用示例: this.$axios.get();
Vue.prototype.$axios = axios_instance;

import global_config from "./util/global";
Vue.prototype.$global = global_config;

import qs from "qs";
Vue.prototype.$qs = qs;

//是否未线上环境
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
