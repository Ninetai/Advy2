<template>
    <b-modal id="bloggerModal" size="xl" hide-header hide-footer>
        <template #default="{ hide }">
            <div class="d-flex justify-content-between mb-4">
                <div class="d-flex gap-3">
                    <div class="position-relative">
                        <button class="chip-button blogger-statusM">{{ bloggerItem?.status }}</button>
                        <img v-if="bloggerItem.profile_pic" :src="bloggerItem.profile_pic" style="margin-top:5px; width:83px;height: 80px;" />
                        <img v-else src="@/assets/rect.jpg" style="margin-top:5px; width:83px;height: 80px;" />
                    </div>

                    <div class="text-break d-flex justify-content-center flex-column">
                        <h5 class="fw-bold">{{ bloggerName }}</h5>
                        <div class="text-secondary">
                            <a :href="networkList[bloggerItem.network]?.link + bloggerItem?.network_account"
                                target="_blank">
                                <Icon icon="akar-icons:instagram-fill" color="#7654ff" width="20px" />
                                @{{ bloggerItem?.network_account }}
                            </a>
                            <span class="text-danger">• <translate>open in</translate> {{ bloggerItem.network }}</span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <a class="cursor-point" @click="selectedFunc()">
                        <Icon :icon="bloggerSelected ? 'bi:bookmark-fill' : 'bi:bookmark'" class="mt--5" />
                    </a>
                    <div>
                        <translate>Add to bookmarks</translate>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <BloggerInformation :bloggerItem="bloggerItem" />
            </div>
            <div class="mb-4" v-if="blogger_audience">
                <BloggerAudience :bloggerItem="bloggerItem" />
            </div>
            <div class="" v-if="top_posts">
                <BloggerRecent :bloggerItem="bloggerItem" />
            </div>
        </template>
    </b-modal>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { NETWORK_LIST } from "@/config";
import BloggerInformation from './BloggerInformation.vue';
import BloggerAudience from './BloggerAudience.vue';
import BloggerRecent from './BloggerRecent.vue';

import { mapActions } from 'vuex';

export default {
    data() {
        return {
            bloggerItem: [],
            networkList: NETWORK_LIST,
        }
    },
    components: {
        Icon,
        BloggerInformation,
        BloggerAudience,
        BloggerRecent,
    },
    props: ['bloggerId', 'bloggerName', 'bloggerSelected'],
    watch: {
        bloggerId: {
            handler(val) {
                this.loadBloggerItem();
            }
        }
    },
    computed: {
        // Top level stat
        stat() {
            return this?.bloggerItem?.last_stat?.data
        },
        blogger_audience() {
            return this?.stat?.audience_likers?.data || this?.stat?.audience_followers?.data || this?.stat?.audience_commenters?.data;
        },
        top_posts() {
            return this?.stat?.user_profile?.top_posts
        }
    },
    methods: {
        ...mapActions(['getInfluencerData']),
        selectedFunc() {
            console.log(this.bloggerSelected);
            this.bloggerSelected = !this.bloggerSelected;
            // this.$forceUpdate();
        },
        async loadBloggerItem() {
            if (this.bloggerId) {
                const influencerData = await this.getInfluencerData(this.bloggerId);
                this.bloggerItem = influencerData.data;
                console.log(this.bloggerItem)
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>