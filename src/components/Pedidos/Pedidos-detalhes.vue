<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-dialog
    v-model="$pedidos_controller.openDetails"
    persistent
    max-width="1000"
  >
    <div class="relative-table">
      <v-icon
        class="btn-close"
        size="30"
        @click="
          $pedidos_controller.openDetails = !$pedidos_controller.openDetails
        "
        >mdi-close</v-icon
      >
      <v-data-table
        :headers="headersPedidoDetalhe"
        :items="$pedidos_controller.pedidos_detalhes"
        :loading="$pedidos_controller.loading_table_details"
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
        class="mt-0 table-body pa-10 rounded-xl"
      >
        <template v-slot:item.produtoValor="{ item }">
          {{ item.produtoValor | moeda }}
        </template>
      </v-data-table>
    </div>
  </v-dialog>
</template>
<script>
import PedidosMixins from "@/mixins/Pedidos.mixins"; //importação dos componentes para compor os componentes da tabela

export default {
  name: "pedidosDetalhes", //nome da pasta
  mixins: [PedidosMixins],
};
</script>
<style scoped>
.btn-close {
  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 10px;
}
.relative-table {
  position: relative;
}
</style>
