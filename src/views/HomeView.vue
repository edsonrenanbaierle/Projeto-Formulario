<template>
  <Fragment>
    <h1>homeView</h1>
    <v-btn @click="showToast">teste</v-btn>
  </Fragment>
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
