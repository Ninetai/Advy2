<template>
    <div class="card" :class="cls">
        <div class="d-flex align-items-center gap-2 mb-3">
            <slot name="title"></slot>
        </div>
        <div class="d-flex gap-1 flex-wrap">
            <div v-for="item, i in hashtags" :key="i">
                <button class="btn btn-light py-0">{{ item.tag }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["hashtags", "cls"]
    }
</script>