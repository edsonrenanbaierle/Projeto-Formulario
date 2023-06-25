//Pasta para o controle dos produtos//
import axios from "axios"; //importação da biblioteca axios para facilitar os gets, push

const baseUrl = process.env.VUE_APP_BASE_API; //Recebe a url da Api para ter acesso da pasta .env

//Função para buscar de produtos, utilizado o export default para poder usar na aplicação
export function buscarProdutos() {
  const url = `${baseUrl}/produtos`; //contrução da url
  return axios.get(url); //solicitação dos dados a partir da url criada
}

//Função para buscar produto pelo seu Id, utilizado o export default para poder usar na aplicação
export function buscarProdutoPorId(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`; //contrução da url
  return axios.get(url); //solicitação dos dados a partir da url criada retornando o produto
}

//Função para adicionar produto passando como parametro os dados do produto, utilizado o export default para poder usar na aplicação
export function adicionarProduto(dadosProduto) {
  const url = `${baseUrl}/produtos`; //contrução da url
  return axios.post(url, dadosProduto); //requisição para enviar os dados do produto a api
}

//Função para atualizar algum dado do produto onde é passado o id do produto e seus dados, utilizado o export default para poder usar na aplicação
export function atualizarProduto(produtoId, dadosProduto) {
  const url = `${baseUrl}/produtos/${produtoId}`; //criação da url de acesso
  return axios.put(url, dadosProduto); //requisição para substituir/atualizar com os novos dados do produto
}

//Função para exclusão de um produto através do id passado como parametro, utilizado o export default para poder usar na aplicação
export function excluirProduto(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`; //criação da url de acesso
  return axios.delete(url); //requicição para deletar da api/banco de dados
}

//Função para a busca das categorias dos produtos
export function buscarCategoriasProdutos() {
  const url = `${baseUrl}/produtos/categorias`; //criação da url de acesso
  return axios.get(url); //solicitação das categorias dos produtos. ex: Mexicana, Brasileira
}
