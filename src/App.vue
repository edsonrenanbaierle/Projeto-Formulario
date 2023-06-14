<template>
  <v-app>
    <v-app-bar color="deep-purple" dark class="teste">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title to="/">Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="teste">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar app color="primary" dark>
      <v-btn to="/about">About</v-btn>
      <v-btn to="/">Home</v-btn>
    </v-app-bar> -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    teste() {
      if (this.$route.path !== "/about") {
        this.$router.push({ path: "/about" });
      }
    },
  },
};
</script>
<style scoped>
.teste {
  max-height: 5rem !important;
}
</style>
