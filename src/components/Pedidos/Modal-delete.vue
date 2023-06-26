<!-- modal de delete de pedidos -->
<template>
  <v-dialog
    v-model="$pedidos_controller.openDelete"
    max-width="500px"
    persistent
  >
    <v-card class="rounded-xl pa-2">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="d-flex justify-end pr-0">
        <v-btn text @click="cancel" color="grey">Cancelar</v-btn>
        <!-- adicionado evento de click, estilos e loading -->
        <v-btn
          rounded
          color="green"
          class="btn-primary"
          @click="confirm"
          :loading="$pedidos_controller.loading_btn"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  //compartilhamento das informações para usar no modal
  props: {
    title: {
      type: String,
      default: "Cancelar",
    },
    message: {
      type: String,
      default: "Tem certeza de que deseja cancelar o pedido?",
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel"); //cancela ação
    },
    confirm() {
      this.$emit("confirm"); //confirma ação
    },
  },
};
</script>
