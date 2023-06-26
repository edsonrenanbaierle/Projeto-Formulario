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
    //verifica se o tema é dark ou não
    isDark() {
      if (this.$vuetify.theme.dark) {
        return true;
      }
      return false;
    },
  },
  //se for possivel pegar a autenticação vai para a pagina principal do site
  mounted() {
    if (localStorage.getItem("isAuth")) {
      this.$router.push("/home");
    }
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
