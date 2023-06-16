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
    openModal(type) {
      this.$products_controller.openModal =
        !this.$products_controller.openModal;
      this.$products_controller.newOrEdit = type;
    },
  },
};
