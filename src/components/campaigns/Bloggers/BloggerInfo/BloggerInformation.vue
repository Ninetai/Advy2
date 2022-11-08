<template>
    <div>
        <h4 class="mb-3">
            <translate>Information about the blogger</translate>
        </h4>
        <div class="d-flex flex-wrap gap-3 mb-3">
            <CardSimpleInfo v-if="bloggerItem.follower_count">
                <template v-slot:title><translate>Followers</translate></template>
                <template v-slot:icon><Icon icon="akar-icons:instagram-fill" color="#7654ff" width="20px" /></template>
                <template v-slot:key v-if="history_followers_change"><span :class="{'danger': history_followers_change < 0}">{{ history_followers_change }}%</span></template>
                {{ (bloggerItem.follower_count || 0) | formatNumber }}
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.er">
                <template v-slot:title><translate>Involvement</translate></template>
                <template v-slot:icon><Icon icon="bx:happy-heart-eyes" width="20px" /></template>
                <template v-slot:icon-after><Icon icon="bxs:info-circle" class="text-secondary" /></template>
                {{ (bloggerItem.er || 0) | formatNumber }}%
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.country?.name">
                <template v-slot:title><translate>Country</translate></template>
                <template v-slot:icon v-if="bloggerItem.country.emoji">{{ bloggerItem.country.emoji }}</template>
                {{ bloggerItem.country.name }}
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.blog_category">
                <template v-slot:title><translate>Subject</translate></template>
                <template v-slot:icon><span v-for="(category, idx) in bloggerItem.blog_category" :key="idx">{{ category.emoji }} </span></template>
                <span v-for="(category, idx) in bloggerItem.blog_category" :key="category.id">{{ category.name }}<span v-if="(idx + 1) < bloggerItem.blog_category.length">, </span></span>
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.approx_price || bloggerItem.desired_price">
                <template v-slot:title><translate>Estimated cost</translate></template>
                <template v-slot:icon><Icon icon="bx:money-withdraw" width="20px" /></template>
                ${{ (bloggerItem.approx_price || bloggerItem.desired_price || 0) | formatNumber }}
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.reach_stories">
                <template v-slot:title><translate>Story reach</translate></template>
                <template v-slot:icon><Icon icon="bx:cross" width="20px" /></template>
                {{ (bloggerItem.reach_stories || 0) | formatNumber }}
            </CardSimpleInfo>
            <CardSimpleInfo v-if="bloggerItem.reach_post">
                <template v-slot:title><translate>Posts reach</translate></template>
                <template v-slot:icon><Icon icon="bx:cross" width="20px" style="transform:rotate(45deg)" /></template>
                {{ (bloggerItem.reach_post || 0) | formatNumber }}
            </CardSimpleInfo>
            <CardSimpleInfo>
                <template v-slot:title><translate>Barter</translate></template>
                <template v-slot:icon><Icon icon="bx:refresh" width="20px" /></template>
                <translate v-if="bloggerItem.barter">Yes</translate>
                <translate v-else>No</translate>
            </CardSimpleInfo>
        </div>
        <div v-if="stat">
            <div class="d-flex gap-3 mb-3">
                <CardCloudHashtag cls="w-50 p-20 border-r16" :hashtags="top_hashtags">
                    <template v-slot:title>
                        <translate class="text-secondary">Keywords</translate>
                        <Icon class="text-secondary" icon="bxs:info-circle" />
                    </template>
                </CardCloudHashtag>
                <CardRelatedUsers cls="w-50 p-20 border-r16" :users="any_users_sliced" @show_more="cycleAnyUsers()" v-if="any_users">
                    <template v-slot:title>
                        <translate class="text-secondary">Related bloggers</translate>
                        <Icon class="text-secondary" icon="bxs:info-circle" />
                    </template>
                </CardRelatedUsers>
            </div>
            <div class="d-flex gap-3 mb-3">
                <CardSimpleLineChart cls="col p-20 pt-1 border-r16" :labels="history_labels" :points="history_likes" v-if="history_likes && history_likes.length">
                    <template v-slot:title><translate class="text-secondary">Likes</translate></template>
                    <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
                    <template v-slot:key v-if="history_likes_change"><span :class="{'danger': history_likes_change < 0}">{{ history_likes_change }}%</span></template>
                </CardSimpleLineChart>
                <CardSimpleLineChart cls="col p-20 pt-1 border-r16" :labels="history_labels" :points="history_followers" v-if="history_followers && history_followers.length">
                    <template v-slot:title><translate class="text-secondary">Followers</translate></template>
                    <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
                    <template v-slot:key v-if="history_followers_change"><span :class="{'danger': history_followers_change < 0}">{{ history_followers_change }}%</span></template>
                </CardSimpleLineChart>
                <CardSimpleLineChart cls="col p-20 pt-1 border-r16" :labels="history_labels" :points="history_following" v-if="history_following && history_following.length">
                    <template v-slot:title><translate class="text-secondary">Following</translate></template>
                    <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
                    <template v-slot:key v-if="history_following_change"><span :class="{'danger': history_following_change < 0}">{{ history_following_change }}%</span></template>
                </CardSimpleLineChart>
            </div>
            <!-- <div class="card p-3">
                <div class="d-flex justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <translate class="text-secondary">Engagement rate</translate>
                        <Icon class="text-secondary" icon="bxs:info-circle" />
                    </div>
                    <div class="bar-select">
                        <button class="bar-likes" :class="barMode ? 'bar-active' : ''" @click="barMode = true">
                            <Icon icon="bxs:heart" />
                            <translate>Likes</translate>
                        </button>
                        <button class="bar-likes" :class="barMode ? '' : 'bar-active'" @click="barMode = false">
                            <Icon icon="bx:chat" />
                            <translate>Comments</translate>
                        </button>
                    </div>
                </div>
                <BarChart style="height:250px" />
            </div> -->
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import img_url from '@/assets/rect.jpg'
import BarChart from './BarChart.vue'
import CardSimpleInfo from '@/components/ui/CardSimpleInfo.vue'
import CardCloudHashtag from '@/components/ui/CardCloudHashtag.vue'
import CardRelatedUsers from '@/components/ui/CardRelatedUsers.vue'
import CardSimpleLineChart from '@/components/ui/CardSimpleLineChart.vue'

