import * as Chart from 'chart.js';

export function createChart(ctx, dataset) {
    return new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataset.labels,
          datasets: [
            {
              fill: 'rgba(220,220,220,0.2)',
              data: dataset.data,
              lineTension: 0,
              borderColor: 'green',
              pointRadius: 5
            },
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 14,
                  padding: 20,
                  callback: function(value, index, values) {
                    return 'N' + value;
                  }
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 6,
                  autoSkip: true,
                  fontSize: 14,
                  padding: 15
                },
              }
            ]
          }
        }
    });
}
