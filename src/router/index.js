import Vue from "vue"; //importação do vue
import VueRouter from "vue-router"; //importação do vue-router responsavel pelas rotas
// import HomeView from "../views/HomeView.vue";
import baseLayout from "@/layouts/baseLayout.vue"; //import do layout base

Vue.use(VueRouter); //define viu router como plugin

//definição das rotas
const routes = [
  {
    path: "/", //caminho
    name: "", //nome
    component: baseLayout, //nome do componente
    children: [
      {
        name: "home", //nome
        path: "", //caminho
        component: () => import("../views/HomeView.vue"), //componente exportado
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/checkout",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "checkoutResume",
        path: "",
        component: () => import("../views/cart/Cart.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/products",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "products",
        path: "",
        component: () => import("../views/products/Products.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/relatorio-pedidos",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "relatorio-pedidos",
        path: "",
        component: () => import("../views/relatorios/Pedidos-relatorio.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "*",
    name: "error-page",
    component: () => import("../views/errorPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let isNavigating = false;

router.beforeEach((to, from, next) => {
  if (isNavigating) {
    // Evita a navegação duplicada
    return;
  }

  isNavigating = true;
  next();
});

router.afterEach(() => {
  isNavigating = false;
});
export default router;
