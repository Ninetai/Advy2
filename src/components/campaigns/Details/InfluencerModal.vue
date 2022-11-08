<template>
    <div class="modal fade " id="bloggerModal" tabindex="-1" aria-labelledby="bloggerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " style="max-width:557px">
            <div class="modal-content border-r16" style="padding:32px" v-if="influencer">
                <div class="modal-header border-0 p-0 justify-content-between">
                    <div class="d-flex align-items-center gap-3">
                        <button type="button" class="back-button" data-bs-dismiss="modal" aria-label="Close">
                            <Icon icon="bx:arrow-back" color="#367bf2" />
                        </button>
                        <a :href="networkList[influencer.network].link + influencer.network_account" target="_blank">
                            <h4 class="modal-title fw-bold color-blue" id="exampleModalLabel">
                                @{{influencer.network_account}}
                            </h4>
                        </a>
                    </div>
                    <div style="margin-top:-8px">
                        <a :href="networkList[influencer.network].link + influencer.network_account" target="_blank">
                            <Icon class="inst-icon" icon="akar-icons:instagram-fill" color='#de2c82' width="24px" />
                        </a>
                    </div>
                </div>
                <div class="modal-body p-0">
                    <div class="pt-3 border-b1">
                        <p class="fw-bold border-b1 fs-18">General info</p>
                        <div class="mb-3 d-flex justify-content-between" v-for="item in generalInfo" :key="item.name"
                            v-if="item.value!=''">
                            <span>{{item.name}}</span>
                            <div v-if="item.name=='Topic'">
                                <span v-for="(category, index) in influencer.blog_category" :key="index"
                                    class="fw-bold">
                                    <span v-if="category.emoji">{{ category.emoji }}</span>
                                    {{ category.name || '&mdash;' }}
                                    <span v-if="index < (influencer.blog_category.length - 1)">,</span>
                                </span>
                            </div>
                            <div v-else>
                                <span class="fw-bold">{{item.value}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pt-4 border-b1">
                        <p class="fw-bold fs-18">Followers</p>
                        <div class="d-flex pb-4 follower-title ">
                            <div v-for="item in bloggerTitle" :key="item.name" class="col px-0"
                                :class="item.active ? 'active' :''">
                                <a href="#" @click="followMenu(item)">
                                    {{item.name}}
                                </a>
                            </div>
                        </div>
                        <div v-for="value,index in followers" :key="index" class="pb-3">
                            <div class="d-flex justify-content-between">
                                <div style="width:30%">
                                    {{index}}
                                </div>
                                <div class="d-flex justify-content-end align-items-center gap-2" style="width:70%">
                                    <div class="prog-bar" :style="{width: Math.min((value*1.4),100) + '%'}"></div>
                                    <div style="width:10%">
                                        {{value}}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pt-4">
                        <p class="fw-bold fs-18">Ad posts with Advy</p>
                        <div class="d-flex">
                            <div class="col" v-for="item in posts" :key="item.name">
                                <div class="fs-14 pb-2" style="color:#626262">
                                    {{item.name}}
                                </div>
                                <div :class="item.name=='Post'?'fw-bold':''" v-for="res in item.value" :key="res">
                                    {{ res|| '&nbsp -'}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import { NETWORK_LIST } from "@/config"
import { Icon } from '@iconify/vue2'


export default {
    name: 'InfluencerModal',
    components: {
        Icon
    },
    props: ['influencerId'],
    data() {
        return {
            influencer: null,
            networkList: NETWORK_LIST,
            posts: [
                { name: 'Post', value: [] },
                { name: 'CTR', value: [] },
                { name: 'Stories reach', value: [] },
                { name: 'Posts reach', value: [] },
            ],
            bloggerTitle: [
                { name: 'Age', active: true },
                { name: 'Gender', active: false },
                { name: 'Country', active: false },
                { name: 'City', active: false },
            ],
            followers: {},
            generalInfo: [
                { name: 'Topic', value: 'all' },
                { name: 'Followers', value: '' },
                { name: 'ER', value: '' },
                { name: 'Citation Index', value: '' },
                { name: 'Stories Reach', value: '' },
                { name: 'Posts Reach', value: '' },
                { name: 'Ad Posts Reach', value: '' },
                { name: 'Channel Citations', value: '' },
                { name: 'Channel Mentions', value: '' },
                { name: 'Channel Reports', value: '' },
                { name: 'Estimated Price', value: '' },
                { name: 'Barter', value: '' },
            ]
        }
    },
    mounted() {
        // this.loadInfluencerData();
    },
    watch: {
        influencerId: {
            handler(val) {
                this.loadInfluencerData();
            }
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(['getInfluencerData']),
        async loadInfluencerData() {
            if (this.influencerId) {
                const influencerData = await this.getInfluencerData(this.influencerId);
                this.influencer = influencerData.data;
            }
            console.log(this.influencer, "11111");

            for (let i = 1; i < 12; i++) {
                this.generalInfo[i].value = '';
            }
            if (this.influencer.follower_count)
                this.generalInfo[1].value = this.influencer.follower_count;
            if (this.influencer.er)
                this.generalInfo[2].value = this.influencer.er.toFixed(2) + '%';
            if (this.influencer.ci)
                this.generalInfo[3].value = this.influencer.ci.toFixed(2);
            if (this.influencer.reach_stories)
                this.generalInfo[4].value = this.influencer.reach_stories;
            if (this.influencer.reach_post)
                this.generalInfo[5].value = this.influencer.reach_post;
            if (this.influencer.reach_post_without_repost)
                this.generalInfo[6].value = this.influencer.reach_post_without_repost;
            if (this.influencer.channels_citation)
                this.generalInfo[7].value = this.influencer.channels_citation;
            if (this.influencer.channels_mentions)
                this.generalInfo[8].value = this.influencer.channels_mentions;
            if (this.influencer.channels_shares)
                this.generalInfo[9].value = this.influencer.channels_shares;
            if (this.influencer.desired_price)
                this.generalInfo[10].value = '$' + this.influencer.desired_price;
            if (this.influencer.barter)
                this.generalInfo[11].value = this.influencer.barter ? 'Yes' : 'No';

            this.followers = this.influencer.audience_age;

            this.posts.map(res => {
                res.value = [];
            })
            this.influencer.offers.map(item => {
                if (item.id) this.posts[0].value.push('№' + item.id);
                else this.posts[0].value.push(null);
                if (item.ctr) this.posts[1].value.push(item.ctr + '%');
                else this.posts[1].value.push(null);
                if (item.reach_stories) this.posts[2].value.push(item.reach_stories);
                else this.posts[2].value.push(null);
                if (item.reach_post) this.posts[3].value.push(item.reach_post);
                else this.posts[3].value.push(null);
            })
        },
        followMenu(item) {
            this.bloggerTitle.map(val => {
                val.active = false;
            })
            item.active = true;
            if (item.name == 'Age')
                this.followers = this.influencer.audience_age;
            else if (item.name == 'Gender')
                this.followers = this.influencer.audience_gender;
            else if (item.name == 'Country')
                this.followers = this.influencer.audience_country;
            else
                this.followers = this.influencer.audience_geo;
        }
    },

}
</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>