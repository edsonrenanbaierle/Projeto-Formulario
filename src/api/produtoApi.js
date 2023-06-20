import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_API;

export function buscarProdutos() {
  const url = `${baseUrl}/produtos`;
  return axios.get(url);
}

export function buscarProdutoPorId(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.get(url);
}

export function adicionarProduto(dadosProduto) {
  const url = `${baseUrl}/produtos`;
  return axios.post(url, dadosProduto);
}

export function atualizarProduto(produtoId, dadosProduto) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.put(url, dadosProduto);
}

export function excluirProduto(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.delete(url);
}

export function buscarCategoriasProdutos() {
  const url = `${baseUrl}/produtos/categorias`;
  return axios.get(url);
}
