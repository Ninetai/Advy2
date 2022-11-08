<template>
    <main>
        <HeaderBar title="Res">
            <form action="#" class="d-flex pt-4 gap-3 flex-wrap">
                <div class="position-relative flex-grow-1">
                    <Icon icon="bx-search" class="search-icon" width="25" />
                    <input v-model="filters.name" type="search" class="form-control p-12 border-r16 ps-5 h-100"
                        :placeholder="$gettext('Search by name')" @input="loadCompanyInfo">
                </div>
                <div>
                    <select v-model="filters.network" class="form-select p-12 border-r16" style="width:150px"
                        @click="loadCompanyInfo">
                        <option :value="''">
                            <translate>Social Network</translate>
                        </option>
                        <option v-for="network,key in networkList" :key="key" :value="key">{{ network.name
                        }}
                        </option>
                    </select>
                </div>
                <div class="position-relative">
                    <Icon class="calendar-icon" icon="akar-icons:calendar" color="#367bf2" width="22" />
                    <DateRangePicker class="form-control p-12 border-r16 ps-3 bg-white h-100"
                        :value.sync="filters.dates" style="width:300px" placeholder="For the entire period" />
                </div>
                <div class=" refresh-style">
                    <button class="bg-white border-0">
                        <Icon icon="material-symbols:refresh-rounded" width='27px' color='#367bf2' />
                    </button>
                </div>
            </form>
        </HeaderBar>
        <ResultsList class="mt-4" :filters=filters @loadCompanyInfo="loadCompanyInfo" />
    </main>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import { NETWORK_LIST } from "@/config";
import { buildGetParams } from "@/functions/buildGetParams"
import HeaderBar from '@/components/campaigns/Details/HeaderBar.vue';
import DateRangePicker from '@/components/global/DateRangePicker.vue'
import ResultsList from '@/components/campaigns/Details/ResultsList.vue'

export default {
    data() {
        return {

            filters: {
                name: '',
                dates: '',
                network: '',
                sortBy: 'name',
                sortDesc: false,
                page: 1,
                perPage: 10,
                totalCount: 0,
                pageOptions: [10, 25, 50]

            },
            networkList: NETWORK_LIST
        }
    },
    components: {
        HeaderBar,
        DateRangePicker,
        ResultsList,
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
        "filters.dates": {
            handler() {
                this.loadCompanyInfo();
            }
        }
    },
    methods: {
        ...mapActions(['getCampaignResults', 'getCampaignDescription']),

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
            this.getCampaignResults({ id: campaignId, query: buildGetParams(params) })
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

            if (!!this.filters.dates) {
                const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
                if (dateFrom && dateTo) {
                    filter.dates = [dateFrom.split('.').reverse().join('-') || '', dateTo.split('.').reverse().join('-') || ''];
                }
            }

            if (!!this.filters.network) {
                filter.network = [this.filters.network];
            }

            if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
                return;
            }

            this.$router.replace({ query: filter }).catch(() => {
            });
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