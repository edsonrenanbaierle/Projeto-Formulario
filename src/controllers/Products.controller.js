/* eslint-disable no-unused-vars */
import Vue from "vue";
import {
  buscarCategoriasProdutos,
  buscarProdutos,
  adicionarProduto,
  atualizarProduto,
  buscarProdutoPorId,
  excluirProduto,
} from "@/api/produtoApi";

Vue.prototype.$products_controller = new Vue({
  data() {
    return {
      openModal: false,
      loading_table: false,
      loading_btn: false,
      newOrEdit: "",
      all_products: [],
      categories: [],
      cadastro: {
        produto_valor: 0,
        produto: "",
        categoria: "",
      },
    };
  },
  methods: {
    getAllProducts() {
      this.loading_table = true;
      buscarProdutos()
        .then((res) => {
          this.all_products = res.data;
          this.loading_table = false;
        })
        .catch((err) => {
          this.$toast.error("Não foi encontrado nenhum produto!");
        });
    },

    getCategories() {
      buscarCategoriasProdutos().then((res) => {
        this.categories = res.data;
      });
    },

    validateForm(idproduto) {
      if (this.newOrEdit == "new") {
        this.addProducts();
      } else {
        this.updateProducts(idproduto);
      }
    },

    addProducts() {
      this.loading_btn = true;
      const payload = {
        produtoDescricao: this.cadastro.produto,
        produtoValor: this.cadastro.produto_valor,
        categoria: this.cadastro.categoria,
      };
      adicionarProduto(payload)
        .then((res) => {
          this.openModal = false;
          this.loading_btn = false;
          this.$toast.success("Produto Adicionado com Sucesso!");
          this.clearAllFields();
          this.getAllProducts();
        })
        .catch(() => {
          this.loading_btn = false;
          this.$toast.error("Ocorreu um erro ao adicionar o produto!");
        });
    },

    updateProducts(idproduto) {
      this.loading_btn = true;
      const payload = {
        produtoDescricao: this.cadastro.produto,
        produtoValor: this.cadastro.produto_valor,
        categoria: this.cadastro.categoria,
      };
      atualizarProduto(idproduto, payload)
        .then((res) => {
          this.openModal = false;
          this.loading_btn = false;
          this.getAllProducts();
          this.$toast.success("Produto Alterado com Sucesso!");
        })
        .catch(() => {
          this.loading_btn = false;
          this.$toast.error("Ocorreu um erro ao adicionar o produto!");
        });
    },
    clearAllFields() {
      this.cadastro.produto = "";
      this.cadastro.categoria = "";
      this.cadastro.produto_valor = 0;
    },
  },
});
