<template>
    <div>
        <BloggerModal :bloggerId="bloggerId" :bloggerName="bloggerName" :bloggerSelected="bloggerSelected" />
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex gap-3 align-items-center">
                <span class="featured-title">Featured</span>
                <span class=text-secondary>{{ filters.totalCount }}</span>
            </div>
            <div class="icon-background setting">
                <a href="#" @click="switchfunc">
                    <Icon icon="akar-icons:settings-horizontal" color="gray" width="20" />
                </a>
            </div>
        </div>

        <div v-if="influencers == '' && !filters.isBusy" class="mb-2">
            <translate>No data to display</translate>
        </div>
        <div v-if="windowWidth >= 1350 && !switchFlag">
            <b-table id="influencer-table" class="bg-white border-r16 p-10" hover :items="influencers" :fields="fields"
                label-sort-asc="" label-sort-desc="" label-sort-clear="" :per-page="filters.perPage"
                :sort-by.sync="filters.sortBy" :sort-desc.sync="filters.sortDesc" :no-local-sorting="true"
                :busy="filters.isBusy" responsive>
                <template #table-busy>
                    <div class="text-center my-2">
                        <Icon icon="eos-icons:three-dots-loading" width="40px" />
                    </div>
                </template>
                <template #head(full_name)="scope">
                    <div class="text-left" style="padding-left:66px">
                        {{ scope.label }}
                    </div>
                </template>
                <template #cell(full_name)="data">
                    <div class="d-flex gap-3 align-items-center">
                        <img v-if="data.item.influencer_profile_pic" :src="data.item.influencer_profile_pic"
                            width="49px" height="49px" alt="" />
                        <img v-else src="@/assets/rect.jpg" width="49px" height="49px" alt="" />
                        <div class="text-left">
                            <a class="fw-bold cursor-point" @click="bloggerFunc(data.item)">{{ data.value }}</a>
                            <div class="text-secondary text-left">
                                <a :href="networkList[data.item.influencer_network].link + data.item.influencer_network_account"
                                    target="_blank">
                                    @{{ data.item.influencer_network_account }}</a>
                            </div>
                        </div>
                    </div>
                </template>
                <template #cell(influencer_rating)="data">
                    <Icon icon="bi:star-fill" color="#fe5d6d" class="mt--5" />
                    {{ data.value || 0 }} / 5
                </template>
                <template #cell(influencer_follower_count)="data">
                    <Icon icon="akar-icons:instagram-fill" class="mt--5" />
                    {{ (data.value || 0) | formatNumber }}
                </template>
                <template #cell(influencer_reach_post)="data">
                    <Icon icon="uil:focus-target" class="mt--5" />
                    {{ (data.value || 0) | formatNumber }}
                </template>
                <template #cell(influencer_er)="data">
                    <Icon icon="bx:happy-heart-eyes" class="mt--5" />
                    {{ (data.value || 0) | formatNumber }}
                </template>
                <template #cell(influencer_country)="data">
                    <Icon icon="akar-icons:location" class="mt--5" />
                    {{ data.value || '' }}
                </template>
                <template #cell(status)="data">
                    <div class="text-center">
                        <button class="chip-button chip1 m-2">
                            {{ data.value }}
                        </button>
                        <!-- <button v-else-if="data.value == 'Завершено'" class="chip-button chip2 m-2">
                        {{ data.value }}
                    </button>
                    <button v-else-if="data.value == 'active'" class="chip-button chip2 m-2">
                        {{ data.value }}
                    </button>
                    <button v-else-if="data.value == 'on moderation'" class="chip-button chip1 m-2">
                        {{ data.value }}
                    </button> -->
                    </div>
                </template>
                <template #cell(favorite)="data">
                    <a class="cursor-point" @click="selectedFunc(data)">
                        <Icon :icon="data.item.rowSelected ? 'bi:bookmark-fill' : 'bi:bookmark'" class="mt--5" />
                    </a>
                </template>
                <template #cell(sss)="data">
                    <button class="btn btn-dark" @click="bloggerFunc(data.item)">View</button>
                </template>
            </b-table>
        </div>
        <div v-else-if="windowWidth < 1350 || switchFlag" class="mb-3">
            <BloggersListCard @bloggerFunc="bloggerFunc" />
        </div>
        <div class="position-relative">
            <div class="pagiNation">
                <div style="padding-top:10px">
                    <translate>Show by</translate>
                </div>
                <b-form-select id="per-page-select" v-model="filters.perPage" :options="filters.pageOptions"
                    class="form-select input-style pageSelect" @input="filterPagination">
                </b-form-select>
            </div>
            <b-pagination v-model="filters.page" :total-rows="filters.totalCount" :per-page="filters.perPage" pills
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
import BloggersListCard from './BloggersListCard.vue'
import BloggerModal from './BloggerInfo/BloggerModal.vue'

export default {
    name: 'CampaignList',
    components: {
        Icon,
        BloggersListCard,
        BloggerModal,
    },
    props: ['filters'],
    data() {
        return {
            fields: [],
            networkList: NETWORK_LIST,
            windowWidth: window.innerWidth,
            switchFlag: false,
            bloggerId: null,
            bloggerName: null,
            bloggerSelected: null,
            bloggersList: [],
        }
    },

    mounted() {
        this.fields = [
            { key: 'full_name', sortable: true, label: this.$gettext('Account') },
            { key: 'influencer_rating', sortable: false, label: this.$gettext('Rating') },
            { key: 'influencer_follower_count', sortable: true, label: this.$gettext('Followers') },
            { key: 'influencer_reach_post', label: 'Reach', label: this.$gettext('Reach') },
            { key: 'influencer_er', sortable: true, label: this.$gettext('ER') },
            { key: 'influencer_country', label: this.$gettext('Country') },
            // { key: 'category', label: this.$gettext('Category') },
            { key: 'status', label: this.$gettext('Status') },
            { key: 'favorite', label: '', flag: false },
            { key: 'sss', label: '' },
        ];
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
    },
    computed: {
        ...mapState({
            influencers: 'campaignInfluencers',
        }),
    },

    created() {
        // this.pageCount = Math.round(this.totalCount / this.perPage);
        this.bloggersList = this.influencers
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
        switchfunc() {
            this.switchFlag = !this.switchFlag;
        },
        bloggerFunc(item) {
            this.bloggerId = item.id;
            this.bloggerName = item.full_name;
            this.bloggerSelected = item.rowSelected;
            this.$bvModal.show('bloggerModal');
        },
        selectedFunc(item) {
            item.item.rowSelected = !item.item.rowSelected;
            this.$forceUpdate();
        }
    },
}
</script>
  
<style scoped lang="scss">
@import '@/style/campaign.scss';

.setting {
    width: 38px !important;
    height: 34px !important;
    margin-right: 30px;
}

.featured-title {
    color: #27292C;
    font-size: 36px;
    font-weight: 600;
}
</style>
  