import { mapActions } from 'vuex';

export default {
    data() {
        return {
            any_users_pagination: [0, 4],
            barMode: true,
        }
    },
    components: {
        Icon,
        BarChart,
        CardSimpleInfo,
        CardCloudHashtag,
        CardRelatedUsers,
        CardSimpleLineChart,
    },
    props: ["bloggerItem"],
    watch: {
    },
    computed: {
        // Top level stat
        stat() {
            return this?.bloggerItem?.last_stat?.data
        },
        // Top hashtags
        top_hashtags() {
            return this?.stat?.user_profile?.top_hashtags
        },
        // Lookalies
        lookalikes() {
            return this?.stat?.audience_likers?.data?.audience_lookalikes || this?.stat?.audience_followers?.data?.audience_lookalikes || this?.stat?.audience_commenters?.data?.audience_lookalikes;
        },
        // Notable users
        notable_users() {
            return this?.stat?.audience_likers?.data?.notable_users || this?.stat?.audience_followers?.data?.notable_users || this?.stat?.audience_commenters?.data?.notable_users;
        },
        // Any related users
        any_users() {
            return this?.lookalikes || this?.notable_users
        },
        any_users_sliced() {
            return this?.any_users.slice(this.any_users_pagination[0], this.any_users_pagination[1])
        },
        // Top level stat history
        history() {
            return this?.stat?.user_profile?.stat_history
        },
        history_labels() {
            return this?.history?.map((i) => {return i.month})
        },
        history_likes() {
            return this?.history?.map((i) => {return i.avg_likes})
        },
        history_likes_change() {
            if (!this.history_likes) return 0;
            let last_point = this.history_likes[this.history_likes.length - 1];
            let sub_last_point = this.history_likes[this.history_likes.length - 2];
            let d = (last_point - sub_last_point);
            return Math.round(d / sub_last_point * 100, 1)
        },
        history_followers() {
            return this?.history?.map((i) => {return i.followers})
        },
        history_followers_change() {
            if (!this.history_followers) return 0;
            let last_point = this.history_followers[this.history_followers.length - 1];
            let sub_last_point = this.history_followers[this.history_followers.length - 2];
            let d = (last_point - sub_last_point);
            return Math.round(d / sub_last_point * 100, 1)
        },
        history_following() {
            return this?.history?.map((i) => {return i.following})
        },
        history_following_change() {
            if (!this.history_following) return 0;
            let last_point = this.history_following[this.history_following.length - 1];
            let sub_last_point = this.history_following[this.history_following.length - 2];
            let d = (last_point - sub_last_point);
            return Math.round(d / sub_last_point * 100, 1)
        },
    },
    methods: {
        cycleAnyUsers() {
            let per_page = this.any_users_pagination[1] - this.any_users_pagination[0]
            if (this.any_users_pagination[1] + per_page <= this.any_users.length) {
                this.$set(this.any_users_pagination, 0, this.any_users_pagination[0] + per_page);
                this.$set(this.any_users_pagination, 1, this.any_users_pagination[1] + per_page);
            }
            else {
                this.$set(this.any_users_pagination, 0, 0);
                this.$set(this.any_users_pagination, 1, per_page);
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>