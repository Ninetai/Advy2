<template>
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" />
</template>
  
<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
    name: 'DoughnutChart',
    components: {
        Doughnut
    },
    props: ["labels", "points"],
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: ['#fc7461', '#619ffc'],
                        data: this.points
                    }
                ],

            },
            chartOptions: {
                responsive: true,
                cutout: '60%',
                maintainAspectRatio: false,
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                },
                plugins: {
                    legend: {
                        display: false,
                        position: 'bottom',
                    },
                }
            }
        }
    }
}
</script>
  