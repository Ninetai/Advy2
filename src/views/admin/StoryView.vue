<template>
    <main>

        <StoryHead :account.sync="filters.account" :status.sync="filters.status" :dates.sync="filters.dates"
            @download-list="isInProgress = true" @reset-filters="resetFilters()" />

        <StoryList :sortBy.sync="filters.sortBy" :sortDesc.sync="filters.sortDesc"
            @download-item="isInProgress = true" />

    </main>
</template>
  
<script>
import { mapActions, mapState } from "vuex";
import StoryHead from "@/components/cabinets/StoryHead";
import StoryList from "@/components/cabinets/StoryList";
import { buildGetParams } from "@/functions/buildGetParams";

export default {
    name: 'StoryView',
    components: {
        StoryHead,
        StoryList,
    },
    data() {
        return {
            isInProgress: false,
            filters: {
                account: 'all',
                status: 'all',
                dates: null,
                // sortBy: 'name',
                // sortDesc: false,
                // page: 1,
                // perPage: 10,
            },
            pageCount: 0,
        }
    },
    beforeCreate() {
        if (this.$route.query) {
            const dates = this.$route.query.dates;
            this.filters = {
                ...this.filters,
                account: this.$route.query.account || 'all',
                status: this.$route.query.status || 'all',
                dates: dates ? `${dates[0].split('-').reverse().join('.')} \u2013 ${dates[1].split('-').reverse().join('.')}` : '',
            }
        }
    },
    created() {
        this.updateTransactions();
    },
    mounted() {
        this.$watch(vm => [vm.filters], () => {
            this.submitFilters();
        }, {
            immediate: true, // run immediately
            deep: true // detects changes inside objects. not needed here, but maybe in other cases
        })
    },
    watch: {
        $route: {
            handler() {
                this.updateTransactions();
            },
            immediate: true,
        },
    },
    methods: {
        ...mapActions(['getTransactionsList']),
        updateTransactions() {
            let accountId = this.$route.params.id;
            let params = {};

            if (this.$route.query) {
                params = {
                    ...params,
                    ...this.$route.query,
                }
            }
            this.getTransactionsList({ id: accountId, query: buildGetParams(params) }).then(list => {
                if (list.count) {
                    this.pageCount = Math.ceil(list.count / this.filters.perPage) || 0;
                }
            });
        },
        submitFilters() {
            const filter = {};

            // if (this.filters.page) {
            //   filter.page = this.filters.page;
            // }

            // if (this.filters.perPage) {
            //   filter.per_page = this.filters.perPage;
            // }

            // if (this.filters.sortDesc !== undefined && this.filters.sortBy !== undefined) {
            //   filter.ordering = this.filters.sortDesc ? `-${this.filters.sortBy}` : this.filters.sortBy;
            // } else {
            //   delete filter.ordering;
            // }

            if (!!this.filters.account && this.filters.account !== 'all') {
                filter.status = [this.filters.account];
            }

            if (!!this.filters.status && this.filters.status !== 'all') {
                filter.status = [this.filters.status];
            }

            if (!!this.filters.dates) {
                const [dateFrom, separator, dateTo] = this.filters.dates.split(' ');
                filter.dates = [dateFrom.split('.').reverse().join('-') || '', dateTo.split('.').reverse().join('-') || ''];
            }

            if (JSON.stringify(this.$route.query) === JSON.stringify(filter)) {
                return;
            }

            this.$router.push({ query: filter }).catch(() => {
            });
        },
        resetFilters() {
            this.filters = {
                account: 'all',
                status: 'all',
                dates: null,
                sortBy: 'name',
                sortDesc: false,
            }
        },
    },
    computed: {
        ...mapState({
            transactionList: 'transactionList',
        }),
    },
}
</script>
  
<style scoped>
.story__table {
    margin-top: 1rem;
}
</style>
  