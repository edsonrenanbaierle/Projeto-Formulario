<template>
  <v-main>
    <navbar />
    <v-fade-transition mode="out-in" appear>
      <router-view />
    </v-fade-transition>
  </v-main>
</template>
<script>
export default {
  name: "baseLayout",
  components: {
    navbar: () => import("@/components/Header/Navbar.vue"),
  },
};
</script>
