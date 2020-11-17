import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";

Vue.use(VueAxios, axios)
Vue.use(Vant);


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
