import Vue from "vue";

Vue.filter("moeda", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number.parseFloat(v));

  return formatter;
});
