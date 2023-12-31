export default {
  data() {
    return {
      //Informações que compõem a tabela principal na aba meus pedidos
      headersPedido: [
        {
          text: "Pedido",
          value: "idPedido",
          align: "center",
          width: 200,
        },
        {
          text: "Tipo do Pagamento",
          value: "tipoPagamento",
          align: "center",
          width: 200,
        },
        {
          text: "Data/Hora do Pedido",
          value: "pedidoData",
          align: "center",
          width: 200,
        },
        {
          text: "Ações",
          value: "actions",
          align: "center",
          width: 200,
        },
      ],
      //Informações que compõem a tabela de detalhe do pedido na aba meus pedidos
      headersPedidoDetalhe: [
        {
          text: "ID",
          value: "produtoId",
          align: "center",
          width: 200,
        },
        {
          text: "Descrição",
          value: "produtoDescricao",
          align: "center",
          width: 200,
        },
        {
          text: "Valor do Produto",
          value: "produtoValor",
          align: "center",
          width: 200,
        },
        {
          text: "Categoria",
          value: "categoria",
          align: "center",
          width: 200,
        },
      ],
    };
  },
  //metodos responsaveis por abrir os modais
  methods: {
    //model de delete dos pedidos
    openDeleteModal(id) {
      this.$pedidos_controller.openDelete = true;
      this.$pedidos_controller.sale_id = id;
    },
    //model de detalhes dos pedidos
    openDetailModal(id) {
      this.$pedidos_controller.openDetails = true;
      this.$pedidos_controller.getPedidoById(id);
    },
    exportToCSV() {
      const filename = "produtos.csv";
      // const csvData = this.convertToCSV(this.$pedidos_controller.pedidos);
      const csvData = this.convertToCSV(this.$pedidos_controller.relatorio);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

      // Verifica se o navegador é compatível com o método de download
      if (navigator.msSaveBlob) {
        // Internet Explorer
        navigator.msSaveBlob(blob, filename);
      } else {
        // Outros navegadores
        const link = document.createElement("a");
        if (link.download !== undefined) {
          // Define o link para o arquivo CSV
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    //função que converte um array data para csv
    convertToCSV(data) {
      const separator = ","; //separador de campos
      const keys = Object.keys(data[0]); //obtem as propriedades do primeiro objeto
      const headerRow = keys.join(separator);

      //itera sobre os itens do array e retorna um novo array rows
      const rows = data.map((item) => {
        return keys
          .map((key) => {
            const cellValue = item[key]; //obtem o valor da celula correspondente a chave atual iterada

            //verifica se é um objeto e não é nullo
            if (typeof cellValue === "object" && cellValue !== null) {
              const stringJson = JSON.stringify(cellValue); //converte para json
              const escapedValue = stringJson.replace(/"/g, '""'); //troca aspas '' por ""
              return `"${escapedValue}"`; //retorna o valor entre aspas ""
            } else {
              const escapedValue = cellValue.toString().replace(/"/g, '""'); //converte para string
              return `"${escapedValue}"`; //retorna o valor entre aspas ""
            }
          })
          .join(separator); //junta com o separador de linha
      });

      return `${headerRow}\n${rows.join("\n")}`; //retorna o cabeçalho e as linhas do Csv
    },
  },
};
