<template>
  <v-container fluid class="pa-0 d-flex justify-center">
    <v-row
      style="width: 100%; height: 100vh"
      :class="$vuetify.breakpoint.lgAndUp ? 'ma-0' : 'd-flex justify-center'"
    >
      <v-col
        :cols="$vuetify.breakpoint.smAndUp ? 5 : 12"
        class="d-flex justify-center align-center"
      >
        <v-col
          :cols="$vuetify.breakpoint.lgAndUp ? 7 : 12"
          :class="!$vuetify.breakpoint.lgAndUp ? 'd-flex justify-center' : ''"
        >
          <v-card class="pa-10 rounded-xl">
            <v-row justify="center" class="mb-7">
              <v-col cols="12" class="d-flex justify-center">
                <img
                  :src="isDark ? logoDARK : logoImg"
                  alt="logo"
                  width="200"
                  class="pt-3"
                />
              </v-col>
            </v-row>
            <v-form ref="form" lazy-validation @submit.prevent="login()">
              <v-text-field
                label="Email"
                type="email"
                name="email"
                autocomplete
                outlined
                rounded
                validate-on-blur
                :rules="rulesEmail"
              ></v-text-field>
              <v-text-field
                label="Senha"
                outlined
                rounded
                :type="passType ? 'password' : 'text'"
                validate-on-blur
                :append-icon="passType ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rulesSenha"
                @click:append="passType = !passType"
              ></v-text-field>
              <div class="text-center">
                <v-btn
                  rounded
                  color="green"
                  class="btn-primary pa-5"
                  type="submit"
                  >entrar</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-col>
      <v-col
        cols="7"
        class="pa-0"
        style="height: 100vh"
        v-if="$vuetify.breakpoint.lgAndUp"
      >
        <div class="overlay">
          <v-img src="" alt="logo" class="img-back" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "LoginPage",
  metaInfo: {
    title: "Login | Comida de Rua",
  },
  data: () => ({
    passType: true,
    rulesEmail: [(v) => v == "gastronomia123" || "Email incorreto!"],
    rulesSenha: [(v) => v == "comida321" || "Senha incorreta!"],
    logoImg: require("@/assets/logoCR.png"),
    logoDARK: require("@/assets/logoDARK.png"),
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        localStorage.setItem("isAuth", true);
        this.$router.push("/home");
      }
    },
  },
  computed: {
    isDark() {
      if (this.$vuetify.theme.dark) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    const theme = localStorage.getItem("userTheme");
    this.$vuetify.theme.dark = JSON.parse(theme);
  },
};
</script>
<style>
#app,
html,
body {
  overflow-y: auto !important;
}
.img-back {
  background-position: center;
  /* background-repeat: no-repeat; */
  background-size: cover !important;
  background-image: linear-gradient(#0000007c, #00000091),
    url("@/assets/login.jpg");
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
}
</style>
