import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_API;

export function buscarVendas() {
  const url = `${baseUrl}/vendas`;
  return axios.get(url);
}

export function adicionarVenda(produtoId, quantidadeProduto) {
  const url = `${baseUrl}/vendas/${produtoId}`;
  return axios.post(url, { quantidadeProduto });
}

export function excluirVenda(vendaId) {
  const url = `${baseUrl}/vendas/${vendaId}`;
  return axios.delete(url);
}
