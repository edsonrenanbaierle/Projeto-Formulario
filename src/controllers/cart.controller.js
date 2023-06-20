import Vue from "vue";
import { adicionarPedido } from "@/api/pedidoApi";

Vue.prototype.$cart = new Vue({
  data: () => ({
    item_amount: [],
    cart: [],
    order: [],
    tipo: { forma_pag: "" },
  }),
  methods: {
    addProduct() {
      const availableItems = this.item_amount.filter(
        (item) => item.quantidade > 0
      );
      if (availableItems.length == 0) {
        return this.$toast.error("Adicione a quantidade!");
      }
      availableItems.forEach((item) => {
        const existingItem = this.cart.find(
          (cartItem) => cartItem.produtoId === item.produtoId
        );
        if (existingItem) {
          existingItem.quantidade += item.quantidade;
        } else {
          this.cart.push(JSON.parse(JSON.stringify(item)));
        }
      });

      this.item_amount.forEach((item) => {
        item.quantidade = 0;
      });
      this.$toast.info("Produto adicionado ao carrinho!");
    },

    removeProduct(index) {
      this.cart.splice(index, 1);
      this.$toast.info("Produto removido com sucesso!");
    },
    finishOrder() {
      if (this.tipo.forma_pag == "") {
        return this.$toast.error("Escolha uma forma de pagamento!");
      }
      const order = [...this.cart];
      order.unshift(this.tipo);
      adicionarPedido(order)
        .then(() => {
          this.$toast.info("Pedido realizado com sueceso!");
        })
        .catch(() => {
          this.$toast.error("Ocorreu um erro ao realizar o pedido!");
        });
      console.table(order);
    },
  },
});
