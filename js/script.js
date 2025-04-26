// Seletores
const valorRealInput = document.getElementById('valorReal');
const form = document.getElementById('formConversor');
const btcResultado = document.getElementById('btcResultado');
const cotacaoInfo = document.getElementById('cotacaoBTC');
const ctx = document.getElementById('graficoBTC').getContext('2d');

// Variáveis
let cotacaoBitcoin = 0;
let graficoBTC;

// Função para buscar a cotação atual
async function buscarCotacaoAtual() {
  try {
    const resposta = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
    const dados = await resposta.json();
    cotacaoBitcoin = dados.bitcoin.brl;
    cotacaoInfo.textContent = `(Cotação atual: R$ ${cotacaoBitcoin.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`;
  } catch (erro) {
    cotacaoInfo.textContent = 'Erro ao buscar cotação';
    console.error('Erro ao buscar cotação:', erro);
  }
}

// Função para converter Real para Bitcoin
function converter() {
  const valorReal = parseFloat(valorRealInput.value);

  if (isNaN(valorReal) || valorReal <= 0) {
    btcResultado.textContent = 'Digite um valor válido!';
    return;
  }

  const valorBTC = valorReal / cotacaoBitcoin;
  btcResultado.textContent = `≈ ${valorBTC.toFixed(8)} BTC`;
}

// Função para buscar histórico e gerar gráfico (30 dias)
async function gerarGrafico() {
  try {
    const resposta = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=30&interval=daily'
    );
    const dados = await resposta.json();

    const labels = dados.prices.map(preco => {
      const data = new Date(preco[0]);
      return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    });

    const valores = dados.prices.map(preco => preco[1]);

    if (graficoBTC) {
      graficoBTC.destroy();
    }

    graficoBTC = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Preço do Bitcoin (R$)',
          data: valores,
          borderColor: '#f7931a',
          backgroundColor: 'rgba(247, 147, 26, 0.2)',
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: '#f7931a',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return 'R$ ' + value.toLocaleString('pt-BR');
              },
              color: '#333'
            }
          },
          x: {
            ticks: {
              color: '#333'
            }
          }
        }
      }
    });

  } catch (erro) {
    console.error('Erro ao gerar gráfico:', erro);
  }
}

// Evento do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault();
  converter();
});

// Iniciar a aplicação
buscarCotacaoAtual();
gerarGrafico();
