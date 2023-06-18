<template>
  <v-container>
    <p
      class="headline d-flex justify-center align-center"
      v-if="$cart.cart.length == 0"
      style="height: 80vh; width: 100%"
    >
      Não há produtos no carrinho
    </p>
    <v-col
      sm="2"
      md="2"
      lg="2"
      v-for="(cartProduct, index) in $cart.cart"
      :key="index"
      v-else
    >
      <v-card class="rounded-xl pa-2" elevation="4">
        <v-card-title>
          {{ cartProduct.produtoDescricao }}
        </v-card-title>
        <v-card-text>{{ cartProduct.produtoValor | moeda }}</v-card-text>
        <v-card-text>Quantidade: {{ cartProduct.quantidade }}</v-card-text>
        <v-card-actions
          ><v-btn icon @click="$cart.removeProduct(index)"
            ><v-icon>mdi-delete</v-icon></v-btn
          ></v-card-actions
        >
      </v-card>
    </v-col>
    {{ totalValue | moeda }}
  </v-container>
</template>
<script>
export default {
  name: "cartCheckout",
  computed: {
    totalValue() {
      let total = 0;
      this.$cart.cart.forEach((item) => {
        total += item.produtoValor;
      });
      return total;
    },
  },
  updated() {
    localStorage.setItem("cachedCart", JSON.stringify(this.$cart.cart));
  },
  mounted() {
    if (localStorage.getItem("cachedCart").length > 0) {
      this.$cart.cart = JSON.parse(localStorage.getItem("cachedCart"));
    }
  },
};
</script>
