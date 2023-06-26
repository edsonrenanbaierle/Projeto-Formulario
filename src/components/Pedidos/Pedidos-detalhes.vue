<!-- eslint-disable vue/valid-v-slot -->
<!-- tabela de datalhes dos pedidos -->
<template>
  <v-dialog
    v-model="$pedidos_controller.openDetails"
    persistent
    max-width="1000"
  >
    <v-card class="rounded-xl">
      <div class="relative-table">
        <v-icon class="btn-close" size="30" @click="closeModal"
          >mdi-close</v-icon
        >
        <!--tabela dos detalhes do pedidos que pucha as informações da pasta controllers -->
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
          <template v-slot:top>
            <div class="text-center mb-5">
              <h2>Detalhes do Pedido</h2>
            </div>
          </template>
          <template v-slot:item.produtoValor="{ item }">
            {{ item.produtoValor | moeda }}
          </template>
        </v-data-table>
        <div v-show="$pedidos_controller.pedidos_detalhes.length > 0">
          <v-card-text class="d-flex justify-center pa-0">
            Valor total do pedido:
            {{ $pedidos_controller.total_pedido | moeda }}
          </v-card-text>
          <v-card-text class="d-flex justify-center">
            Quantidade de produtos:
            {{ $pedidos_controller.pedidos_detalhes.length }}
          </v-card-text>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import PedidosMixins from "@/mixins/Pedidos.mixins"; //importação dos componentes para compor os componentes da tabela

export default {
  name: "pedidosDetalhes", //nome da pasta
  mixins: [PedidosMixins],
  methods: {
    //metodo de fechar modal
    closeModal() {
      this.$pedidos_controller.openDetails =
        !this.$pedidos_controller.openDetails; //recebe o contrario do que está na pasta controller
      this.$pedidos_controller.pedidos_detalhes = []; //faz os detalhes do pedido ficar vazio
    },
  },
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
