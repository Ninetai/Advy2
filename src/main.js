import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import GetTextPlugin from "vue-gettext";
import translations from "./translations.json";
import {
  AVAILABLE_LANGUAGES,
  getLanguage,
  DEFAULT_LANGUAGE,
} from "@/services/locale.service";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import "./style/index.scss";
let cookieDomain = process.env.VUE_APP_BASE_URL_LANDING || "advy.ai";
cookieDomain = cookieDomain.replace("https://", "");

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(GetTextPlugin, {
  availableLanguages: AVAILABLE_LANGUAGES,
  defaultLanguage: getLanguage(),
  translations: translations,
  silent: true,
});
Vue.use(VueCookies, { expire: "7d", path: "/", domain: cookieDomain });

Vue.filter('formatNumber', function(n) {
  if (!n) return 0
  return Intl.NumberFormat(getLanguage()).format(n);
})

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
