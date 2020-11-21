import Vue from "vue";

import router from "./router";
import store from "./store";

import Vant from "vant";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import { Toast } from 'vant';
 
import "vant/lib/index.css";
// import "../static/mui/css/mui.min.css";
// import "../static/mui/fonts/mui.ttf";
// import "../static/css/site.css"

import App from "./App.vue";

Vue.use(VueAxios, axios)
Vue.use(Vant);

axios.interceptors.request.use(function (config) {
  Toast.setDefaultOptions({ duration: 0 });
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

axios.defaults.baseURL = "http://api.cms.liulongbin.top/";
Vue.prototype.$axios = axios; 

Vue.config.productionTip = false;

Vue.filter("time_format",time=>{
  var lasttime = "YYYY-MM-DD hh:mm:ss"
  return moment(time).format(lasttime)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
