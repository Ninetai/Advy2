<template>
    <div class="card" :class="cls">
        <div class="d-flex justify-content-between mb-3">
            <div class="d-flex align-items-center gap-2">
                <slot name="title"></slot>
            </div>
            <a href="#" @click.prevent="$emit('show_more')"><translate class="text-danger">Show more</translate></a>
        </div>
        <div v-for="item in users" :key="item.user_id" class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex gap-3">
                <img :src="item.picture" alt="" style="margin-top:5px; width:60px;height: 57px;" />
                <div class="text-break d-flex justify-content-center flex-column">
                    <div class="fw-bold">{{ item.fullname }}</div>
                    <div class="text-secondary">
                        @{{ item.username }}
                    </div>
                </div>
            </div>
            <a :href="item.url" target="_blank" class="btn btn-dark">
                <translate>View</translate>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["users", "cls"]
    }
</script>