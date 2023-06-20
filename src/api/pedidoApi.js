import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_API;

export function buscarPedidos() {
  const url = `${baseUrl}/pedidos`;
  return axios.get(url);
}

export function buscarPedidoPorId(pedidoId) {
  const url = `${baseUrl}/pedidos/${pedidoId}`;
  return axios.get(url);
}

export function adicionarPedido(dadosPedido) {
  const formaPagamento = dadosPedido[0].forma_pag;
  const itens = [];

  for (let i = 1; i < dadosPedido.length; i++) {
    const item = dadosPedido[i];
    for (let j = 0; j < item.quantidade; j++) {
      itens.push(item.produtoId);
    }
  }

  const pedidoTratado = {
    itens: itens,
    formaPagamento: formaPagamento,
  };
  const url = `${baseUrl}/pedidos`;
  console.warn(pedidoTratado);
  return axios.post(url, { pedidoTratado });
}

export function excluirPedido(pedidoId) {
  const url = `${baseUrl}/pedido/${pedidoId}`;
  return axios.delete(url);
}
