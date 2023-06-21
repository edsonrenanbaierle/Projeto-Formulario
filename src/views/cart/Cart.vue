<template>
  <div>
    <v-container>
      <template v-if="$cart.cart.length == 0">
        <p
          class="headline d-flex justify-center align-center flex-column"
          style="height: 80vh; width: 100%"
        >
          <v-icon size="80" class="mb-5">mdi-cart-off</v-icon>
          Não há produtos no carrinho
        </p>
      </template>
      <template v-else>
        <v-row cols="6">
          <v-col>
            <v-col
              :cols="$vuetify.breakpoint.mdAndUp ? 12 : 12"
              v-for="(cartProduct, index) in $cart.cart"
              :key="index"
              class="pt-0"
            >
              <v-card class="rounded-xl pa-2" elevation="4">
                <v-card-title>
                  {{ cartProduct.produtoDescricao }}
                </v-card-title>
                <v-card-text>{{
                  cartProduct.produtoValor | moeda
                }}</v-card-text>
                <v-card-text
                  >Quantidade: {{ cartProduct.quantidade }}</v-card-text
                >
                <v-card-actions
                  ><v-btn
                    class="btn-remove-item btn-primary"
                    fab
                    color="red"
                    @click="$cart.removeProduct(index)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  ></v-card-actions
                >
              </v-card>
            </v-col>
          </v-col>
          <v-col
            cols="6"
            v-if="$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <v-card
              class="checkout-resume rounded-xl d-flex flex-column align-center"
              elevation="8"
              min-height="500"
            >
              <v-card-title class="headline"
                ><v-icon class="ml-3" size="40">mdi-cart</v-icon></v-card-title
              >
              <v-card-text class="body-1 text-center font-weight-black">
                Total: {{ totalValue | moeda }} <br />
                Produtos: {{ $cart.cart.length }}
              </v-card-text>
              <div class="d-flex">
                <div class="d-flex flex-column align-center mr-8">
                  <v-btn
                    fab
                    @click="paymentMethods('PIX')"
                    class="btn-primary mb-3"
                    :color="activePix ? 'green' : 'grey'"
                    ><v-icon>mdi-contactless-payment</v-icon></v-btn
                  >
                  <span class="body-1">Pix</span>
                </div>
                <div class="d-flex flex-column align-center">
                  <v-btn
                    fab
                    :color="activeMoney ? 'green' : 'grey'"
                    @click="paymentMethods('DINHEIRO')"
                    class="btn-primary mb-3"
                    ><v-icon>mdi-cash-multiple</v-icon></v-btn
                  >
                  <span class="body-1">Dinheiro</span>
                </div>
              </div>
              <v-card-actions
                ><v-btn
                  class="btn-primary"
                  color="green"
                  :loading="$cart.finish_button"
                  rounded
                  @click="$cart.finishOrder()"
                  >Finalizar pedido</v-btn
                ></v-card-actions
              >
            </v-card>
          </v-col>
        </v-row>
      </template>
      <!-- {{ totalValue | moeda }} -->
    </v-container>
    <v-container v-if="!$cart.cart.length == 0">
      <v-col cols="12" v-if="!$vuetify.breakpoint.mdAndUp">
        <v-card
          class="checkout-resume-sm rounded-xl d-flex flex-column align-center"
          elevation="8"
          min-height="500"
        >
          <v-card-title class="headline"
            ><v-icon class="ml-3" size="40">mdi-cart</v-icon></v-card-title
          >
          <v-card-text class="body-1 text-center font-weight-black">
            Total: {{ totalValue | moeda }} <br />
            Produtos: {{ $cart.cart.length }}
          </v-card-text>
          <div class="d-flex">
            <div class="d-flex flex-column align-center mr-8">
              <v-btn
                fab
                @click="paymentMethods('PIX')"
                class="btn-primary mb-3"
                :color="activePix ? 'green' : 'grey'"
                ><v-icon>mdi-contactless-payment</v-icon></v-btn
              >
              <span class="body-1">Pix</span>
            </div>
            <div class="d-flex flex-column align-center">
              <v-btn
                fab
                :color="activeMoney ? 'green' : 'grey'"
                @click="paymentMethods('DINHEIRO')"
                class="btn-primary mb-3"
                ><v-icon>mdi-cash-multiple</v-icon></v-btn
              >
              <span class="body-1">Dinheiro</span>
            </div>
          </div>
          <v-card-actions
            ><v-btn
              class="btn-primary"
              color="green"
              rounded
              :loading="$cart.finish_button"
              @click="$cart.finishOrder()"
              >Finalizar pedido</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "cartCheckout",
  metaInfo: {
    title: "Carrinho | Comida de Rua",
  },
  data: () => ({
    activePix: false,
    activeMoney: false,
  }),
  methods: {
    paymentMethods(method) {
      this.$cart.tipo.forma_pag = method;
      if (method == "PIX") {
        this.activePix = true;
        this.activeMoney = false;
      } else {
        this.activePix = false;
        this.activeMoney = true;
      }
    },
  },
  computed: {
    totalValue() {
      let total = 0;
      this.$cart.cart.forEach((item) => {
        total += item.produtoValor * item.quantidade;
      });
      return total;
    },
    quantityItems() {
      let total = 0;
      this.$cart.cart.forEach((item) => {
        total += item.quantidade;
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
<style>
.checkout-resume {
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 30rem;
}
.checkout-resume-sm {
  display: flex;
  justify-content: space-around;
}
.btn-remove-item {
  position: absolute;
  top: 2rem;
  right: 2rem;
  transition: 0.4s ease-in-out;
}
.btn-remove-item:hover {
  transform: scale(1.1);
}
</style>
