export default {
  data() {
    return {
      headersProducts: [
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
    openModal(type, data) {
      this.$products_controller.openModal =
        !this.$products_controller.openModal;
      this.$products_controller.newOrEdit = type;
      if (type == "edit") {
        this.$products_controller.produto_id = data.produtoId;
        this.$products_controller.cadastro.produto = data.produtoDescricao;
        this.$products_controller.nome_produto = data.produtoDescricao;
        this.$products_controller.cadastro.produto_valor = data.produtoValor;
        this.$products_controller.cadastro.categoria = data.categoria;
      }
    },
    openDeleteModal(produto_id) {
      this.$products_controller.openDelete =
        !this.$products_controller.openDelete;
      this.$products_controller.produto_id = produto_id;
    },
  },
};
