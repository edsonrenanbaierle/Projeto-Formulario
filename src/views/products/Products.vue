<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-col cols="10" class="mx-auto">
      <v-card elevation="4" class="pa-5 rounded-xl">
        <div class="mb-10 d-flex justify-center">
          <h1>Produtos</h1>
        </div>
        <div
          style="width: 100%"
          :class="!smAndUp ? 'd-flex justify-center' : 'd-flex justify-end'"
        >
          <v-btn
            color="green"
            rounded
            class="btn-primary"
            @click="openModal('new')"
          >
            <v-icon>mdi-plus</v-icon>
            Adicionar Produto
          </v-btn>
        </div>
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
          <template v-slot:item.actions="{ item }">
            <v-btn
              class="mr-5"
              icon
              small
              color="grey"
              @click="openModal('edit', item)"
            >
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="red"
              @click="openDeleteModal(item.produtoId)"
            >
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <confirmation-modal
      @confirm="$products_controller.deleteProduct()"
      @cancel="cancelAction"
    ></confirmation-modal>
    <ModalProducts />
  </v-container>
</template>
<script>
import ProductsMixins from "@/mixins/Products.mixins";
import displayHelpers from "@/mixins/DIsplayHelpers";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Produto",
  mixins: [ProductsMixins, displayHelpers],
  components: {
    ModalProducts: () =>
      import("@/components/Products/Modal/Modal-products.vue"),
    confirmationModal: () =>
      import("@/components/Products/Modal/Modal-delete.vue"),
  },
  metaInfo: {
    title: "Cadastro de Produtos | Comida de Rua",
  },
  data: () => ({
    showModal: false,
  }),
  methods: {
    cancelAction() {
      this.$products_controller.openDelete = false;
    },
  },
  mounted() {
    this.$products_controller.getAllProducts();
  },
  destroyed() {
    this.$products_controller.all_products = [];
  },
};
</script>
