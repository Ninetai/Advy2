<template>
    <div class="card" :class="cls">
        <div class="d-flex align-items-center gap-2 mb-3">
            <div class="d-flex align-items-center gap-2">
                <slot name="title"></slot>
                <slot name="icon"></slot>
            </div>
        </div>
        <Doughnut :labels="labels" :points="points" style="height:210px" />
        <div class="d-flex mt-4">
            <div class="d-flex justify-content-center align-items-center gap-2 col" v-for="(point, idx) in points" :key="idx">
                {{ labels[idx] }}
                <span class="">{{ Math.round(point * parseInt(mult)) }}%</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Doughnut from '@/components/ui/charts/Doughnut.vue'
    export default {
        props: ["labels", "points", "mult", "cls"],
        components: {
            Doughnut
        }
    }
</script>

<style scoped>
</style>