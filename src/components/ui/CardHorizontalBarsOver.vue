<template>
    <div class="card" :class="cls">
        <div class="d-flex align-items-center gap-2 mb-3">
            <slot name="title"></slot>
            <slot name="icon"></slot>
        </div>
        <div v-for="d, index in data" :key="index">
            <div class="d-flex mb-3">
                <div class="prog-label">
                    {{ d[name] }}
                </div>
                <div class="d-flex align-items-center gap-2 flex-grow-1"
                            style="background:rgba(99, 109, 121, 0.07); border-radius:16px">
                    <div class="prog-bar" :class="minProg(d[value] * parseInt(mult))" :style="{ width: d[value] * parseInt(mult) + '%' }"></div>
                    <span class="flex-grow-1 text-end pr-3" style="font-weight:600">{{ Math.round(d[value] * parseInt(mult)) }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["data", "name", "value", "mult", "cls"],
        methods: {
            minProg(val) {
                const tmp = val;
                if (tmp > 0 && tmp <= 5)
                    return 'prog-bgBlue';
                else if (tmp > 5 && tmp <= 20)
                    return 'prog-bgPurple'
                else if (tmp > 20 && tmp <= 30)
                    return 'prog-bgYellow'
                else if (tmp > 30 && tmp <= 50)
                    return 'prog-bgDarkyellow'
                else if (tmp > 50)
                    return 'prog-bgRed'
                else
                    return '';
            }
        }
    }
</script>

<style scoped>
    .prog-bar {
        background-color: #636d79;
        height: 25px;
        border-radius: 16px;
        padding: 2px;
    }

    .prog-label {
        font-weight: bold;
        position: absolute;
        text-align: center;
        padding-left: 0.5rem;
    }

    .prog-bgBlue {
        background: #619ffc;
    }

    .prog-bgPurple {
        background: #a561fc;
    }

    .prog-bgYellow {
        background: linear-gradient(180deg, #f2c41e 0%, #fcda61 100%);
    }

    .prog-bgDarkyellow {
        background: linear-gradient(180deg, #f37f15 0%, #fcab61 100%);
    }

    .prog-bgRed {
        background: linear-gradient(180deg, #f5513a 0%, #fc7461 100%);
    }
</style>