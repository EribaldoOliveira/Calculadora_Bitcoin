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

// Exemplo de gráfico (dados fictícios)
window.addEventListener('load', () => {
  const ctx = document.getElementById('graficoBTC').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1}/04`),
      datasets: [{
        label: 'Preço BTC (R$)',
        data: Array.from({ length: 30 }, () => (240000 + Math.random() * 20000)),
        borderColor: '#f7931a',
        backgroundColor: 'rgba(247, 147, 26, 0.2)',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
});
