<template>
  <v-container>
    <h1>homeView</h1>
    <v-btn @click="showToast">teste</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "homeView",
  methods: {
    showToast() {
      this.$toast.success("Produto adicionado");
    },
  },
};
</script>
