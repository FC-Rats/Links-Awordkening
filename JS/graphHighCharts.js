document.addEventListener('DOMContentLoaded', () => {
    Highcharts.chart('container', {
        chart: {
            type: 'networkgraph'
        },
        plotOptions: {
            networkgraph: {
                layoutAlgorithm: {
                    enableSimulation: true
                }
            }
        },
        series: [{
            marker: {
                radius: 30
            },
            dataLabels: {
                enabled: true,
                allowOverlap: true,
                linkFormat: '{point.label}'
            },
            data: [
                { from: 'A', to: 'B', "label": '1' },
                { from: 'A', to: 'C', "label": '1' },
                { from: 'B', to: 'C', "label": '4' }
            ]
        }]
    });
});