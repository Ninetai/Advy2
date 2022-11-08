<template>
    <div>
        <InfluencerModal :influencerId='influencerId' />
        <div v-if="results==''" class="mb-3">
            <translate>No data to display</translate>
        </div>
        <b-table id="influencer-table" class="bg-white border-r16 p-10" hover :items="results" :fields="fields"
            label-sort-asc="" label-sort-desc="" label-sort-clear="" :per-page="filters.perPage"
            :sort-by.sync="filters.sortBy" :sort-desc.sync="filters.sortDesc" :no-local-sorting="true" responsive>
            <template #head(full_name)="scope">
                <div class="text-left">
                    {{ scope.label }}
                </div>
            </template>
            <template #cell(full_name)="data">
                <div class="d-flex align-items-center gap-3">
                    <a :href="networkList[data.item.influencer_network].link + data.item.influencer_network_account"
                        target="_blank">
                        <Icon class="inst-icon" icon="akar-icons:instagram-fill" />
                    </a>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#bloggerModal"
                        @click="influencerId=data.item.id">
                        {{data.value}}
                    </a>
                </div>
            </template>
            <template #cell()="data">
                <span v-if="!data.value">0</span>
                {{data.value}}
            </template>
            <template #cell(ctr)="data">
                {{data.value}}%
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
            <b-pagination v-model="filters.page" :total-rows="filters.totalCount" pills :per-page="filters.perPage"
                aria-controls="influencer-table" align="right" @input="filterPagination">
                <!-- <template #first-text><span class="text-success">First</span></template> -->
            </b-pagination>
        </div>
    </div>

</template>
  
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import { NETWORK_LIST } from "@/config";
import InfluencerModal from './InfluencerModal.vue'

export default {
    name: 'CampaignList',
    components: {
        Icon,
        InfluencerModal
    },
    props: ['filters'],
    data() {
        return {
            influencerId: null,
            fields: [
                { key: 'full_name', sortable: true, label: 'Influencer' },
                { key: 'placement_date', sortable: true, label: 'Posts' },
                { key: 'ctr', sortable: true, label: 'CTR' },
                { key: 'reach_stories', sortable: true, label: 'Stories reach' },
                { key: 'reach_posts', label: 'Posts reach' },
            ],
            networkList: NETWORK_LIST,
        }
    },
    computed: {
        ...mapState({
            results: 'campaignResults',
        }),
    },

    created() {
        // this.pageCount = Math.round(this.totalCount / this.perPage);
    },
    watch: {
        'filters.sortBy': {
            handler(val) {
                this.$emit('loadCompanyInfo')
            }
        },
        'filters.sortDesc': {
            handler(val) {
                this.$emit('loadCompanyInfo');
            }
        }
    },
    methods: {
        ...mapActions([

        ]),
        filterPagination() {
            this.$emit('loadCompanyInfo');
        },
    },
}
</script>
  
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>
  