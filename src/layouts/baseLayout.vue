<template>
  <v-main>
    <!-- navbar definida em todoas as telas -->
    <navbar />
    <v-fade-transition mode="out-in" appear>
      <!-- router é responsavel pela renderização e rotas das telas, menos a navbar que está setada -->
      <router-view />
    </v-fade-transition>
  </v-main>
</template>
<script>
export default {
  name: "baseLayout", //definido o nome
  //componente navbar, que fica setado
  components: {
    navbar: () => import("@/components/Header/Navbar.vue"),
  },
};
</script>
