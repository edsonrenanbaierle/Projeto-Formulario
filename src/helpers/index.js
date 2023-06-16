import Vue from "vue";

Vue.filter("moeda", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number.parseFloat(v));

  return formatter;
});

Vue.filter("centavos", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  let preco = formatter.format(v).split(",");

  return preco[1];
});

Vue.filter("moedaDolar", function (v) {
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(v);
});

Vue.filter("uppercase", function (v) {
  if (v) {
    return v.toUpperCase();
  }
  return "[NAME_ESTATIUM_NO_PARAM]";
});

Vue.filter("lowercase", function (v) {
  return v.toString().toLowerCase();
});

Vue.filter("trim", function (v) {
  return v.toString().trim();
});
Vue.filter("limitarDesc", function (v) {
  var dots = "...";
  if (v.length > 60) {
    // you can also use substr instead of substring
    v = v.substring(0, 60) + dots;
  }

  return v;
});
Vue.filter("inicial", function (v) {
  return v.toString().charAt(0);
});

Vue.filter("removeLetras", function (v) {
  return v.toString().replace(/\D+/g, "");
});

Vue.filter("removeAcentos", function (v) {
  return v
    .toString()
    .normalize("NFD")
    .replace(/[^a-zA-Zs]/g, "");
});

Vue.filter("tamanho", function (v) {
  return v.toString().length;
});
