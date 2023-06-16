<template>
  <v-app>
    <v-main>
      <navbar />
      <v-fade-transition mode="out-in" appear>
        <router-view />
      </v-fade-transition>
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
  components: {
    navbar: () => import("@/components/Header/Navbar.vue"),
  },
  methods: {},
};
</script>
<style>
@import url("./stylesGlobal.css");
</style>
