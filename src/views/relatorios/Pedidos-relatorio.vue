<!-- eslint-disable vue/no-useless-template-attributes -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-col cols="10" class="mx-auto">
      <v-card elevation="4" class="pa-5 rounded-xl">
        <div class="mb-10 d-flex justify-center">
          <h1>Meus Pedidos</h1>
        </div>
        <div style="width: 100%" class="d-flex justify-end">
          <v-btn
            :loading="$pedidos_controller.loading_relatorio"
            color="green"
            rounded
            class="btn-primary"
            @click="exportToCSV"
          >
            <v-icon>mdi-file-download</v-icon>
            Exportar para CSV
          </v-btn>
        </div>
        <v-data-table
          :headers="headersPedido"
          :items="$pedidos_controller.pedidos"
          :loading="$pedidos_controller.loading_table"
          :items-per-page="10"
          :header-props="{
            sortByText: 'Ordernar',
          }"
          :footer-props="{
            itemsPerPageOptions: [10, 20, 50],
            itemsPerPageText: 'Pedidos por página:',
          }"
          loading-text="Buscando pedidos..."
          no-data-text="Não há pedidos"
          class="mt-10 table-body"
        >
          <template v-slot:item.pedidoData="{ item }">
            {{ item.pedidoData | formatDate("DD/MM/YYYY HH:mm:ss") }}
          </template>
          <template v-slot:item.actions="{ item }" class="table-actions">
            <v-btn
              icon
              small
              color="grey"
              @click="openDetailModal(item.idPedido)"
              class="mr-5"
            >
              <v-icon> mdi-book-open </v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="red"
              @click="openDeleteModal(item.idPedido)"
            >
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <confirmation-modal
      @confirm="$pedidos_controller.cancelSale()"
      @cancel="cancelAction"
    ></confirmation-modal>
    <detalhesModal />
  </v-container>
</template>
<script>
import pedidosMixins from "@/mixins/Pedidos.mixins";
export default {
  name: "pedidosRelatorios",
  mixins: [pedidosMixins],
  components: {
    confirmationModal: () => import("@/components/Pedidos/Modal-delete.vue"),
    detalhesModal: () => import("@/components/Pedidos/Pedidos-detalhes.vue"),
  },
  metaInfo: {
    title: "Pedidos Relatório | Comida de Rua",
  },
  data() {
    return {};
  },
  methods: {
    cancelAction() {
      this.$pedidos_controller.openDelete = false;
    },
  },
  mounted() {
    this.$pedidos_controller.getpedidos();
    this.$pedidos_controller.getReport();
  },
  destroyed() {
    this.$pedidos_controller.pedidos = [];
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
