<!-- eslint-disable vue/valid-v-slot -->
<template>
  <Fragment>
    <v-container>
      <v-col cols="10" class="mx-auto">
        <v-btn
          color="green"
          rounded
          class="btn-primary mb-10"
          @click="openModal('new')"
        >
          <v-icon>mdi-plus</v-icon>
          Adicionar Produto
        </v-btn>
        <v-data-table
          :headers="headersProducts"
          :items="$products_controller.all_products"
          :loading="$products_controller.loading_table"
          :items-per-page="10"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50],
            itemsPerPageText: 'Produtos por página:',
          }"
          loading-text="Buscando Produtos..."
          no-data-text="Não há produtos"
          class="mt-10"
        >
          <template v-slot:item.produtoValor="{ item }">
            {{ item.produtoValor | moeda }}
          </template>
        </v-data-table>
      </v-col>
    </v-container>
    <ModalProducts />
  </Fragment>
</template>
<script>
import ProductsMixins from "@/mixins/Products.mixins";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Produto",
  mixins: [ProductsMixins],
  components: {
    ModalProducts: () =>
      import("@/components/Products/Modal/Modal-products.vue"),
  },
  data: () => ({}),
  mounted() {
    this.$products_controller.getAllProducts();
  },
};
</script>
<style>
.v-data-table__wrapper {
  border-radius: 10px;
}
.v-data-table-header {
  background-color: #4caf50;
}
.text-center.sortable {
  color: white !important;
}
</style>
