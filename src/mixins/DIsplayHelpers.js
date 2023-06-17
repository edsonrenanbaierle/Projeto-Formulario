export const displayHelpers = {
  computed: {
    xsOnly() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    smAndUp() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    mdOnly() {
      return this.$vuetify.breakpoint.mdOnly;
    },
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
};

export default displayHelpers;
