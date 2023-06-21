import Vue from "vue";
import moment from "moment";

Vue.filter("moeda", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number.parseFloat(v));

  return formatter;
});

Vue.filter("formatDate", function (value, format) {
  if (!value) return "";
  return moment(value).format(format);
});
