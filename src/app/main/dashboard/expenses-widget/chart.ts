import * as Chart from 'chart.js';

export function createExpenseChart(ctx, dataset) {
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dataset.labels,
            datasets: [
                {
                    data: dataset.data,
                    backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850']
                }
            ]
        },
        options: {
            legend: {
                position: 'right'
            }
        }
    });
}
