//pasta de controle de pedidos
import Vue from "vue"; //importaçãp do vue
//importação dos metodos da pasta api/pedidos
import {
  buscarPedidos,
  excluirPedido,
  buscarPedidoPorId,
  buscarPedidosDetalhes,
} from "@/api/pedidoApi";

//criação de uma nova instancia que pode ser utilizada no código em qualquer parte vue prototype.$pedidos_controller
Vue.prototype.$pedidos_controller = new Vue({
  data() {
    return {
      pedidos: [],
      pedidos_detalhes: [],
      total_pedido: 0,
      openDelete: false,
      openDetails: false,
      sale_id: "",
      loading_btn: false,
      loading_table: false,
      loading_table_details: false,
      loading_relatorio: false,
    };
  },
  methods: {
    //obter o relatório
    getReport() {
      this.loading_relatorio = true; //botão definido como carregando o pedido
      //chama a funçao exportada da pasta api/pedidoApi, espera o retorno
      buscarPedidosDetalhes().then((res) => {
        this.relatorio = res.data; //recebimento dos dados
        this.loading_relatorio = false; //botão redefinido para false
      });
    },
    //função para pegar os pedidos
    getpedidos() {
      this.loading_table = true; //table colocada como carregamento
      //chama a funçao exportada da pasta api/pedidoApi, espera o retorno
      buscarPedidos().then((res) => {
        this.pedidos = res.data; //recebimento dos dados
        this.loading_table = false; //botão redefinido para false
      });
    },
    //cancela a venda
    cancelSale() {
      this.loading_btn = true; //botão de loading definido para true
      //chama a funçao exportada da pasta api/pedidoApi passando o id da venda, espera o retorno
      excluirPedido(this.sale_id)
        .then(() => {
          this.loading_btn = false; //redefinido para false
          this.openDelete = false; //fecha modal de deletar a venda
          this.getpedidos(); //chama o getpedidos para fazer o recarregamento da table
          this.$toast.success("Pedido cancelado com sucesso!"); //fedback para o usuario de pedido cancelado
        })
        //em caso de errro
        .catch(() => {
          this.loading_btn = false; //loading botão definido para false
          this.openDelete = false; //modal fechado
          this.$toast.error("Ocorreu um erro ao cancelar o pedido!"); //fedback para o usuario
        });
    },
    //busca o pedido pelo id
    getPedidoById(id) {
      this.loading_table_details = true; //loading definido como true
      //chama a funçao exportada da pasta api/pedidoApi passando o id, espera o retorno
      buscarPedidoPorId(id).then((res) => {
        let itens = res.data.itens;
        this.pedidos_detalhes = itens.map((item) => item.produto);
        this.total_pedido = this.pedidos_detalhes.reduce((total, item) => {
          return total + item.produtoValor;
        }, 0);
        this.loading_table_details = false;
      });
    },
  },
});
