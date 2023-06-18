<template>
  <v-container>
    <v-app-bar elevation="0" color="#FFFFFF">
      <v-toolbar-title @click="$router.push('/')" class="cursor-pointer"
        ><img src="@/assets/logoCR.png" alt="logo" width="200" class="pt-3"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn text color="green" rounded class="btn-primary mr-2" to="/"
          >Home</v-btn
        >
        <v-btn color="green" rounded class="btn-primary mr-2" to="/products"
          >Produtos</v-btn
        >
        <v-btn color="green" rounded class="btn-primary" to="/relatorio-vendas"
          >Relatório de vendas</v-btn
        >
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
      color="green"
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
        <v-list-item link to="/relatorio-vendas">
          <v-list-item-icon>
            <v-icon color="white">mdi-clipboard-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-white"
            >Relatório de vendas</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  name: "NavbarComponent",
  data: () => ({
    drawer: false,
  }),
};
</script>
<style>
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
</style>
