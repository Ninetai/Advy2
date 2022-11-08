<template>
    <b-modal id="addCard" centered hide-header hide-footer>
        <template #default="{ hide }">
            <div class="p-3">
                <h3 class="fw-bold mb-4">
                    <translate> Addition of a new card</translate>
                </h3>
                <input type="text" class="form-control input-style mb-3" :placeholder="$gettext('Card number')">
                <div class="d-flex gap-4 mb-3">
                    <input type="text" class="form-control input-style" :placeholder="$gettext('Holder Name')">
                    <div class="d-flex gap-3">
                        <input type="text" class="form-control input-style" :placeholder="$gettext('MM/YY')">
                        <input type="text" class="form-control input-style" :placeholder="$gettext('CVC')">
                    </div>
                </div>
                <div class="border-b1 mb-3"></div>
                <div class="d-flex gap-3">
                    <button class="btn input-style btn-outline-primary col" @click="$bvModal.hide('addCard')">
                        <translate>Cancel </translate>
                    </button>
                    <button class="btn input-style btn-dark col">
                        <translate> Add </translate>
                    </button>
                </div>
            </div>
        </template>
    </b-modal>
</template>
<script>
</script>
<style lang="scss">
#addCard {
    .modal-dialog {
        max-width: 632px;
    }
}
</style>