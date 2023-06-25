import Vue from "vue"; //importação do vue
import moment from "moment"; //importação da biblioteca moment usada para formatação

//formatar a moeda para brasileira
Vue.filter("moeda", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number.parseFloat(v)); //converte para float comforme os parametros

  return formatter; //retorna o numero formatado
});

//Formata a data
Vue.filter("formatDate", function (value, format) {
  if (!value) return "";
  return moment(value).format(format);
});

Vue.filter("formatDateUTCMinus3", function (value, format) {
  if (!value) return "";
  const date = moment(value).subtract(3, "hours").toDate();
  return moment(date).format(format);
});
