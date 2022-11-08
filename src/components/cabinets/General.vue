<template>
    <main>
        <p class="fs-18 fw-bold">
            <translate>General info </translate>
        </p>
        <form action="#" class="d-flex justify-content-between">
            <div class="cabinet-user">
                <Icon icon="bx:user" width=25 height=25 />
            </div>
            <div>
                <label for="name" class="text-secondary">
                    <translate>Name</translate>
                </label>
                <div class="fw-bold">
                    {{ editForm.name }}
                </div>
            </div>
            <div>
                <label for="name" class="text-secondary">
                    <translate>Surname</translate>
                </label>
                <div class="fw-bold">
                    {{ editForm.surname }}
                </div>
            </div>
            <div>
                <label for="name" class="text-secondary">
                    <translate>Email</translate>
                </label>
                <div class="fw-bold">
                    {{ editForm.email }}
                </div>
            </div>
            <div>
                <label for="name" class="text-secondary">
                    <translate>Phone</translate>
                </label>
                <div class="fw-bold">
                    {{ editForm.phone }}
                </div>
            </div>
        </form>
    </main>
</template>
<script>
import { Icon } from "@iconify/vue2"
export default {
    data() {
        return {

        }
    },
    components: {
        Icon,
    },
    props: ['editForm'],
}
</script>
<style>
.cabinet-user {
    background: #f8f7fe;
    padding: 12px;
    border-radius: 12px;
}
</style>