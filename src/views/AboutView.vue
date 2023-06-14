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
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Produto",
  data: () => ({
    produto: "",
  }),
};
</script>
