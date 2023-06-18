import Vue from "vue";
import { buscarVendas, excluirVenda } from "@/api/vendaApi";

Vue.prototype.$vendas_controller = new Vue({
  data() {
    return {
      vendas: [],
      openDelete: false,
      sale_id: "",
      loading_btn: false,
      loading_table: false,
    };
  },
  methods: {
    getVendas() {
      this.loading_table = true;
      buscarVendas().then((res) => {
        this.vendas = res.data;
        this.loading_table = false;
        this.vendas.forEach((items) => {
          items.produto.venda_id = items.vendaId;
          delete items.vendaId;
        });
      });
    },
    cancelSale() {
      this.loading_btn = true;
      excluirVenda(this.sale_id)
        .then(() => {
          this.loading_btn = false;
          this.openDelete = false;
          this.getVendas();
          this.$toast.success("Venda cancelada com sucesso!");
        })
        .catch(() => {
          this.loading_btn = false;
          this.openDelete = false;
          this.$toast.error("Ocorreu um erro ao cancelar a venda!");
        });
    },
  },
});
