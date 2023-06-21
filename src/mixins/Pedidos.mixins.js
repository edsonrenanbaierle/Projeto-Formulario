export default {
  data() {
    return {
      headersPedido: [
        {
          text: "Pedido",
          value: "idPedido",
          align: "center",
          width: 200,
        },
        {
          text: "Tipo do Pagamento",
          value: "tipoPagamento",
          align: "center",
          width: 200,
        },
        {
          text: "Data do Pedido",
          value: "pedidoData",
          align: "center",
          width: 200,
        },
        {
          text: "Ações",
          value: "actions",
          align: "center",
          width: 200,
        },
      ],
      headersPedidoDetalhe: [
        {
          text: "ID",
          value: "produtoId",
          align: "center",
          width: 200,
        },
        {
          text: "Descrição",
          value: "produtoDescricao",
          align: "center",
          width: 200,
        },
        {
          text: "Valor do Produto",
          value: "produtoValor",
          align: "center",
          width: 200,
        },
        {
          text: "Categoria",
          value: "categoria",
          align: "center",
          width: 200,
        },
      ],
    };
  },
  methods: {
    openDeleteModal(id) {
      this.$pedidos_controller.openDelete = true;
      this.$pedidos_controller.sale_id = id;
    },
    openDetailModal(id) {
      this.$pedidos_controller.openDetails = true;
      this.$pedidos_controller.getPedidoById(id);
    },
  },
};
