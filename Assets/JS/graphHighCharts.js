$(function () {
    $.ajax({
        url: "../Game/observerWordsChart.php",
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
                    title: {
                        text: '' // Remplacez par le nom que vous voulez
                    },
                    chart: {
                        type: 'networkgraph',
                        backgroundColor: 'transparent',
                    },
                    credits: {
                        enabled: false // Désactive le lien Highcharts.com
                    },
                    plotOptions: {
                        networkgraph: {
                            layoutAlgorithm: {
                                enableSimulation: false // Désactive la simulation physique
                            },
                            link: {
                                lineWidth: 2 // Épaisseur de la ligne
                            },
                            node: {
                                draggable: false // Désactive le déplacement des nœuds
                            }
                        }
                    },
                    series: [{
                        allowPointSelect: false, // Désactive la sélection des points
                        draggable: false, // Désactive le déplacement des points
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
