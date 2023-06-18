<!-- eslint-disable vue/no-useless-template-attributes -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-col cols="10" class="mx-auto">
      <v-card elevation="4" class="pa-5 rounded-xl">
        <div class="mb-10 d-flex justify-center">
          <h1>Relatório de Vendas</h1>
        </div>
        <v-data-table
          :headers="headersVenda"
          :items="vendasValues"
          :loading="$vendas_controller.loading_table"
          :items-per-page="10"
          :header-props="{
            sortByText: 'Ordernar',
          }"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50],
            itemsPerPageText: 'Vendas por página:',
          }"
          loading-text="Buscando Vendas..."
          no-data-text="Não há vendas"
          class="mt-10 table-body"
        >
          <template v-slot:item.produtoValor="{ item }">
            {{ item.produtoValor | moeda }}
          </template>
          <template v-slot:item.actions="{ item }" class="table-actions">
            <v-btn
              icon
              small
              color="red"
              @click="openDeleteModal(item.venda_id)"
            >
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <confirmation-modal
      @confirm="$vendas_controller.cancelSale()"
      @cancel="cancelAction"
    ></confirmation-modal>
  </v-container>
</template>
<script>
import vendasMixins from "@/mixins/Vendas.mixins";
export default {
  name: "vendasRelatorios",
  mixins: [vendasMixins],
  components: {
    confirmationModal: () => import("@/components/Vendas/Modal-delete.vue"),
  },
  data() {
    return {};
  },
  methods: {
    cancelAction() {
      this.$vendas_controller.openDelete = false;
    },
  },
  computed: {
    vendasValues() {
      const vendas = this.$vendas_controller.vendas.map(
        (items) => items.produto
      );
      return vendas;
    },
  },
  mounted() {
    this.$vendas_controller.getVendas();
  },
  destroyed() {
    this.$vendas_controller.vendas = [];
  },
};
</script>
<style>
.table-actions {
  height: 67px !important;
  min-height: 67px !important;
  background-color: #4caf50 !important;
}
</style>
