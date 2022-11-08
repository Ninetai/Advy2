<template>
    <main class="d-flex flex-column justify-content-between h-100">
        <router-view />
        <div>
            <div class="d-flex justify-content-between py-4">
                <div>
                    <CampaignHeader :filters="filters" @loadCampaignList="loadCampaignList" />
                </div>
                <div class="d-flex py-2 gap-5">
                    <button @click="changeColor()" class="form-control">change</button>
                    <Notification />
                    <User />
                </div>
            </div>
            <div class="py-2"></div>
            <div class="campaign-body" :key="scene">
                <CampaignList :filters="filters" @loadCampaignList="loadCampaignList" />
            </div>
        </div>
        <CampaignFooter />
    </main>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import { buildGetParams } from "@/functions/buildGetParams";
import CampaignHeader from "@/components/campaigns/CampaignHeader"
import CampaignList from '@/components/campaigns/CampaignList';
import CampaignFooter from '@/components/campaigns/CampaignFooter';

import User from '@/components/Menu/User';
import Notification from '@/components/Menu/Notification';

export default {
    name: 'Campaigns',
    components: {
        CampaignHeader,
        CampaignList,
        CampaignFooter,
        User,
        Notification,
    },
    data() {
        return {
            scene: 'loading',
            accountId: null,
            filters: {
                name: '',
                status: 'all',
                dates: '',
                barter: 'all',
                budgetFrom: '',
                budgetTo: '',
                sortBy: 'name',
                sortDesc: false,
                page: 1,
                perPage: 10,
                pageOptions: [5, 10, 15],
                isBusy: false,
            },
        }
    },
    computed: {
        ...mapState({
            theme: 'theme',
        }),
    },
    beforeCreate() {
        if (this.$route.query) {
            const dates = this.$route.query.dates;
            this.filters = {
                ...this.filters,
                name: this.$route.query.name || '',
                barter: this.$route.query.barter || 'all',
                dates: dates ? `${dates[0].split('-').reverse().join('.')} \u2013 ${dates[1].split('-').reverse().join('.')}` : '',
                budgetFrom: this.$route.query.budget ? this.$route.query.budget[0] : '',
                budgetTo: this.$route.query.budget ? this.$route.query.budget[1] : '',
                status: this.$route.query.status || 'all',
            }
        }
    },
    created() {
        this.loadPageInfo();
    },
    mounted() {
    },
    methods: {
        ...mapActions(['getUsersAccount', 'getCampaignList', 'getUsersProfilePage']),

        loadPageInfo() {
            this.filters.isBusy = true;
            this.getUsersAccount()
                .then((response) => {
                    console.log(response);
                    this.accountId = response.data[0][0].id;
                    this.getUsersProfilePage(this.accountId);
                    if (!this.accountId)
                        this.$router.push({ name: 'start' });
                })
                .then(() => this.loadCampaignList());
        },
        loadCampaignList() {
            this.scene = 'loading';
            const accountId = this.accountId;
            console.log(this.filters.name)
            this.submitFilters();
            let params = {};
            if (!accountId) {
                return;
            }

            if (this.$route.query) {
                params = {
                    ...params,
                    ...this.$route.query,
                }
            }
            this.getCampaignList({ id: accountId, query: buildGetParams(params) })
                .then(list => {
                    this.scene = list.results && list.results.length > 0 ? 'data' : 'empty';
                    this.filters.isBusy = false;
                })
                .catch(() => {
                    this.scene = 'error';
                });
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
            if (!!this.filters.barter && this.filters.barter !== 'all') {
                filter.barter = this.filters.barter;
            } else {
                delete filter.barter;
            }

            if (!!this.filters.dates) {
                const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
                const startDate = dateFrom.split('.').reverse().join('-') || '';
                if (dateTo) {
                    const endDate = dateTo.split('.').reverse().join('-') || ''
                    filter.dates = [startDate, endDate];
                }
                else
                    filter.dates = [startDate];
            }

            if (!!this.filters.budgetFrom || !!this.filters.budgetTo) {
                filter.budget = [this.filters.budgetFrom || '', this.filters.budgetTo || ''];
            }

            if (!!this.filters.status && this.filters.status !== 'all') {
                filter.status = [this.filters.status];
            }

            if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
                return;
            }

            this.$router.push({ query: filter }).catch(() => {
            });
        },
        changeColor() {
            // $('.page-item.active').css("background-image", "#FE5D6D")
            if (this.theme == 'red')
                this.$store.commit('updateTheme', 'blue')
            else
                this.$store.commit('updateTheme', 'red')
            console.log(this.theme);

        }
    },
}
</script>
  
<style scoped lang="scss">

</style>
  