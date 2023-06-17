<template>
  <v-container>
    <v-app-bar elevation="0" color="#FFFFFF">
      <v-toolbar-title
        ><img src="@/assets/logoCR.png" alt="logo" width="200" class="pt-3"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="green" rounded class="btn-primary mr-2" to="/"
        >Home</v-btn
      >
      <v-btn color="green" rounded class="btn-primary mr-2" to="/products"
        >Produtos</v-btn
      >
      <v-btn color="green" rounded class="btn-primary" to="/relatorio-vendas"
        >Relatório Vendas</v-btn
      >
    </v-app-bar>
  </v-container>
</template>
<script>
export default {
  name: "NavbarComponent",
};
</script>
<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>
