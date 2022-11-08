<template>
    <div class="modal-dialog modal-dialog-centered " style="max-width:545px">
        <div class="modal-content delete-content">
            <h3 style="margin-bottom:30px">Are you sure? {{description?.name}}? You will lose 100% budget</h3>
            <button type="button" class="input-style btn btn-dark fw-bold"
                style="margin-bottom:24px !important;">Delete</button>
            <button type="button" class="input-style btn mb-0 fw-bold" style="border:1px solid #367bf2"
                data-bs-dismiss="modal">Cancel</button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            description: 'campaignDescription',
        })
    },
}
</script>
<style scoped lang="scss">
.delete-content {
    padding: 3rem 6rem 3rem 6rem;
    border-radius: 16px;
}
</style>