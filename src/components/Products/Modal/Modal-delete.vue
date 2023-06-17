<template>
  <v-dialog v-model="$products_controller.openDelete" max-width="500px">
    <v-card class="rounded-xl p-5">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn text @click="cancel" color="grey">Cancelar</v-btn>
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
  props: {
    title: {
      type: String,
      default: "Confirmação",
    },
    message: {
      type: String,
      default: "Tem certeza de que deseja remover o produto?",
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
