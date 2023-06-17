<template>
  <v-dialog
    :value="$products_controller.openModal"
    max-width="600px"
    persistent
  >
    <v-card class="rounded-xl pb-1">
      <v-toolbar color="green">
        <v-card-title class="title">
          <span class="text-h5 title">{{
            $products_controller.newOrEdit == "new"
              ? "Adicionar Produto"
              : "Alterar Produto - " + $products_controller.nome_produto
          }}</span>
        </v-card-title>
      </v-toolbar>
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
          <v-btn color="grey" text @click="closeModal()"> Cancelar </v-btn>
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
import moneyInput from "@/components/global/money-input.vue";

export default {
  name: "modalProducts",
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
  components: {
    moneyInput,
  },
  methods: {
    closeModal() {
      this.$products_controller.clearAllFields();
      this.$refs.form.resetValidation();
      this.$products_controller.openModal = false;
    },
    validateFormProduct() {
      if (this.$refs.form.validate()) {
        this.$products_controller.validateForm();
      }
    },
  },
  mounted() {
    this.$products_controller.getCategories();
  },
};
</script>
<style scoped>
.title {
  color: white !important;
}
</style>
