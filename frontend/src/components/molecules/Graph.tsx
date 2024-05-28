import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsReact from 'highcharts-react-official';
import "../../assets/css/Graph.css"


HighchartsNetworkgraph(Highcharts);

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
                    enableSimulation: true,
                },
            },
            series: {
                enableMouseTracking: false,
                states: {
                    hover: {
                        enabled: true,
                    },
                    inactive: {
                        enabled: true,
                        linkOpacity: 0,
                        opacity: 0,
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
                    fillColor: '#82a14e',
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
                link: {
                    color: "#000",
                    width:2,
                },
                    
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
