$(function () {
    $.ajax({
        url: "../Game/observerWordsChart.php",
        type: "POST",
        dataType: "JSON",
        data: {},
        success: function (data) {
            if (data.WordsChart) {
                var keys = Object.keys(data.WordsChart);

                var seriesData = keys.map(function (key) {
                    return {
                        "from": new TextDecoder('utf-8').decode(new TextEncoder().encode(data.WordsChart[key][0])), // marche pas
                        "to": new TextDecoder('utf-8').decode(new TextEncoder().encode(data.WordsChart[key][1])),
                        "label": parseInt(data.WordsChart[key][2])
                    };
                });

                Highcharts.chart('container', {
                    title: {
                        text: '' // Remplacez par le nom que vous voulez
                    },
                    chart: {
                        type: 'networkgraph',
                        backgroundColor: '#ffffff77',
                        events: {
                            load: function () {
                                var nodes = this.series[0].nodes;
                                for (var i = 0; i < nodes.length; i++) {
                                    nodes[i].update({
                                        color: '#547E5E',
                                        borderColor: '#2B5C4A', // marche pas 
                                        borderWidth: 2 // marche pas
                                    });
                                }
                            }
                        }
                    },
                    credits: {
                        enabled: false // Désactive le lien Highcharts.com
                    },
                    plotOptions: {
                        networkgraph: {
                            layoutAlgorithm: {
                                enableSimulation: false, // Désactive la simulation physique
                                direction: 'horizontal' // Force une disposition horizontale
                            },
                            link: {
                                lineWidth: 2 // Épaisseur de la ligne
                            },
                            node: {
                                allowPointSelect: false,
                                draggable: false, // Désactive le déplacement des nœuds
                                opacity: 1
                            }
                        },
                        series: {
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    },
                    series: [{
                        allowPointSelect: false, // Désactive la sélection des points
                        draggable: false, // Désactive le déplacement des points
                        marker: {
                            radius: 40
                        },
                        dataLabels: {
                            enabled: true,
                            allowOverlap: true,
                            linkFormat: '{point.label}',
                            style: {
                                fontSize: '15px' // Ajustez la taille de police selon vos besoins
                            }
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
