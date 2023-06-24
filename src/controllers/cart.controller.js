//Controle da parte de cart (venda do produto)
import Vue from "vue"; //importaçãp do vue
import { adicionarPedido } from "@/api/pedidoApi"; //importação do adicionar pedido da api/pedido
import router from "@/router"; //importação do router
import Swal from "sweetalert2"; //importação da biblioteca Swal

//criação de uma nova instancia que pode ser utilizada no código vue prototype.$cart
Vue.prototype.$cart = new Vue({
  //dados
  data: () => ({
    item_amount: [], //array com o total de quantidade
    cart: [], //array com os produtos selecionados pelo usuario
    order: [],
    finish_button: false, //botão de finalização
    tipo: { forma_pag: "" }, //forma de pagamento
  }),
  methods: {
    //metodo de adição de produto ao carrinho de compra
    addProduct() {
      //filtra os itens da lista, verifica se a quantidade é maior que 0
      const availableItems = this.item_amount.filter(
        (item) => item.quantidade > 0
      );
      //se está vazio quer dizer que nenhum item com quantidade válida foi adicionado
      if (availableItems.length == 0) {
        return this.$toast.error("Adicione a quantidade!"); //retorna uma mensagem para adicionar quantidade
      }
      //percorre todos os itens disponiveis no array
      availableItems.forEach((item) => {
        //verifica se existe um produto com o mesmo id que está sendo iterado no carrinho
        const existingItem = this.cart.find(
          (cartItem) => cartItem.produtoId === item.produtoId
        );
        //se já existe a quantidade é incrementada
        if (existingItem) {
          existingItem.quantidade += item.quantidade;
        } else {
          //caso não tenha é feito um push para adicionar o item
          this.cart.push(JSON.parse(JSON.stringify(item)));
        }
      });

      //após o processo é feita uma iteração na quantidade para zerala
      this.item_amount.forEach((item) => {
        item.quantidade = 0;
      });
      this.$toast.success("Produto adicionado ao carrinho!"); //fedback de produto adicionado no carrinho
    },
    //remoção do produto passando a posição
    removeProduct(index) {
      this.cart.splice(index, 1); //remooção do elemento
      this.$toast.success("Produto removido com sucesso!"); //fedback para o usuario de produto removido
    },
    //finalização do pedido
    finishOrder() {
      //verifica se a forma de pagamento está vazia
      if (this.tipo.forma_pag == "") {
        return this.$toast.error("Escolha uma forma de pagamento!"); //fedback para o usuario para escolher a forma de pagamento
      }
      this.finish_button = true; //botao de finalizar para true
      const order = [...this.cart]; //criado um novo array, copia do cart
      order.unshift(this.tipo); //adicionado as informações do tipo de pagamento
      //funçaõ de adicionar pedido exportada da pasta api/pedidoApi passando o array order
      adicionarPedido(order)
        //espera a resposta
        .then(() => {
          this.finish_button = false; //botão de venda é definido com false
          Swal.fire("", "Pedido Realizado com sucesso!", "success"); //notificação de sucesso exibita
          this.cart = []; //o array cart é resetado
          this.tipo.forma_pag = ""; // forma de pagamento retorna a vazio
        })
        //em caso de erro
        .catch(() => {
          this.finish_button = false; //botão de venda é definido com false
          this.$toast.error("Ocorreu um erro ao realizar o pedido!"); //exibido a notificação de errp
        })
        //executado a função finally independente de qualquer coisa
        .finally(() => {
          router.push({ path: "/" }); //faz retornar para o menu
        });
      console.table(order);
    },
  },
});
