import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsReact from 'highcharts-react-official';
import "../../assets/css/Graph.css"


HighchartsNetworkgraph(Highcharts);

interface WordsChartData {
    from: string;
    to: string;
    label: number;
}

interface TestData {
    WordsChart: {
        [key: string]: string[];
    };
}

const testData: TestData = {
    WordsChart: {
        key1: ["chat", "chien", "5"],
        key2: ["chien", "poireau", "25"],
        key3: ["poireau", "souris", "49"],
        key4: ["souris", "toupie", "49"] ,
        key5: ["toupie","bloupi","14"],
        key6: ["chat","camion","25"],
        key7: ["bloupi","courir","22"],
        key8: ["rat","courir","1"],
        key9: ["rat",'voiture',"2"], 
        key10: ["voiture","a","45"],
        key11: ["a","red","95"],
        key12: ["red","blue","88"]
    }
};

const ObserverWordsChart: React.FC<{newWord: string}> = ({ newWord }) => {
    const [seriesData, setSeriesData] = useState<WordsChartData[]>([]);

    useEffect(() => {
        if (newWord) {
            // Mettre à jour les données du graphique avec le nouveau mot
            console.log("Nouveau mot:", newWord);
        }
    }, [newWord]);

    useEffect(() => {
        // Sample test data
        

        const keys = Object.keys(testData.WordsChart);

        const formattedData: WordsChartData[] = keys.map((key) => ({
            from: testData.WordsChart[key][0],
            to: testData.WordsChart[key][1],
            label: parseInt(testData.WordsChart[key][2]),
        }));

        setSeriesData(formattedData);
    }, []);

    const chartOptions: Highcharts.Options = {
        title: {
            text: '', 
        },
        chart: {
            type: 'networkgraph',
            backgroundColor: 'transparent',
            
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            networkgraph: {
                layoutAlgorithm: {
                    enableSimulation: false,
                },
            },
            series: {
                states: {
                    hover: {
                        enabled: true,
                    },
                },
            },
        },
        series: [
            {
                type: 'networkgraph', 
                allowPointSelect: false,
                draggable: false,
                marker: {
                    radius: 50,
                    fillColor: '#4d6c48'
                },
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    linkFormat: '{point.label}',
                    style: {
                        fontSize: '17px',
                    },
                },
                data: seriesData,
            },
        ],
    };

    return (
        <div
            id="container"
            // style={{ textAlign: 'center', border: '1px solid var(--viridian)' }}
        >
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default ObserverWordsChart;
