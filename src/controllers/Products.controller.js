/* eslint-disable no-unused-vars */
//controle dos produtos
import Vue from "vue"; //importação do Vue.js como dependencia
//import das funções da pasta api/produtos que controla os produtos
import {
  buscarCategoriasProdutos,
  buscarProdutos,
  adicionarProduto,
  atualizarProduto,
  buscarProdutoPorId,
  excluirProduto,
} from "@/api/produtoApi";

//criação de uma nova instancia que pode ser utilizada no código vue $products_controller
Vue.prototype.$products_controller = new Vue({
  data() {
    return {
      openModal: false, //abrtura de modal e fechamento
      openDelete: false, //controle do modal de deletar produto
      loading_table: false, //estado de carregamento da tabela
      nome_produto: "", //nome do produto
      loading_btn: false,
      newOrEdit: "", //saber se é edição de produto ou novo produto
      produto_id: "", //id do produto
      all_products: [], //todos os produtos
      categories: [], //categorias dos produtos
      //cadastro do produto com valor, produto, categoria
      cadastro: {
        produto_valor: 0,
        produto: "",
        categoria: "",
      },
    };
  },
  methods: {
    //pegar todos os produtos
    getAllProducts() {
      this.loading_table = true; //passa o estado da table para true
      buscarProdutos() //busca os produtos
        //promessa de espera de uma resposta
        .then((res) => {
          this.all_products = res.data; //a variavel all_products res é a resposta enviada com os dados
          this.loading_table = false; //significa que a tabela concluiu o carregamento
        })
        //em caso de erro e não encontrar produto exibe uma mensagem de erro
        .catch((err) => {
          this.$toast.error("Não foi encontrado nenhum produto!");
        });
    },
    //função para pegar as categorias e carregar nas categorias de data
    getCategories() {
      //chama função importada da api e espera uma resposta
      buscarCategoriasProdutos().then((res) => {
        this.categories = res.data; //recebimento dos dados
      });
    },

    //validação do formulario
    validateForm() {
      //verifica se é um novo produto que ira ser adicionando
      if (this.newOrEdit == "new") {
        this.addProducts(); //chama função importada da pasta api/produtos e adiciona o produto
      } else {
        this.updateProducts(this.produto_id); //se for uma edição chama a função para editar passando como parramentro o id
      }
    },
    //adiciona produtos
    addProducts() {
      this.loading_btn = true;
      //criação de um objeto com prpriedades
      const payload = {
        //recebe de data as informações de cadastro
        produtoDescricao: this.cadastro.produto,
        produtoValor: this.cadastro.produto_valor,
        categoria: this.cadastro.categoria,
      };
      adicionarProduto(payload) //chama a função importada adicionarProduto passando o payload
        //apos receber a resposta
        .then((res) => {
          this.openModal = false; //fecha modal
          this.loading_btn = false; //define estado de carregamento do botão como false
          this.$toast.success("Produto adicionado com sucesso!"); //mensagem do produto cadastrado com sucesso
          this.clearAllFields(); //chama a função que limpa os campos de cadastro
          this.getAllProducts(); //chama a função getAllProducts que recarrega novamente a tabela com o novo produto
        })
        //em caso de erro
        .catch(() => {
          this.loading_btn = false; //define estado de carregamento do botão como false
          this.$toast.error("Ocorreu um erro ao adicionar o produto!"); //mostra a mensagem de erro
        });
    },
    //função para atualizar o pedido
    updateProducts(idproduto) {
      this.loading_btn = true; //define estado de carregamento do botão como true
      //cria o objeto com os dados do produto
      const payload = {
        produtoDescricao: this.cadastro.produto,
        produtoValor: this.cadastro.produto_valor,
        categoria: this.cadastro.categoria,
      };
      atualizarProduto(idproduto, payload) //chama a funçao importada de api/produtos atualizarProduto
        //espera a respota
        .then((res) => {
          this.openModal = false; //fecha modal
          this.loading_btn = false; //define o loading do botão como false
          this.clearAllFields(); //chama a função que limpa os campos de cadastro
          this.getAllProducts(); //chama a função getAllProducts que recarrega novamente a tabela com a atualização do produto
          this.$toast.success("Produto alterado com sucesso!"); //mostra a mensagem ao usuario
        })
        //em caso de erro
        .catch(() => {
          this.loading_btn = false; //define o loading botão com false
          this.$toast.error("Ocorreu um erro ao alterar o produto!"); //mostra a mensagem de erro ao atualizar o produto
        });
    },
    //função de deletar um produto
    deleteProduct() {
      this.loading_btn = true; //define o loading botão com true
      //chama a função de exclusão do produto da pasta importada da api/produtos, passando como parametro o id do produto
      excluirProduto(this.produto_id)
        //espera uma resposta positiva
        .then((res) => {
          this.loading_btn = false; //define o loading botão como false
          this.openDelete = false; //fecha o modal de delete
          this.getAllProducts(); //recarrega a tabela com a exclusão do produto
          this.$toast.success("Produto removido com sucesso!"); //mostra ao usuario um fedback
        })
        //em caso de erro
        .catch(() => {
          this.loading_btn = false; //define o loading botão como false
          this.$toast.error("Ocorreu um erro ao remover o produto!"); //define a mensagem de fedback ao usuario
        });
    },
    //função que limpa os dados de cadastro
    clearAllFields() {
      this.cadastro.produto = "";
      this.cadastro.categoria = "";
      this.cadastro.produto_valor = 0;
    },
  },
});
