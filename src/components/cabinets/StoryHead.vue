<template>
    <div class="card mt-4 border-r16 border-0 ">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div class="modal-header border-0 justify-content-start gap-3 align-items-baseline">
                    <button type="button" class="back-button" @click.prevent="$router.push({ name: 'cabinet' })">
                        <Icon icon="bx:arrow-back" color="#367bf2" />
                    </button>
                    <h5 class="modal-title fw-bold">
                        <translate>Payment history</translate>
                    </h5>
                </div>
                <form action="#" class="d-flex gap-3 flex-wrap align-items-center">
                    <div v-if="accountsList && accountsList.length > 0">
                        <select v-model="currentAccount" class="form-select p-12 border-r16" style="width:190px"
                            @change="$emit('update:account', currentAccount)">
                            <option :value="''">
                                <translate>Choose an account</translate>
                            </option>
                            <option v-for="account, key in accountsList" :key="key" :value="key">{{ account.name
                            }}
                            </option>
                        </select>
                    </div>
                    <div class="position-relative">
                        <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
                        <DateRangePicker class="form-control p-12 border-r16 ps-3 bg-white h-100"
                            :value.sync="currentDates" style="width:300px" placeholder="For the entire period" />
                    </div>
                    <div v-if="statusList && statusList.length > 0">
                        <select v-model="currentStatus" class="form-select p-12 border-r16" style="width:150px"
                            @change="$emit('update:status', currentStatus)">
                            <option :value="''">
                                <translate>Choose status</translate>
                            </option>
                            <option v-for="status, key in statusList" :key="key" :value="status">{{ status
                            }}
                            </option>
                        </select>
                    </div>
                    <div class=" refresh-style">
                        <button class="bg-white border-0">
                            <Icon icon="material-symbols:refresh-rounded" width='27px' color='#367bf2' />
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-outline-primary p-2">
                            <translate>Download</translate>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Icon } from "@iconify/vue2";
import DateRangePicker from "../global/DateRangePicker.vue";

export default {
    name: 'StoryHead',
    components: {
        Icon,
        DateRangePicker,
    },
    props: ['account', 'status', 'dates'],
    data() {
        return {
            isInProgress: false,
            currentAccount: '',
            currentStatus: '',
            currentDates: null,
            statusList: [],
        }
    },
    created() {
        this.loadStatusList();
    },
    watch: {
        currentDates(value) {
            this.$emit('update:dates', value)
        },
    },
    methods: {
        ...mapActions(['getTransactionStatuses']),
        loadStatusList() {
            this.getTransactionStatuses().then(response => {
                this.statusList = response.data;
            })
        },
    },
    computed: {
        ...mapState({
            accountsList: 'accountsList',
        }),
    },
}
</script>
<style>

</style>