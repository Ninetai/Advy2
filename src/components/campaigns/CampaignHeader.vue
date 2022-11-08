<template>
    <form action="#" class="d-flex py-2 gap-3 flex-wrap">
        <div class="position-relative">
            <Icon icon="bx-search" class="search-icon" width="25" />
            <input v-model="filters.name" @input="$emit('loadCampaignList')" type="search"
                class="form-control header-input ps-5" :placeholder="$gettext('Search by name')">
        </div>
        <div class="position-relative">
            <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
            <DateRangePicker class="form-control header-input ps-3" :value.sync="currentDate"
                :placeholder="$gettext('For the entire period')" />
        </div>
        <div v-if="statusList && statusList.length > 0" class="">
            <select v-model="filters.status" @change="$emit('loadCampaignList')" class="form-select header-input"
                style="width:150px">
                <option :value="'all'">
                    <translate>Choose status</translate>
                </option>
                <option v-for="status in statusList" :key="status" :value="status">{{ status
                }}
                </option>
            </select>
        </div>
        <div class="icon-background">
            <a href="#">
                <Icon icon="akar-icons:settings-horizontal" color="gray" width="24" />
            </a>
        </div>
    </form>
</template>


<script>
import { mapActions } from "vuex";
import DateRangePicker from '@/components/global/DateRangePicker.vue'
import { Icon } from '@iconify/vue2';

export default {
    name: 'CampaignFilters',
    components: {
        Icon,
        DateRangePicker,
    },
    props: ['filters'],
    data() {
        return {
            statusList: [],
            currentDate: ''
        }
    },
    created() {
        this.loadStatusList();
    },
    watch: {
        currentDate(value) {
            console.log('=========');
            this.filters.dates = value;
            this.$emit('loadCampaignList');
        }
    },
    methods: {
        ...mapActions(['getCampaignStatuses', 'getUsersAccount']),
        loadStatusList() {
            this.getUsersAccount()
                .then((response) => this.accountId = response.data[0][0].id)
            this.getCampaignStatuses().then(response => {
                this.statusList = response.data;
            })
        },
    },
}
</script>
      
<style scoped lang="scss">
.header-input {
    width: 300px;
    border-radius: 16px;
    padding: 10px;
    height: 100%;
    background-color: white;
}
</style>
      
