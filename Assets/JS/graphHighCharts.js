$(function () {
    $.ajax({
        url: "../../Includes/game.php",
        type: "POST",
        dataType: "JSON",
        data: { },
        success: function (data) {
            if (data.WordsChart) {
                console.log(data.WordsChart);
                var keys = Object.keys(data.WordsChart);
            
                var seriesData = keys.map(function(key) {
                    return {
                        from: parseFloat(data.WordsChart[key][0]),
                        to: parseFloat(data.WordsChart[key][1]),
                        "label": parseFloat(data.WordsChart[key][2])
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
