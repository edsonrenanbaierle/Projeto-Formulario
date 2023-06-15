import axios from "axios";

const baseUrl = process.env.API_URL; // Change this URL to match your server URL

// Function to fetch all products
export function buscarProdutos() {
  const url = `${baseUrl}/produtos`;
  return axios.get(url);
}

// Function to fetch a specific product by ID
export function buscarProdutoPorId(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.get(url);
}

// Function to add a new product
export function adicionarProduto(dadosProduto) {
  const url = `${baseUrl}/produtos`;
  return axios.post(url, dadosProduto);
}

// Function to update a product
export function atualizarProduto(produtoId, dadosProduto) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.put(url, dadosProduto);
}

// Function to delete a product
export function excluirProduto(produtoId) {
  const url = `${baseUrl}/produtos/${produtoId}`;
  return axios.delete(url);
}

// Function to fetch all product categories
export function buscarCategoriasProdutos() {
  const url = `${baseUrl}/produtos/categorias`;
  return axios.get(url);
}
