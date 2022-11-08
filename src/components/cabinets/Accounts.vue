<template>
    <main>
        <AddAccount />
        <p class="fs-18 fw-bold">
            <translate>Accounts</translate>
        </p>
        <div class="border-r16 d-flex py-3 px-4 border-1 mb-3">
            <translate class="account-personal">Personal</translate>
            <div v-if="user">
                {{ user.user_email }}
            </div>
        </div>
        <div v-for="account in accountsList" class="border-r16 d-flex py-3 px-4 border-1 align-items-center gap-2">
            <translate class="account-personal">{{ account.name }}</translate>
            <Icon icon="ph:users" height=24 />
            <div class="flex-grow-1"> {{ account.users.length }}</div>
            <b-dropdown right variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                    <Icon icon="akar-icons:more-horizontal" height=25 width=25 color="black" />
                </template>
                <b-dropdown-item href="#">Editing</b-dropdown-item>
                <b-dropdown-item href="#">Users</b-dropdown-item>
                <b-dropdown-item href="#">Delete</b-dropdown-item>
            </b-dropdown>
        </div>
        <button class="btn btn-outline-primary mt-3 p-2 border-r16 px-3" @click="$bvModal.show('addAccount')">
            <translate>Add account </translate>
        </button>
    </main>
</template>
<script>
import { mapState } from "vuex"
import { Icon } from "@iconify/vue2"
import AddAccount from './AddAccount'

export default {
    computed: {
        ...mapState(['user', 'accountsList']),
    },
    components: {
        Icon,
        AddAccount
    }
}
</script>
<style scoped lang="scss">
.account-personal {
    flex-basis: 37%;
    font-weight: 600;
    margin-right: 24px;
}
</style>