import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsReact from 'highcharts-react-official';
import "../../assets/css/Graph.css"


HighchartsNetworkgraph(Highcharts);

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

export interface WordsChartData {
    from: string;
    to: string;
    label: number;
}

export interface TestData {
    WordsChart: {
        [key: string]: string[];
    };
}

interface GraphProps{
    data : TestData;
}

const ObserverWordsChart: React.FC<GraphProps> = ({ data }) => {
    const [seriesData, setSeriesData] = useState<WordsChartData[]>([]);

    useEffect(() => {
        console.log(data);
        // Sample test data
        const keys = Object.keys(data.WordsChart);

        const formattedData: WordsChartData[] = keys.map((key) => ({
            from: data.WordsChart[key][0],
            to: data.WordsChart[key][1],
            label: parseInt(data.WordsChart[key][2]),
        }));

        setSeriesData(formattedData);
    }, [data]);

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
                    fillColor: '#82a14e'
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
