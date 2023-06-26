//pasta de controle dos pedidos //
import axios from "axios"; //importação da biblioteca axios para facilitar os gets, push

//Recebe a url da Api para ter acesso
const baseUrl = process.env.VUE_APP_BASE_API;

//Função de busca de pedidos, utilizado o export default para poder usar na aplicação
export function buscarPedidos() {
  const url = `${baseUrl}/pedidos`; //controi a url a partir da base da api/pedidos para acessar
  return axios.get(url); //realizada a requisição a partir da url e retorna uma promise
}

//função  de buscar pedido passando o id como paramentro
export function buscarPedidoPorId(pedidoId) {
  const url = `${baseUrl}/pedidos/${pedidoId}`; //cria a url para buscar o pedido através do id
  return axios.get(url); //realizada a requisição a partir da url e retorna uma promise
}
//função que vusca os detalhes do pedido
export function buscarPedidosDetalhes() {
  const url = `${baseUrl}/pedidos/detalhes`; //criação da url
  return axios.get(url); //realizada a requisição
}

//função no qual adiciona pedido recebendo como parametro os dados do pedido
export function adicionarPedido(dadosPedido) {
  const formaPagamento = dadosPedido[0].forma_pag; //extrai a forma de pagamento no array na posição 0
  const itens = []; //criação do array de itens

  //percorrido os dados do pedido começando no segundo elemento
  for (let i = 1; i < dadosPedido.length; i++) {
    const item = dadosPedido[i]; //os elementos são armazenados na variavel item
    for (let j = 0; j < item.quantidade; j++) {
      //percorrido a quantidade de itens
      itens.push(item.produtoId); //no array itens é feito um push com o id dos produtos do pedido
    }
  }

  //tratamento para ir para a api/banco de dados em json
  const pedidoTratado = {
    itens: itens,
    tipoPagamento: formaPagamento,
  };
  const url = `${baseUrl}/pedidos`;
  return axios.post(url, pedidoTratado);
}

//função de exclusão do pedido através do id
export function excluirPedido(pedidoId) {
  const url = `${baseUrl}/pedidos/${pedidoId}`; //contrução da url conforme o id do produto
  return axios.delete(url); //requisição do tipo delete para deletar o produto
}
