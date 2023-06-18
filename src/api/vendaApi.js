import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_API; // Change this URL to match your server URL

// Function to fetch all sales
export function buscarVendas() {
  const url = `${baseUrl}/vendas`;
  return axios.get(url);
}

// Function to add a new sale
export function adicionarVenda(produtoId, quantidadeProduto) {
  const url = `${baseUrl}/vendas/${produtoId}`;
  return axios.post(url, { quantidadeProduto });
}

// Function to delete a sale
export function excluirVenda(vendaId) {
  const url = `${baseUrl}/vendas/${vendaId}`;
  return axios.delete(url);
}
