<template>
  <v-container>
    <!-- troca do tema -->
    <v-app-bar
      :color="isDark ? '#121212' : '#FFFFFF'"
      :elevation="elevation"
      width="100%"
      app
      :class="$vuetify.breakpoint.mdAndUp ? 'navbar-desk' : ''"
    >
      <v-toolbar-title @click="$router.push('/')" class="cursor-pointer"
        ><img
          :src="isDark ? logoDARK : logoImg"
          alt="logo"
          width="200"
          class="pt-3"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <!-- <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          ><v-icon>{{
            isDark ? "mdi-weather-sunny" : "mdi-weather-night"
          }}</v-icon></v-btn
        > -->
        <v-btn icon class="mr-2" to="/checkout">
          <v-icon>mdi-cart</v-icon>
          <v-badge
            :content="$cart.cart.length"
            color="green"
            overlap
            bordered
            class="badge-cart"
            v-if="$cart.cart.length > 0"
          ></v-badge>
        </v-btn>
        <v-menu rounded="lg" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <!-- rota definida para a home -->
            <v-list-item link to="/">
              <v-list-item-icon>
                <v-icon :color="isDark ? 'white' : 'black'">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title :class="isDark ? 'text-white' : ''"
                >Home</v-list-item-title
              >
            </v-list-item>
            <!-- rota definida /products -->
            <v-list-item link to="/products">
              <v-list-item-icon>
                <v-icon :color="isDark ? 'white' : 'black'">mdi-store</v-icon>
              </v-list-item-icon>
              <v-list-item-title :class="isDark ? 'text-white' : ''"
                >Produtos</v-list-item-title
              >
            </v-list-item>
            <!-- rota definida /relatorio-pedidos -->
            <v-list-item link to="/relatorio-pedidos">
              <v-list-item-icon>
                <v-icon :color="isDark ? 'white' : 'black'"
                  >mdi-clipboard-text-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title :class="isDark ? 'text-white' : ''"
                >Meus Pedidos</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-btn icon class="ml-2" to="/checkout">
          <v-icon>mdi-cart</v-icon>
          <v-badge
            :content="$cart.cart.length"
            color="green"
            overlap
            bordered
            class="badge-cart"
            v-if="$cart.cart.length > 0"
          ></v-badge>
        </v-btn>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="isDark ? '#121212' : 'green'"
      app
      class="btn-primary"
      v-if="!$vuetify.breakpoint.mdAndUp"
    >
      <v-btn icon class="close-button" @click="drawer = false">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
      <v-list class="teste mt-10">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon color="white">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white">Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/products">
          <v-list-item-icon>
            <v-icon color="white">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white">Produtos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/relatorio-pedidos">
          <v-list-item-icon>
            <v-icon color="white">mdi-clipboard-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white">Meus Pedidos</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list-item link @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-list-item-icon>
            <v-icon color="white">{{
              isDark ? "mdi-weather-sunny" : "mdi-weather-night"
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white">{{
            isDark ? "Tema Claro" : "Tema Escuro"
          }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  name: "NavbarComponent",
  //dados
  data: () => ({
    drawer: false, //verifica se o menu lateral ou fechado
    elevation: 0,
    logoImg: require("@/assets/logoCR.png"), //requicisão da loco light
    logoDARK: require("@/assets/logoDARK.png"), //requicisão da loco dark
  }),
  //define uma propriedade
  computed: {
    //verifica se o tema atual é dark ou não
    isDark() {
      if (this.$vuetify.theme.dark) {
        return true;
      }
      return false;
    },
  },
  //utilizado para armazenar o tema
  updated() {
    localStorage.setItem("userTheme", this.$vuetify.theme.dark); //seta o tema no localstorage
  },
  //executa codigos em momentos específicos
  mounted() {
    window.addEventListener("scroll", this.handleScroll); //evento que fica esperando o handleScroll
    const theme = localStorage.getItem("userTheme"); //pega o tema do localStorage
    this.$vuetify.theme.dark = JSON.parse(theme); //faz com que mesmo atualizando a página continue o mesmo tema
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); //remove o event de handleScroll
  },
  methods: {
    //metodo que cria o scroll
    handleScroll() {
      this.elevation = window.scrollY > 0 ? 3 : 0; //cria o efeito de rolagem
    },
  },
};
</script>
<style>
/* estilos */
.v-toolbar__content {
  padding: 0 !important;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.text-white {
  color: white !important;
}
.badge-cart {
  position: absolute;
  top: 0;
  right: 8px;
}
.cursor-pointer {
  cursor: pointer;
}
.navbar-desk {
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>
