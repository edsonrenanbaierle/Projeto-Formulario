export default {
  data() {
    return {
      headersVenda: [
        {
          text: "Venda",
          value: "venda_id",
          align: "center",
          width: 200,
        },
        {
          text: "Nome do Produto",
          value: "produtoDescricao",
          align: "center",
          width: 200,
        },
        {
          text: "Categoria",
          value: "categoria",
          align: "center",
          width: 200,
        },
        {
          text: "Valor",
          value: "produtoValor",
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
    };
  },
  methods: {
    openDeleteModal(id) {
      this.$vendas_controller.openDelete = true;
      this.$vendas_controller.sale_id = id;
    },
  },
};
