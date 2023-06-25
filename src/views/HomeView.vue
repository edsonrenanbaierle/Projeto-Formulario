<!-- eslint-disable vue/valid-v-for -->
<template>
  <v-container>
    <div class="d-flex justify-center align-center mb-10">
      <h1 :class="!$vuetify.breakpoint.smAndUp ? 'btn-sm' : ''">
        Produtos Disponíveis
      </h1>
    </div>
    <div
      v-if="$products_controller.all_products.length == 0"
      style="height: 80vh; width: 100%"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        :size="90"
        :width="10"
        color="green"
      ></v-progress-circular>
    </div>
    <v-row v-else>
      <v-col
        md="4"
        sm="6"
        lg="3"
        cols="12"
        v-for="(products, index) in $products_controller.all_products"
        :key="index"
      >
        <v-card class="hover-card rounded-xl pa-2" elevation="4">
          <v-card-title> {{ products.produtoDescricao }}</v-card-title>
          <v-card-text> {{ products.produtoValor | moeda }}</v-card-text>
          <v-card-actions>
            <v-row align="center" class="ma-0">
              <v-btn fab x-small plain @click="decrementProduct(index)"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
              <span class="mx-2">
                {{ $cart.item_amount[index].quantidade }}
              </span>
              <v-btn fab x-small @click="incrementProduct(index)" color="green"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </v-row>
            <v-btn
              rounded
              color="green"
              :disabled="$cart.item_amount[index].quantidade == 0"
              class="btn-primary"
              @click="$cart.addProduct()"
              >Adicionar<v-icon class="pl-1">mdi-cart</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "homeView",
  metaInfo: {
    title: "Produtos Disponíveis | Comida de Rua",
  },
  data() {
    return {};
  },
  methods: {
    showToast() {
      this.$toast.success("Produto adicionado");
    },
    incrementProduct(index) {
      if (!this.$cart.item_amount[index]) {
        this.$cart.item_amount[index] = {
          produtoId: this.$products_controller.all_products[index].produtoId,
          produtoDescricao: this.$products_controller[index].produtoDescricao,
          produtoValor: this.$products_controller[index].produtoValor,
          quantidade: 0,
        };
      }
      this.$cart.item_amount[index].quantidade++;
    },
    decrementProduct(index) {
      if (
        this.$cart.item_amount[index] &&
        this.$cart.item_amount[index].quantidade > 0
      ) {
        this.$cart.item_amount[index].quantidade--;
      }
    },
  },
  watch: {
    "$products_controller.all_products"() {
      const value = this.$products_controller.all_products.map((product) => ({
        produtoId: product.produtoId,
        produtoDescricao: product.produtoDescricao,
        produtoValor: product.produtoValor,
        quantidade: 0,
      }));
      this.$cart.item_amount = value;
    },
  },
  mounted() {
    this.$products_controller.getAllProducts();
    if (localStorage.getItem("cachedCart")?.length > 0) {
      this.$cart.cart = JSON.parse(localStorage.getItem("cachedCart"));
    }
  },
  updated() {
    localStorage.setItem("cachedCart", JSON.stringify(this.$cart.cart));
  },
  destroyed() {
    this.$products_controller.all_products = [];
  },
};
</script>
<style scoped>
.btn-primary:hover {
  transform: scale(1.03);
}
.btn-sm {
  font-size: 1.7rem;
}
/* .hover-card {
  position: relative;
  top: 0;
  transition: 0.4s ease-in-out;
}
.hover-card:hover {
  transform: scale(1.07);
} */
</style>
