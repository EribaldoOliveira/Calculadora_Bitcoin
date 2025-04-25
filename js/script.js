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

  async function carregarGraficoBTC() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=30"
      );
      const data = await response.json();
      const labels = data.prices.map(item => {
        const date = new Date(item[0]);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });
  
      const valores = data.prices.map(item => item[1]);
  
      const ctx = document.getElementById("graficoBTC").getContext("2d");
  
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Preço do BTC (R$)",
            data: valores,
            borderColor: "orange",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            tension: 0.2,
            pointRadius: 0,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    } catch (error) {
      console.error("Erro ao carregar gráfico do BTC:", error);
    }
  }
  
  window.addEventListener("load", carregarGraficoBTC);
  

