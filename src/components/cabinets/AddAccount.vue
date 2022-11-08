<template>
    <b-modal id="addAccount" centered hide-header hide-footer>
        <template #default="{ hide }">
            <div class="text-center" style="padding:70px">
                <h3 class="fw-bold mb-4">
                    <translate>New account</translate>
                </h3>
                <input type="text" class="form-control input-style mb-3" :placeholder="$gettext('Account name')">
                <input type="text" class="form-control input-style mb-3" :placeholder="$gettext('Head office address')">
                <input type="text" class="form-control input-style mb-3" :placeholder="$gettext('Phone number')">
                <input type="text" class="form-control input-style mb-3" :placeholder="$gettext('Website address')">
                <input type="text" class="form-control input-style mb-4" :placeholder="$gettext('UNP')">

                <button class="btn input-style btn-dark col  mb-4">
                    <translate> Add </translate>
                </button>
                <button class="btn input-style btn-outline-primary col" @click="$bvModal.hide('addAccount')">
                    <translate>Cancel </translate>
                </button>


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