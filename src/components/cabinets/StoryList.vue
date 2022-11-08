<template>
    <div class="mt-3">
        <div v-if="transactionList == ''" class="mb-2">
            <translate>No data to display</translate>
        </div>
        <b-table id="my-table" class="bg-white border-r12 pt-10" hover :items="transactionList" :fields="fields"
            label-sort-asc="" label-sort-desc="" label-sort-clear="" :no-local-sorting="true" responsive>
        </b-table>
        <!-- <div class="position-relative">
            <div class="pagiNation">
                <div style="padding-top:10px">
                    <translate>Show by</translate>
                </div>
                <b-form-select id="per-page-select" v-model="filters.perPage" :options="filters.pageOptions"
                    class="form-select input-style pageSelect" @input="filterPagination">
                </b-form-select>
            </div>
            <b-pagination v-model="filters.page" :total-rows="totalCount" pills :per-page="filters.perPage"
                aria-controls="my-table" align="right" @input="filterPagination">
             </b-pagination>
        </div> -->
    </div>

</template>
  
<script>
import { mapState } from "vuex";

export default {
    name: 'StoryList',
    components: {},
    data() {
        return {
            fields: [
                { label: this.$gettext('ID'), key: 'id', sortable: false },
                { label: this.$gettext('Date of transaction'), key: 'date', sortable: false },
                { label: this.$gettext('Sum'), key: 'summ', sortable: false },
                { label: this.$gettext('Card number'), key: 'card', sortable: false },
                { label: this.$gettext('Status'), key: 'status', sortable: false },
                { label: this.$gettext('Account nubmer'), key: 'number', sortable: false },
                { label: 'download', key: '', sortable: false },
            ],
            currentSortBy: 'name',
            currentSortDesc: false,
            windowWidth: window.innerWidth,
        }
    },
    watch: {
        sortBy: {
            handler(value) {
                this.currentSortBy = value;
            },
            deep: true,
            immediate: true
        },
        currentSortBy(value) {
            this.$emit('update:sortBy', value)
        },
        sortDesc: {
            handler(value) {
                this.currentSortDesc = value;
            },
            deep: true,
            immediate: true
        },
        currentSortDesc(value) {
            this.$emit('update:sortDesc', value)
        }
    },
    computed: {
        ...mapState(['transactionList']),
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
    },
}
</script>