$(function () {
    $.ajax({
        url: "../Game/game.php",
        type: "POST",
        dataType: "JSON",
        data: { },
        success: function (data) {
            if (data.WordsChart) {
                var keys = Object.keys(data.WordsChart);
            
                var seriesData = keys.map(function(key) {
                    return {
                        "from": data.WordsChart[key][0],
                        "to": data.WordsChart[key][1],
                        "label": parseInt(data.WordsChart[key][2])
                    };
                });
            
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
                        data: seriesData
                    }]
                });
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
});
