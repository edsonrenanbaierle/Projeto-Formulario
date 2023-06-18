import Vue from "vue";

Vue.prototype.$cart = new Vue({
  data: () => ({
    item_amount: [],
    cart: [],
  }),
  methods: {
    addProduct() {
      const availableItems = this.item_amount.filter(
        (item) => item.quantidade > 0
      );

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
    },

    removeProduct(index) {
      this.cart.splice(index, 1);
    },
  },
});
