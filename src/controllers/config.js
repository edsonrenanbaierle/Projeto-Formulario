import Vue from "vue";

Vue.prototype.$config = new Vue({
  data() {
    return {
      dados: {
        successColor: "#07bc0c",
        errorColor: "#c93720",
        corterciaria: "#353535",
        corinputs: "#353535",
      },
      snackbar: {
        show: false,
        text: "",
        color: "",
        time: 3000,
      },
    };
  },
  methods: {
    alert(msn, color, time = 3000) {
      this.snackbar.text = msn;
      this.snackbar.show = true;
      this.snackbar.color = color;
      this.snackbar.time = time;
    },
  },
});
