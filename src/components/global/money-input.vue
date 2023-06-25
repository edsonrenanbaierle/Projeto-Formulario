<!-- input para money -->
<template>
  <!-- campo de texto personalizado usando o Vuetify -->
  <v-text-field
    v-model="cmpValue"
    v-bind:label="label"
    v-bind:placeholder="placeholder"
    v-bind:readonly="readonly"
    v-bind:disabled="disabled"
    v-bind:outlined="outlined"
    v-bind:dense="dense"
    v-bind:hide-details="hideDetails"
    v-bind:error="error"
    v-bind:rules="rules"
    v-bind:clearable="clearable"
    v-bind:prefix="options.prefix"
    v-bind:suffix="options.suffix"
    v-on:keypress="keyPress"
    v-bind:class="classes"
    v-bind:error-messages="errorMessages"
    rounded
  ></v-text-field>
</template>

<script>
export default {
  model: {
    //configuração de dados entre o componente personalizado e o valor fornecido externamente a ele
    prop: "value", //define o nome da propriedade que recebera o valor
    event: "input", //evento emitido pelo componente, assim sabendo quando ocorreu uma mudança no valor
  },
  props: {
    //declara as propriedades que podem ser passadas para o componente como valores externos
    value: {
      type: [String, Number],
      default: "0", //define valor padrão para o value
    },
    label: {
      //espera recerber um label com o type string e valor padrão vazio
      type: String,
      default: "",
    },
    placeholder: {
      //espera receber um placeholder
      type: String,
      default: undefined,
    },
    readonly: {
      //Espera um reandonly e como está false é permitido o edit, em caso de true apenas leitura do usuario
      type: Boolean,
      default: false,
    },
    dense: {
      //estilo de densidade do campo de texto
      type: Boolean,
      default: false,
    },
    error: {
      //mostrar se no campo de texto está indentificado um erro, está como false
      type: Boolean,
      default: false,
    },
    errorMessages: {
      //exibir mensagem de erro
      type: [Array, String],
      default: () => [],
    },
    hideDetails: {
      type: [Boolean, String],
      default: false,
    },
    rules: {
      type: [Array, String],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    valueWhenIsEmpty: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: function () {
        return {
          locale: "pt-BR",
          prefix: "",
          suffix: "",
          length: 11,
          precision: 2,
        };
      },
    },
    classes: {
      type: String,
      default: "",
    },
  },
  data: () => ({}), //retorna um objeto vazio
  computed: {
    cmpValue: {
      get: function () {
        return this.value !== null && this.value !== ""
          ? this.humanFormat(this.value.toString())
          : this.valueWhenIsEmpty;
      },
      set: function (newValue) {
        this.$emit("input", this.machineFormat(newValue));
      },
    },
  },
  methods: {
    //metodo para formatação de numero
    humanFormat: function (number) {
      if (isNaN(number)) {
        //verifica se não é um número válido
        number = ""; //se for o numero recebe vazio
      } else {
        number = Number(number).toLocaleString(this.options.locale, {
          //senão o numero é convertido para number e em seguida aberto o toLocaleString para formatalo com as opções fornecidas
          maximumFractionDigits: this.options.precision, //controla o maximo de números
          minimumFractionDigits: this.options.precision, //controla o minimo de números
        });
      }
      return number; //retorna o numero formatado
    },
    //formatar um número em representação numerica de máquina, passando o numero como parametro do vuetify
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number);
        number = number.padStart(parseInt(this.options.precision) + 1, "0");
        number =
          number.substring(
            0,
            number.length - parseInt(this.options.precision)
          ) +
          "." +
          number.substring(
            number.length - parseInt(this.options.precision),
            number.length
          );
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty;
        }
      } else {
        number = this.valueWhenIsEmpty;
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number);
      }
      return number;
    },
    keyPress($event) {
      //manipulador de eventos, para lidar com o evento ao clicar
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
      if (this.targetLength()) {
        $event.preventDefault();
      }
    },
    //metodo responsável por limpar o número removendo os zeros à esquerda
    cleanNumber: function (value) {
      let result = "";
      if (value) {
        let flag = false;
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros a esquerda
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              }
            } else {
              result = result + arrayValue[i];
            }
          }
        }
      }
      return result;
    },
    //verifica se o número é inteiro
    isInteger(value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },
    //verifica o comprimento não foi ultrapassado
    targetLength() {
      if (
        Number(this.cleanNumber(this.value).length) >=
        Number(this.options.length)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
