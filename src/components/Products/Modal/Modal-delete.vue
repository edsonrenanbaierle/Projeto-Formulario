<!-- modal de confirmação de deletação de produtos -->
<template>
  <!-- v-model ligado ao produoduto controller controla o estado de abertura e fechamento do modal -->
  <v-dialog
    v-model="$products_controller.openDelete"
    max-width="500px"
    persistent
  >
    <v-card class="rounded-xl pa-2">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="d-flex justify-end pr-0">
        <v-btn text @click="cancel" color="grey">Cancelar</v-btn>
        <!-- loading ligado ao products controller que faz esse controle do botao -->
        <v-btn
          rounded
          color="green"
          class="btn-primary"
          @click="confirm"
          :loading="$products_controller.loading_btn"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  //mensagens e informações compostas no modal
  props: {
    title: {
      type: String,
      default: "Remover",
    },
    message: {
      type: String,
      default: "Tem certeza de que deseja remover o produto?",
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel"); //metodo ao clicar no botão de cancelar
    },
    confirm() {
      this.$emit("confirm"); //metodo ao clicar no botão de confirmar
    },
  },
};
</script>
