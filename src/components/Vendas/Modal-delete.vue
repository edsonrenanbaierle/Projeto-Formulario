<template>
  <v-dialog
    v-model="$vendas_controller.openDelete"
    max-width="500px"
    persistent
  >
    <v-card class="rounded-xl pa-2">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="d-flex justify-end pr-0">
        <v-btn text @click="cancel" color="grey">Cancelar</v-btn>
        <v-btn
          rounded
          color="green"
          class="btn-primary"
          @click="confirm"
          :loading="$vendas_controller.loading_btn"
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
      default: "Cancelar",
    },
    message: {
      type: String,
      default: "Tem certeza de que deseja cancelar a venda?",
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
