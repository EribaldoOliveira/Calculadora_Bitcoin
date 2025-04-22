function converter() {
    const valorReal = parseFloat(document.getElementById("valorReal").value);
    const cotacaoBTC = 250000; // Valor fictício, pode ser dinâmico com API futuramente
    const resultado = valorReal / cotacaoBTC;

    const saida = document.getElementById("resultado");
    saida.textContent = `≈ ${resultado.toFixed(8)} BTC`;
  }


  async function converter() {
    const valorReal = parseFloat(document.getElementById("valorReal").value);
    const resultadoBTC = document.getElementById("btcResultado");
    const cotacaoInfo = document.getElementById("cotacaoBTC");

    if (isNaN(valorReal)) {
      resultadoBTC.textContent = "Por favor, digite um valor válido.";
      cotacaoInfo.textContent = "";
      return;
    }

    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl");
      const data = await response.json();
      const cotacaoBTC = data.bitcoin.brl;

      const valorConvertido = valorReal / cotacaoBTC;
      resultadoBTC.textContent = `≈ ${valorConvertido.toFixed(8)} BTC`;
      cotacaoInfo.textContent = `(Cotação: R$ ${cotacaoBTC.toLocaleString('pt-BR')})`;
    } catch (error) {
      resultadoBTC.textContent = "Erro ao buscar cotação.";
      cotacaoInfo.textContent = "";
      console.error("Erro ao obter cotação do Bitcoin:", error);
    }
  }

