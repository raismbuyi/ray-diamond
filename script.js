const energyForm = document.getElementById('energyForm');
const chartContainer = document.getElementById('chartContainer');

energyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const gasUsage = parseFloat(this.elements.gasUsage.value);
  const electricityUsage = parseFloat(this.elements.electricityUsage.value);
  const waterUsage = parseFloat(this.elements.waterUsage.value);

  if (isNaN(gasUsage) || isNaN(electricityUsage) || isNaN(waterUsage)) {
    alert('Veuillez entrer des valeurs numériques valides.');
    return;
  }

  const gasCost = gasUsage * 0.05; // Coût du gaz par unité
  const electricityCost = electricityUsage * 0.12; // Coût de l'électricité par unité
  const waterCost = waterUsage * 0.002; // Coût de l'eau par litre

  const totalCost = gasCost + electricityCost + waterCost;

  // Afficher le graphique
  displayChart(gasCost, electricityCost, waterCost, totalCost);
});

function displayChart(gasCost, electricityCost, waterCost, totalCost) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gaz', 'Électricité', 'Eau'],
      datasets: [{
        label: 'Coût par type d\'énergie',
        data: [gasCost, electricityCost, waterCost],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  // Afficher le coût total
  const totalCostDiv = document.createElement('div');
  totalCostDiv.innerHTML = `<h2>Coût Total : $${totalCost.toFixed(2)}</h2>`;
  chartContainer.appendChild(totalCostDiv);
}