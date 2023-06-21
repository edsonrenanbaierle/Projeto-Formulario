import Vue from "vue";
import {
  buscarPedidos,
  excluirPedido,
  buscarPedidoPorId,
} from "@/api/pedidoApi";

Vue.prototype.$pedidos_controller = new Vue({
  data() {
    return {
      pedidos: [],
      pedidos_detalhes: [],
      openDelete: false,
      openDetails: false,
      sale_id: "",
      loading_btn: false,
      loading_table: false,
      loading_table_details: false,
    };
  },
  methods: {
    getpedidos() {
      this.loading_table = true;
      buscarPedidos().then((res) => {
        this.pedidos = res.data;
        this.loading_table = false;
      });
    },
    cancelSale() {
      this.loading_btn = true;
      excluirPedido(this.sale_id)
        .then(() => {
          this.loading_btn = false;
          this.openDelete = false;
          this.getpedidos();
          this.$toast.success("Pedido cancelado com sucesso!");
        })
        .catch(() => {
          this.loading_btn = false;
          this.openDelete = false;
          this.$toast.error("Ocorreu um erro ao cancelar o pedido!");
        });
    },
    getPedidoById(id) {
      this.loading_table_details = true;
      buscarPedidoPorId(id).then((res) => {
        let itens = res.data.itens;
        this.pedidos_detalhes = itens.map((item) => item.produto);
        this.loading_table_details = false;
      });
    },
  },
});
