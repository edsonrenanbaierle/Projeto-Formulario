<template>
  <div class="about">
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          label="Produto"
          class="outline"
          v-model="produto"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-select
          v-model="categoria"
          :items="categorias"
          label="Categoria"
          class="outline"
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-btn @click="registrarProduto" color="primary"
          >Registrar Produto</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  adicionarProduto,
  buscarCategoriasProdutos,
} from "../../api/produtoApi";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Produto",
  data: () => ({
    produto: "",
    categoria: "",
    categorias: [],
  }),
  mounted() {
    this.buscarCategorias();
  },
  methods: {
    buscarCategorias() {
      buscarCategoriasProdutos()
        .then((response) => {
          this.categorias = response.data;
          console.log("Categorias recuperadas com sucesso:", response.data);
        })
        .catch((error) => {
          console.error("Falha ao buscar categorias:", error);
        });
    },
    registrarProduto() {
      const novoProduto = {
        produtoDescricao: this.produto,
        categoria: this.categoria,
      };

      adicionarProduto(novoProduto)
        .then((response) => {
          console.log("Produto registrado com sucesso:", response.data);
          // Resetar valores do formulário
          this.produto = "";
          this.categoria = "";
        })
        .catch((error) => {
          console.error("Falha ao registrar produto:", error);
        });
    },
  },
};
</script>
