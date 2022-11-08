<template>
    <main>
        <HeaderBar title="Bart">
            <form action="#" class="d-flex pt-4 gap-3 flex-wrap">
                <div class="position-relative flex-grow-1">
                    <Icon icon="bx-search" class="search-icon" width="25" />
                    <input v-model="filters.name" type="search" class="form-control p-12 border-r16 ps-5 h-100"
                        :placeholder="$gettext('Search by name')" @input="loadCompanyInfo">
                </div>
                <div class="position-relative d-flex gap-3 align-items-center">
                    <translate class="color-gray fs-14 fw-bold">Sent</translate>
                    <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
                    <DatePicker class="form-control p-12 border-r16 ps-3 h-100 bg-white" :value.sync="filters.sent_date"
                        style="width:270px" placeholder="For the entire period" />
                </div>
                <div class="position-relative d-flex gap-3 align-items-center">
                    <translate class="color-gray fs-14 fw-bold">Delivered</translate>
                    <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
                    <DatePicker class="form-control p-12 border-r16 ps-3 h-100 bg-white"
                        :value.sync="filters.received_date" style="width:270px" placeholder="For the entire period" />
                </div>
                <div class=" refresh-style">
                    <button class="bg-white border-0">
                        <Icon icon="material-symbols:refresh-rounded" width='27px' color='#367bf2' />
                    </button>
                </div>
            </form>
        </HeaderBar>
        <BarterList class="mt-4" :filters=filters @loadCompanyInfo="loadCompanyInfo" />
    </main>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import { buildGetParams } from "@/functions/buildGetParams"
import HeaderBar from '@/components/campaigns/Details/HeaderBar.vue';
import DatePicker from '@/components/global/DatePicker.vue'
import BarterList from '@/components/campaigns/Details/BarterList.vue'

export default {
    data() {
        return {
            filters: {
                name: '',
                sent_date: '',
                received_date: '',
                sortBy: 'name',
                sortDesc: false,
                page: 1,
                perPage: 10,
                totalCount: 0,
                pageOptions: [10, 25, 50]
            },
        }
    },
    components: {
        HeaderBar,
        DatePicker,
        BarterList,
        Icon,
    },
    created() {
        this.getCampaignDescription(this.$route.params.id);
    },
    watch: {
        $route: {
            handler() {
                if (!this.$route.query) {
                    return;
                }
                this.loadCompanyInfo();
            },
            immediate: true,
        },
        "filters.sent_date": {
            handler() {
                this.loadCompanyInfo();
            }
        },
        "filters.received_date": {
            handler() {
                this.loadCompanyInfo();
            }
        }
    },
    methods: {
        ...mapActions(['getCampaignBarters', 'getCampaignDescription']),

        loadCompanyInfo() {

            this.submitFilters();
            const campaignId = this.$route.params.id;

            if (!campaignId) {
                this.$router.push({ name: 'manager' });
            }

            let params = {};
            if (this.$route.query) {
                params = {
                    ...params,
                    ...this.$route.query,
                }
            }
            this.getCampaignBarters({ id: campaignId, query: buildGetParams(params) })
                .then(list => {
                    this.filters.totalCount = list.count;
                }).catch(err => this.scene = 'error');
        },

        submitFilters() {
            const filter = {};

            if (this.filters.page) {
                filter.page = this.filters.page;
            }

            if (this.filters.perPage) {
                filter.per_page = this.filters.perPage;
            }

            if (this.filters.sortDesc !== undefined && this.filters.sortBy !== undefined) {
                filter.ordering = this.filters.sortDesc ? `-${this.filters.sortBy}` : this.filters.sortBy;
            } else {
                delete filter.ordering;
            }

            if (!!this.filters.name) {
                filter.name = this.filters.name;
            }

            if (!!this.filters.sent_date) {
                filter.sent_date = [
                    this.filters.sent_date.split('.').reverse().join('-') || undefined,
                    this.filters.sent_date.split('.').reverse().join('-') || undefined
                ];
            }

            if (!!this.filters.received_date) {
                filter.recieved_date = [
                    this.filters.received_date.split('.').reverse().join('-') || undefined,
                    this.filters.received_date.split('.').reverse().join('-') || undefined
                ];
            }

            if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
                return;
            }

            this.$router.replace({ query: filter }).catch(() => { });
        },
    },
    computed: {
        ...mapState({
        })
    },
}

</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>