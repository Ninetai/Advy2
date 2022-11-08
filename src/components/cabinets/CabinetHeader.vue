<template>
    <div class="card mt-4 border-r16 border-0 ">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div class="modal-header border-0 justify-content-start gap-3 align-items-baseline">
                    <button type="button" class="back-button" @click.prevent="$router.push({ name: 'campaigns' })">
                        <Icon icon="bx:arrow-back" color="#367bf2" />
                    </button>
                    <h5 class="modal-title fw-bold">
                        <translate>Personal cabinet</translate>
                    </h5>
                </div>
                <div class=" d-flex gap-3">
                    <button type="button" class=" btn btn-outline-primary input-style" @click="$bvModal.show('edit')">
                        <translate>Editing Data </translate>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Icon } from '@iconify/vue2';
export default {
    components: {
        Icon,
    }
}
</script>
<style>

</style>