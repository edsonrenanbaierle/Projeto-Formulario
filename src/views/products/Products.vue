<!-- eslint-disable vue/valid-v-slot -->
<template>
  <Fragment>
    <v-container>
      <v-col cols="10" class="mx-auto">
        <div
          style="width: 100%"
          :class="!smAndUp ? 'd-flex justify-center' : ''"
        >
          <v-btn
            color="green"
            rounded
            class="btn-primary mb-10 mx-auto"
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
      </v-col>
    </v-container>
    <confirmation-modal
      @confirm="$products_controller.deleteProduct()"
      @cancel="cancelAction"
    ></confirmation-modal>
    <ModalProducts />
  </Fragment>
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
thead > tr > th:last-child {
  position: sticky !important;
  position: -webkit-sticky !important;
  right: 0;
}

thead > tr > th > span > svg {
  fill: #fff !important;
}

tbody > tr > td {
  padding: 0 8px !important;
}

tbody > tr > td:last-child {
  position: sticky !important;
  position: -webkit-sticky !important;
  right: 0;
  background-color: #fff;
}
</style>
