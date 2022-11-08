<template>
    <div class="card card-style">
        <div class="d-flex justify-content-between mb-2">
            <slot name="icon"></slot>
            <div class="key-style"><slot name="key"></slot></div>
        </div>
        <h4><slot></slot></h4>
        <div class="d-flex align-items-center gap-2">
            <span class="text-secondary"><slot name="title"></slot></span>
            <slot name="icon-after"></slot>
        </div>
    </div>
</template>

<style scoped>
    .card-style {
        padding: 20px;
        width: 250px;
        border-radius: 16px;
        justify-content: space-between;
    }

    .key-style {
        background: #d6f3de;
        color: #34C759;
        border-radius: 3px;
    }

    .key-style > * {
        padding: 0px 5px;
    }
</style>