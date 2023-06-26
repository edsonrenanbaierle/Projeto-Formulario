export default {
  data() {
    return {
      //Informações que compõem a tabela na aba produtos
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
    //abrir o modal de detalhes do pedido da aba produtos, passando o tipo que é adição de produto ou editar um produto
    openModal(type, data) {
      this.$products_controller.openModal =
        !this.$products_controller.openModal; //faz receber o contrario, ou seja se estiver fechado abre ou o contrario
      this.$products_controller.newOrEdit = type;
      //se o tipo for edit segue nesta etapa, e faz receber os valores
      if (type == "edit") {
        this.$products_controller.produto_id = data.produtoId;
        this.$products_controller.cadastro.produto = data.produtoDescricao;
        this.$products_controller.nome_produto = data.produtoDescricao;
        this.$products_controller.cadastro.produto_valor = data.produtoValor;
        this.$products_controller.cadastro.categoria = data.categoria;
      }
    },
    //abre o modal de delete passando o id da aba produtos
    openDeleteModal(produto_id) {
      this.$products_controller.openDelete =
        !this.$products_controller.openDelete; //faz receber o contrario, ou seja se estiver fechado abre ou o contrario
      this.$products_controller.produto_id = produto_id;
    },
  },
};
