//rotas da aplicação definidas no no vue router
import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import baseLayout from "@/layouts/baseLayout.vue";
import meta from "vue-meta";

Vue.use(VueRouter);
Vue.use(meta);

//definição dos caminhos, nomes e os componentes/paginas das rotas
const routes = [
  {
    path: "/", //caminho
    name: "login", //nome
    component: () => import("../views/login/login.vue"), //pagina de login
  },
  {
    path: "/home", //caminho
    name: "", //nome
    component: baseLayout, //página base
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../views/HomeView.vue"),
        meta: {
          requiresAuth: true, //para ser possivel entrar deve estar logado
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
        name: "checkoutResume", //nome
        path: "", //caminho
        component: () => import("../views/cart/Cart.vue"), //pasta da pagina/componente
        meta: {
          requiresAuth: true, //para ser possivel entrar deve estar logado
        },
      },
    ],
  },
  {
    path: "/products", //caminho
    name: "",
    component: baseLayout,
    children: [
      {
        name: "products", //nome
        path: "",
        component: () => import("../views/products/Products.vue"), //pagina dos produtos
        meta: {
          requiresAuth: true, //para ser possivel entrar deve estar logado
        },
      },
    ],
  },
  {
    path: "/relatorio-pedidos", //caminho
    name: "",
    component: baseLayout,
    children: [
      {
        name: "relatorio-pedidos", //nome do componente
        path: "",
        component: () => import("../views/relatorios/Pedidos-relatorio.vue"), //import do relatório
        meta: {
          requiresAuth: true, //para ser possivel entrar deve estar logado
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

//nova configuração do vue router, para a api
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//verifica se o usuario tem permissão para acessar
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("isAuth"); //pega o token de permissoa
  //verifica se a rota precisa de autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //se tiver o token permitido o accesso
    if (token) {
      next();
      //senão retoma a pagina de login
    } else {
      next("/");
    }
  } else {
    next(); //caso a rota não precise de autenticação continua
  }
});

export default router;
