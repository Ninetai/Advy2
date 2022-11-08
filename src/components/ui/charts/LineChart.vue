<template>
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :height="200" />
</template>
  
<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
    name: 'LineChart',
    components: {
        LineChartGenerator
    },
    props: [
        "points",
        "labels"
    ],
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        borderColor: '#f87979',
                        data: this.points,
                        tension: 0.4,
                        pointHoverRadius: 10,
                        radius: 0,
                        borderWidth: 2,
                        hoverBackgroundColor: "white"
                    }
                ]
            },
            chartOptions: {
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return value// + 'k';
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    title: {
                        display: false,
                        position: 'bottom',
                        //text: '2022'
                    },
                    legend: {
                        onClick: (e) => e.stopPropagation(),
                        display: false,
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return context[0].raw// + 'k';
                            },
                            label: function (context) {
                                const str = context.label// + ' ' + '2022';
                                return str;
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>
  