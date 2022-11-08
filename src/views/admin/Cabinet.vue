<template>
    <main>
        <CabinetHeader />
        <div class="d-flex gap-3">
            <div class="card mt-4 border-r16 border-0 col">
                <div class="card-body">
                    <General :editForm="editForm" />
                    <div class="border-b1 mt-3"></div>
                    <Payment class="mt-4" />
                </div>
            </div>
            <div class="card mt-4 border-r16 border-0 col">
                <div class="card-body">
                    <Accounts />
                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import { buildGetParams } from "@/functions/buildGetParams";
import CabinetHeader from '@/components/cabinets/CabinetHeader.vue'
import General from "@/components/cabinets/General.vue"
import Accounts from "@/components/cabinets/Accounts.vue"
import Payment from "@/components/cabinets/Payment.vue"

export default {
    name: 'CabinetView',
    components: {
        CabinetHeader,
        Accounts,
        General,
        Payment,
    },
    data() {
        return {
            scene: 'data',
            currentAccountId: null,
            selectedAccountId: null,
            isOpenedPopup: null,
            editForm: {
                name: '',
                email: '',
                surname: '',
                phone: '',
                password: '',
                passwordConfirmation: '',
            },
            selectedAccount: null,
        }
    },
    created() {
        this.loadCabinetInfo();
    },
    methods: {
        ...mapActions([
            'getUsersAccount',
            'getUsersProfilePage',
            'deleteUser',
            'putProfileUpdate',
            'putPasswordUpdate',
        ]),
        loadCabinetInfo() {
            this.getUsersAccount()
                .then((response) => {
                    let userAccountList = response.data[0];
                    this.currentAccountId = userAccountList[0].id;

                    this.getUsersProfilePage(this.currentAccountId)
                        .then((response) => {
                            const userInfo = response.data[0];

                            this.editForm = {
                                name: userInfo.user_first_name,
                                email: userInfo.user_email,
                                surname: userInfo.user_last_name || '',
                                phone: userInfo.user_phone,
                            };

                            // updateaccountpopupfunction();
                        });
                });
            this.scene = 'data';
        },
        saveAccount() {
            if (!!this.editForm.password && !!this.editForm.passwordConfirmation) {
                const passwordData = {
                    password: this.editForm.password,
                    confirm_password: this.editForm.passwordConfirmation,
                }
                this.putPasswordUpdate(passwordData);
            }

            const data = {
                first_name: this.editForm.name,
                last_name: this.editForm.surname,
                email: this.editForm.email,
                phone: this.editForm.phone,
            };

            this.putProfileUpdate(data).then(() => this.loadCabinetInfo());
        },
        editAccount(id) {
            this.selectedAccountId = id;
            this.isOpenedPopup = 'edit';
        },
        deleteAccountUsers(id) {
            if (confirm(this.$gettext('Are you sure you want to delete this account?'))) {
                this.deleteUser(buildGetParams({ account_id: id })).then(response => {
                    this.$router.push({ name: 'cabinet' });
                });
            }
        },
        openUsers(id) {
            this.selectedAccount = this.accountsList.find(account => account.id === id);
            this.isOpenedPopup = 'users';
        },
        onPopupClose(value) {
            this.isOpenedPopup = null;
            if (value) {
                this.loadCabinetInfo();
            }
        }
    },
    computed: {
        ...mapState(['accountsList']),
    },
}
</script>
  
<style scoped lang="scss">

</style>
  