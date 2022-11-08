<template>
    <div>
        <div v-if="campaignList == '' && !filters.isBusy" class="mb-2">
            <translate>No data to display</translate>
        </div>
        <b-table id="my-table" class="bg-white border-r12 pt-10" hover :items="campaignList" :fields="fields"
            label-sort-asc="" label-sort-desc="" label-sort-clear="" :per-page="filters.perPage"
            :sort-by.sync="filters.sortBy" :sort-desc.sync="filters.sortDesc" :no-local-sorting="true"
            :busy="filters.isBusy" responsive>
            <template #table-busy>
                <div class="text-center  my-2">
                    <Icon icon="eos-icons:three-dots-loading" width="40px" />
                </div>
            </template>
            <template #head(name)="scope">
                <div class="text-left">
                    {{ scope.label }}
                </div>
            </template>
            <template #cell(name)="data">
                <div class="text-left">
                    <router-link class="fw-bold " :to="{ name: 'bloggers', params: { id: data.item.id } }">
                        {{ data.value }}
                    </router-link>
                    <div class="text-secondary fs-14">{{ data.item.comment }}</div>
                </div>
            </template>
            <template #cell(sss)>
                <button class="download">
                    <Icon icon="ant-design:cloud-download-outlined" width="25px" color="gray" />
                </button>
            </template>
            <template #cell(offers_reach)="data">
                {{ (data.value || 0) | formatNumber }}
            </template>
            <template #cell(offers_spend)="data">
                {{ (data.value || 0) | formatNumber }}
            </template>
            <template #cell(offers_conversions)="data">
                {{ (data.value || 0) | formatNumber }}
            </template>
            <template #cell(budget)="data">
                {{ (data.value || 0) | formatNumber }}
            </template>
            <template #cell(status)="data">
                <button v-if="data.value == 'ongoing'" class="chip-button chip3">
                    {{ data.value }}
                </button>
                <button v-else-if="data.value == 'ready'" class="chip-button chip2">
                    {{ data.value }}
                </button>
                <button v-else-if="data.value == 'active'" class="chip-button chip2">
                    {{ data.value }}
                </button>
                <button v-else-if="data.value == 'on moderation'" class="chip-button chip1">
                    {{ data.value }}
                </button>
            </template>
        </b-table>
        <div class="position-relative">
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
                <!-- <template #first-text><span class="text-success">First</span></template> -->
            </b-pagination>
        </div>
    </div>

</template>
  
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';

export default {
    name: 'CampaignList',
    components: {
        Icon
    },
    props: ['filters'],
    data() {
        return {
            fields: [],
        }
    },
    computed: {
        ...mapState({
            campaignList: 'campaignList',
            totalCount: 'campaignTotalCount'
        }),
    },
    mounted() {
        this.fields = [
            { key: 'id', sortable: true },
            { key: 'name', sortable: true, label: this.$gettext("Name") },
            { key: 'start_date', label: this.$gettext("Start date") },
            { key: 'end_date', label: this.$gettext("End date") },
            { key: 'status', sortable: true, label: this.$gettext("Status") },
            { key: 'offers_reach', label: this.$gettext("Offers reach") },
            { key: 'offers_spend', label: this.$gettext("Offers spend") },
            { key: 'offers_conversions', label: this.$gettext("Offers conversions") },
            { key: 'budget', label: this.$gettext("Budget") },
            { key: 'sss', label: '' }
        ]
    },
    created() {
        // this.pageCount = Math.round(this.totalCount / this.perPage);
    },
    watch: {

        'filters.sortBy': {
            handler(val) {
                // this.onSortChanged();
                this.$emit('loadCampaignList')
            }
        },
        'filters.sortDesc': {
            handler(val) {
                this.$emit('loadCampaignList')
            }
        }
    },
    methods: {
        ...mapActions([]),
        filterPagination() {
            this.$emit('loadCampaignList')
        },

    },
}
</script>
  
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>
  