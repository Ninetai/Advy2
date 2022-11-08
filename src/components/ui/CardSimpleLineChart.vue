<template>
    <div class="card" :class="cls">
        <div class="d-flex justify-content-between my-3">
            <div class="d-flex align-items-center gap-2">
                <slot name="title"></slot>
                <slot name="icon"></slot>
            </div>
            <div class="key-style"><slot name="key"></slot></div>
        </div>
        <LineChart :labels="labels" :points="points" />
    </div>
</template>

<script>
    import LineChart from '@/components/ui/charts/LineChart.vue'
    export default {
        props: ["labels", "points", "cls"],
        components: {
            LineChart
        }
    }
</script>

<style scoped>
    .key-style {
        background: #d6f3de;
        color: #34C759;
        border-radius: 3px;
    }

    .key-style:has(.danger) {
        background: #ff9183;
        color: #f72525;
        border-radius: 3px;
    }

    .key-style > * {
        padding: 0px 5px;
    }
</style>