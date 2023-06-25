import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import baseLayout from "@/layouts/baseLayout.vue";
import meta from "vue-meta";

Vue.use(VueRouter);
Vue.use(meta);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/home",
    name: "",
    component: baseLayout,
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../views/HomeView.vue"),
        meta: {
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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
          requiresAuth: true,
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("isAuth");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
