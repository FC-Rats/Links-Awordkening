import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsReact from 'highcharts-react-official';
import "../../assets/css/Graph.css"
import useMediaQuery from '@mui/material/useMediaQuery';


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
const isSmallScreen = useMediaQuery('(max-width:800px)');
    console.log(data);
    const [seriesData, setSeriesData] = useState<WordsChartData[]>([]);

    const keys = Object.keys(data.WordsChart);
    const firstWordDefault = '';
    const secondWordDefault = '';
    
    const firstKey = keys[0];
    const lastKey = keys[keys.length - 1];
    const words = data.WordsChart[firstKey];
    const lastWords =  data.WordsChart[lastKey];
    var firstWord = firstWordDefault;
    var secondWord = secondWordDefault;
    
    if (words && words.length == 1) {
        firstWord = words[0];
        secondWord = words[1];
    } else if (words && words.length > 1) {
        firstWord = words[0];
        secondWord = lastWords[1];
    }

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
                enableMouseTracking: !isSmallScreen,
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
                allowPointSelect:  true, 
                draggable:  true,
                marker: {
                    radius: isSmallScreen ? 25 : 50,
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
                nodes: [{
                    id:  firstWord,
                    marker: {
                        fillColor: "#6A5138",
                    },
                }, {
                    id: secondWord,
                    marker: {
                        fillColor: "#6A5138",
                    },
                },
            ],
                link: {
                    color: "#6A5138",
                    width:3,
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
