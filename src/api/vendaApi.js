//Pasta de controle das vendas
import axios from "axios"; //importação da biblioteca axios para facilitar os gets, push

const baseUrl = process.env.VUE_APP_BASE_API; //Recebe a url da Api para ter acesso da pasta .env

//Função para busca de vendas na api, utilizando o export default para poder usar na aplicação
export function buscarVendas() {
  const url = `${baseUrl}/vendas`; //criação da url de acesso
  return axios.get(url); //requicição das informações de venda
}

//Função para adicionar uma venda com parametros do id do produto e quantidade, utilizando o export default para poder usar na aplicação
export function adicionarVenda(produtoId, quantidadeProduto) {
  const url = `${baseUrl}/vendas/${produtoId}`; //criação da url de acesso
  return axios.post(url, { quantidadeProduto }); //requicição para criar um novo recurso enviando a quantidade do produto
}

//Função de exclusão de uma venda, passando como paramentro  o id da venda, utilizando o export default para poder usar na aplicação
export function excluirVenda(vendaId) {
  const url = `${baseUrl}/vendas/${vendaId}`; //criação da url de acesso
  return axios.delete(url); //requisição para deletar
}
