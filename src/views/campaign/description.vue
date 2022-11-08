<template>
    <main>
        <HeaderBar title="Desc"></HeaderBar>
        <div class="d-flex gap-4 mb-5" v-if="description">
            <div class="card mt-4 border-0 border-r16 col">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title fw-bold mt-2">Statistics</h5>
                        <div class="d-flex gap-3 mt-3">
                            <div v-for="item in staticHeads" :key="item.name">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="round" :class="item.color"></span>
                                    <span class="fs-14 color-gray fw-bold">{{item.name}}</span>
                                </div>
                                <div class="fs-14 fw-bold ps-3">{{item.value}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="py-3">
                        <CampaignChart :data="{
                          conversions: description.offers_conversions_list,
                          spend: description.offers_spend_list,
                          reach: description.offers_reach_list,
                        }" />
                    </div>
                    <div class="static-foot">
                        <div class="static-item d-flex gap-3" v-for="item in staticBody" :key="item.name">
                            <div class="p-3 border-r16" :class="item.background">
                                <Icon :icon="item.icon" :color="item.color" width='24px' />
                            </div>
                            <div>
                                <div>{{item.name}}</div>
                                <span class="fw-bold fs-18 " v-if="item.name == 'Spend/budget'">
                                    ${{ (description.offers_spend || 0) | formatNumber }} / ${{ (description.budget || 0) | formatNumber }}
                                    <span class="fw-bold fs-14" style="color:#6dae43">({{ (isSpent) | formatNumber }}%)</span>
                                </span>
                                <span class="fw-bold fs-18 " v-else-if="item.name == 'CTR'">
                                    {{ (description.offers_ctr || 0) | formatNumber }}%
                                </span>
                                <span class="fw-bold fs-18 " v-else-if="item.name=='Actions'">
                                    {{ (description.offers_conversions || 0) | formatNumber }}
                                </span>
                                <span class="fw-bold fs-18 " v-else>
                                    {{ (description.offers_reach || 0) | formatNumber }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-4 border-0 border-r16 col description-class">
                <div class="card-body">
                    <h5 class="card-title fw-bold mt-2">Goals</h5>
                    <div class="mt-3 d-flex gap-4 border-b1 pb-2">
                        <div>
                            <div class="fs-14 color-gray pb-2">
                                <translate>Geo</translate>
                            </div>
                            <span v-if="description.geos && description.geos.length > 0">
                                <span v-for="geo in description.geos">{{ geo.name }}</span>
                            </span>
                            <span v-else>&mdash;</span>
                        </div>
                        <div>
                            <div class="fs-14 color-gray pb-2">
                                <translate>Topic</translate>
                            </div>
                            <!-- {{description.blog_category}} -->
                            <span v-if="description.blog_category && description.blog_category.length > 0">
                                <span v-for="category,i in description.blog_category" :key="i">{{ category.name }}
                                    <span v-if="i+1!=description.blog_category.length">,</span>&nbsp</span>
                            </span>
                            <span v-else>&mdash;</span>
                        </div>
                    </div>
                    <div v-if="description.barter_name">
                        <div class=" d-flex gap-4 border-b1 py-2">
                            <div class="col">
                                <div class="fs-14 color-gray pb-2">
                                    <translate>Barter</translate>
                                </div>
                                <span>{{description.barter_name}}</span>
                            </div>
                            <div class="col">
                                <div class="fs-14 color-gray pb-2">
                                    <translate>Barter price</translate>
                                </div>
                                <span>{{description.barter_price}}$</span>
                            </div>
                        </div>
                        <div class="border-b1 py-2">
                            <div class="fs-14 color-gray pb-2">
                                <translate>Barter description</translate>
                            </div>
                            <span>{{ description.barter_description || 'No description' }}</span>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="fs-14 color-gray pb-2">
                            <translate>Technical description</translate>
                        </div>
                        <div>
                            <ul data-tabgroup="second-tab-group">
                                <li v-for="(desc, name, index) in description.description">
                                    <a :href="`#${index}`">
                                        {{ windowWidth < 768 ? `#${index + 1}` : name }} </a>
                                </li>
                            </ul>
                            <div id="second-tab-group">
                                <div v-for="(desc, name, index) in description.description" :id="index">
                                    <p style="white-space: pre-wrap;" v-html="description.description[name]">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-b1 py-2 d-flex justify-content-between">
                        <div class="col">
                            <div class="fs-14 color-gray pb-2">
                                <translate>End date</translate>
                            </div>
                            <span>{{ description.end_date || '&mdash;' }}
                                ({{ daysLeft < 0 ? 'Expired' : `осталось ${daysLeft} дней` }})</span>
                        </div>
                        <div class="col">
                            <div class="fs-14 color-gray pb-2">
                                <translate>Age</translate>
                            </div>
                            <span>{{ `${description.desired_age[0]} - ${description.desired_age[1]} лет` || '&mdash;'
                            }}</span>
                        </div>
                        <div class="col">
                            <div class="fs-14 color-gray pb-2">
                                <translate>Gender</translate>
                            </div>
                            <span>{{ description.sex === 'both' ? 'All' : description.sex }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import CampaignChart from '@/components/campaigns/Details/CampaignChart.vue'
import HeaderBar from '@/components/campaigns/Details/HeaderBar.vue';

export default {
    data() {
        return {
            staticHeads: [
                { name: 'ACTIONS', value: 0, color: 'yellow' },
                { name: 'SPEND', value: 0, color: 'red' },
                { name: 'STORIES REACH', value: 0, color: 'blue' }
            ],
            staticBody: [
                { name: 'Stories Reach', color: 'rgb(59, 153, 213)', background: 'background-blue', icon: 'ph:users-bold' },
                { name: 'Spend/budget', color: 'rgb(236, 64, 122)', background: 'background-red', icon: 'lucide:piggy-bank' },
                { name: 'CTR', color: '#6dae43', background: 'background-green', icon: 'mdi:cart-percent' },
                { name: 'Actions', color: 'rgb(253, 159, 0)', background: 'background-yellow', icon: 'bi:hand-index' }
            ],
            windowWidth: window.innerWidth,
        }
    },
    components: {
        HeaderBar,
        CampaignChart,
        Icon
    },
    computed: {
        ...mapState({
            description: 'campaignDescription',
            campaignList: 'campaignList'
        }),
        isSpent() {
            return this.description.budget > 0
                ? Math.round((this.description.offers_spend / this.description.budget) * 100, 2)
                : 0
        },
        daysLeft() {
            return new Date(this.description.end_date).getSeconds() - new Date().getSeconds();
        },
    },
    created() {
        this.loadCompanyInfo();
    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => this.windowWidth = window.innerWidth);
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => this.windowWidth = window.innerWidth);
    },
    methods: {
        ...mapActions([
            'getCampaignDescription', 'getCampaign'
        ]),

        ...mapMutations({
            updateCampaign: 'updateCampaign',
        }),
        async loadCompanyInfo() {
            const campaignId = this.$route.params.id;
            if (!campaignId) {
                this.$router.push({ name: 'manager' });
            }

            // const campaign = await this.getCampaign(campaignId);
            let campaign = null;
            this.campaignList.map(item => {
                if (item.id == campaignId)
                    campaign = item;
            })
            this.updateCampaign(campaign);
            if (campaign?.status == 'on moderation') {
                this.$router.push({ name: 'init', params: { id: campaignId } })
            }

            await this.getCampaignDescription(campaignId)
            this.staticHeads[0].value = this.description.offers_conversions;
            this.staticHeads[1].value = this.description.offers_spend;
            this.staticHeads[2].value = this.description.offers_reach;
        },
        displayInfluencerPopup(id) {
            this.getInfluencerData(id).then(response => {
                this.influencerData = response.data;
                this.isInfoPopupOpened = true;
            });
        },
    },

}

</script>
<style lang="scss" scoped>
@import '@/style/campaign.scss';
</style>