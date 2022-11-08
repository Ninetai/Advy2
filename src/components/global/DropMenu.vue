<template>
    <div class="dropup right-menu">
        <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <Icon icon="iwwa:option" width="25px" color="gray" />
        </a>
        <ul class="dropdown-menu ">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
    </div>
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
.right-menu {
    margin-top: -9px;
}
</style>