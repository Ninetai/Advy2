<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" />
</template>
  
<script>
import { Bar } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: {
        Bar
    },
    props: {
    },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 8, 12, 18, 14, 8, 12, 19, 14, 8, 12, 11],
                        borderRadius: '16',
                        barThickness: 20,
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return value + 'k';
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        position: 'bottom',
                        text: this.$gettext('October') + ' 2022'
                    },
                    legend: {
                        onClick: (e) => e.stopPropagation(),
                        display: false,
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return context[0].raw + 'k';
                            },
                            label: function (context) {
                                const str = 'Day' + ' ' + context.label;
                                return str;
                            }
                        }
                    }
                }
            }
        }
    },
    mounted() {
        const DATA_COUNT = 31;
        for (let i = 1; i < DATA_COUNT; ++i) {
            this.chartData.labels.push(i.toString());
        }
    }
}
</script>
  