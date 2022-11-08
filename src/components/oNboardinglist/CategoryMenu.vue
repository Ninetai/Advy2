<template>

    <ul class="dropdown-menu border-r10">
        <li class="px-3 py-1 position-relative">
            <Icon icon="bx:search" class="search-icon" width="24px" color="gray" />
            <input type="text" class="form-control searchmenu-input">
        </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li class="px-3 py-1">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label ps-3" for="flexCheckDefault">
                🕹️<translate>Games & Fun</translate></label>
        </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li class="px-3 py-1">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label ps-3" for="flexCheckDefault">
                💸<translate>Business & Finance</translate></label>
        </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li class="px-3 py-1">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label ps-3" for="flexCheckDefault">
                👫<translate>Dating and people</translate></label>
        </li>
    </ul>

</template>
<script>
import { Icon } from '@iconify/vue2'

export default {
    components: {
        Icon
    }
}
</script>
<style scoped>
.search-icon {
    left: 27px !important;
}
</style>