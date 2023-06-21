<template>
  <v-app>
    <router-view />
    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp"
      fab
      small
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      class="dark-btn"
      ><v-icon>{{
        isDark ? "mdi-weather-sunny" : "mdi-weather-night"
      }}</v-icon></v-btn
    >
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {},
  computed: {
    isDark() {
      if (this.$vuetify.theme.dark) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style>
@import url("./stylesGlobal.css");
.dark-btn {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
}
</style>
