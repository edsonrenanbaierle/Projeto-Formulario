// importação de bibliotecas entre outros
import Vue from "vue";
import App from "./App.vue";
import Fragment from "vue-fragment";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "./stylesGlobal.css";
import VueTheMask from "vue-the-mask";
import VueMeta from "vue-meta";

import "vue-toastification/dist/index.css";

//HELPERS
import "@/helpers";

//PRODUCTS CONTROLLER
import "@/controllers/Products.controller";

//PEDIDOS CONTROLLER
import "@/controllers/Pedidos.controller";

//CART CONTROLLER
import "@/controllers/cart.controller";
Vue.use(VueMeta);
Vue.use(VueTheMask);

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
