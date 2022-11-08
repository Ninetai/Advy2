<template>
    <main>
        <div class="d-flex justify-content-between py-4">
            <div>
                <BloggersHeader :filters="filters" @loadCompanyInfo="loadCompanyInfo" />
            </div>
            <div class="d-flex py-2 gap-5">
                <Notification />
                <User />
            </div>
        </div>
        <!-- <div class="py-2"></div> -->
        <BloggersList class="mt-4" :filters=filters @loadCompanyInfo="loadCompanyInfo" />
    </main>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import { NETWORK_LIST } from "@/config";
import { buildGetParams } from "@/functions/buildGetParams"
import BloggersHeader from '@/components/campaigns/Bloggers/BloggersHeader.vue';
import BloggersList from '@/components/campaigns/Bloggers/BloggersList.vue'


import User from '@/components/Menu/User';
import Notification from '@/components/Menu/Notification';
export default {
    data() {
        return {
            statusList: [],
            filters: {
                name: '',
                dates: '',
                status: '',
                network: '',
                sortBy: 'name',
                sortDesc: false,
                page: 1,
                perPage: 10,
                totalCount: 0,
                pageOptions: [10, 25, 50],
                isBusy: false,

            },
            networkList: NETWORK_LIST
        }
    },
    components: {
        BloggersHeader,
        BloggersList,
        Icon,
        User,
        Notification,
    },
    created() {
        // this.loadStatusList();
        this.getCampaignDescription(this.$route.params.id);
        this.loadPageInfo();
    },
    // watch: {
    //     $route: {
    //         handler() {
    //             if (!this.$route.query) {
    //                 return;
    //             }
    //             this.loadCompanyInfo();
    //         },
    //         immediate: true,
    //     },
    // },
    methods: {
        ...mapActions(['getOfferStatuses', 'getCampaignInfluencers', 'getCampaignDescription', 'getUsersAccount', 'getUsersProfilePage']),

        loadStatusList() {
            this.getOfferStatuses().then(response => {
                this.statusList = response.data;
            })
        },
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
                .then(() => this.loadCompanyInfo());
        },

        loadCompanyInfo() {
            this.filters.isBusy = true;
            this.submitFilters();
            const campaignId = this.$route.params.id;

            let params = {};
            if (this.$route.query) {
                params = {
                    ...params,
                    ...this.$route.query,
                }
            }
            this.getCampaignInfluencers({ id: campaignId, query: buildGetParams(params) })
                .then(list => {
                    this.filters.isBusy = false;
                    this.filters.totalCount = list.count;
                }).catch(err => this.scene = 'error');
        },

        submitFilters() {
            const filter = {};
            console.log(this.filters.name)
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

            if (!!this.filters.status) {
                filter.status = [this.filters.status];
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