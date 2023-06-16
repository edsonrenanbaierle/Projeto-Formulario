<template>
  <v-dialog :value="$products_controller.openModal" max-width="600px">
    <v-card class="rounded-xl">
      <v-toolbar color="green">
        <v-card-title class="title">
          <span class="text-h5 title">Adicionar Produto</span>
        </v-card-title>
      </v-toolbar>
      <v-form @submit.prevent="$products_controller.validateForm()">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  label="Nome do Produto"
                  v-model="$products_controller.cadastro.produto"
                  outlined
                  rounded
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0 pb-0">
                <v-select
                  label="Categoria"
                  outlined
                  v-model="$products_controller.cadastro.categoria"
                  rounded
                  :items="$products_controller.categories"
                  item-text="descricao"
                  item-value="descricao"
                ></v-select>
              </v-col>
              <v-col cols="12" class="pt-0">
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
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="$products_controller.openModal = false"
          >
            Close
          </v-btn>
          <v-btn color="green" text @click="dialog = false" type="submit">
            Save
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
    };
  },
  components: {
    moneyInput,
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
