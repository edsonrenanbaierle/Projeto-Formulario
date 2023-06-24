<!-- modal para adicionar produto/ alteração de produto -->
<template>
  <!-- controla abertura do modal -->
  <v-dialog
    :value="$products_controller.openModal"
    max-width="600px"
    persistent
  >
    <v-card class="rounded-xl pb-1">
      <v-toolbar color="green">
        <v-card-title class="title">
          <!-- confere se é um novo produto na pasta de products controller, caso seja o titulo do modal recebe adicionar produto, senão alterar produto + o nome do produto -->
          <span class="text-h5 title">{{
            $products_controller.newOrEdit == "new"
              ? "Adicionar Produto"
              : "Alterar Produto - " + $products_controller.nome_produto
          }}</span>
        </v-card-title>
      </v-toolbar>
      <!-- impede o comportamento padrão do formulario e chama validateFormProduct-->
      <v-form
        @submit.prevent="validateFormProduct()"
        ref="form"
        lazy-validation
        validate-on-blur
      >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- pega o nome do produto da pasta products.controller -->
                <v-text-field
                  label="Nome do Produto*"
                  required
                  v-model="$products_controller.cadastro.produto"
                  outlined
                  rounded
                  :rules="NomeProduto"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- traz as categorias da pasta de controle de produtos  e é carregado-->
                <v-select
                  label="Categoria*"
                  outlined
                  required
                  v-model="$products_controller.cadastro.categoria"
                  rounded
                  :items="$products_controller.categories"
                  :rules="rulesCategoria"
                  item-text="descricao"
                  item-value="descricao"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <!-- traz a valor do produto da pasta products controller  -->
                <moneyInput
                  label="Preço do Produto"
                  outlined
                  rounded
                  required
                  v-model="$products_controller.cadastro.produto_valor"
                  :options="options"
                ></moneyInput>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- fecha o modal caso ele cancele -->
          <v-btn color="grey" text @click="closeModal()"> Cancelar </v-btn>
          <!-- botão de loading caso o usuario aperte vai salvar e ira fechar o modal  -->
          <v-btn
            color="green"
            rounded
            class="btn-primary"
            type="submit"
            :loading="$products_controller.loading_btn"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import moneyInput from "@/components/global/money-input.vue"; //import da pasta money input que contem o input de money ajustado

export default {
  name: "modalProducts",
  //dados do input do form
  data() {
    return {
      options: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 9,
        precision: 2,
      },
      NomeProduto: [(v) => !!v || "Insira o nome do produto!"],
      rulesCategoria: [(v) => !!v || "Insira uma categoria para o produto!"],
    };
  },
  //definição do componente exportado
  components: {
    moneyInput,
  },
  //o watch significa que fica esperando
  watch: {
    "$products_controller.openModal"() {
      this.$refs.form.resetValidation(); //redefine o estado de validação do formulário, limpa erro de validação existente
    },
  },
  methods: {
    //se o usuario fechar o modal no botão de cancel
    closeModal() {
      this.$products_controller.clearAllFields(); //limpa os campos do formulario
      this.$refs.form.resetValidation(); //redefine o estado de validação do formulário, limpa erro de validação existente
      this.$products_controller.openModal = false; //fecha o moda
    },
    //metodo que aciona a validação do formulario, chamando na pasta  products.controller o validade form
    validateFormProduct() {
      if (this.$refs.form.validate()) {
        this.$products_controller.validateForm();
      }
    },
  },
  //hooks que é executado após o elemento ser incerido no DOM
  mounted() {
    this.$products_controller.getCategories(); //chama na pasta products o getCategorias
  },
};
</script>
<style scoped>
.title {
  color: white !important;
}
</style>
