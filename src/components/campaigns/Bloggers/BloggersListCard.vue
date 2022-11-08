<template>
    <div class="d-flex gap-4 flex-wrap bg-white p-5 border-r12">
        <div v-for="item in influencers" :key=item.id class="card card-sp">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex gap-2 justify-content-between mb-4">
                    <div class="position-relative">
                        <button class="chip-button chip-card">{{ item.status }}</button>
                        <img v-if="item.influencer_profile_pic" :src="item.influencer_profile_pic" style="margin-top:5px" />
                        <img v-else src="@/assets/rect.jpg" style="margin-top:5px" />
                    </div>

                    <div class="text-break">
                        <div class="fw-bold">{{ item.full_name }}</div>
                        <div class="text-secondary">@{{ item.influencer_network_account }}</div>
                        <div style="word-break:break-all">
                            <Icon icon="bi:star-fill" color="#fe5d6d" class="mt--5" />
                            {{ item.influencer_rating || 0 }} / 5
                        </div>
                    </div>
                    <a href="#">
                        <Icon icon="bi:bookmark" />
                    </a>
                </div>
                <div>
                    <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex gap-2 align-items-center">
                            <Icon icon="akar-icons:instagram-fill" />
                            <span> <translate>Followers</translate></span>
                        </div>
                        <div>{{ (item.influencer_follower_count || 0) | formatNumber }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex gap-2 align-items-center">
                            <Icon icon="uil:focus-target" />
                            <span> <translate>Reach</translate></span>
                        </div>
                        <div>{{ (item.influencer_reach_post || 0) | formatNumber }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex gap-2 align-items-center">
                            <Icon icon="akar-icons:location" />
                            <span> <translate>Country</translate></span>
                        </div>
                        <div>{{ item.influencer_country }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <div class="d-flex gap-2 align-items-center">
                            <Icon icon="bx:happy-heart-eyes" />
                            <span> <translate>Engagement (ER)</translate></span>
                        </div>
                        <div>{{ (item.influencer_er || 0) | formatNumber }}</div>
                    </div>
                    <button class="btn btn-dark w-100" @click="$emit('bloggerFunc', item)"><translate>View</translate></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import { NETWORK_LIST } from "@/config";

export default {
    components: {
        Icon,
    },
    data() {
        return {
            networkList: NETWORK_LIST
        }
    },
    computed: {
        ...mapState({
            influencers: 'campaignInfluencers',
        }),
    }
}
</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';

.card-sp {
    box-shadow: 1px 1px 4px 2px lightgrey;
    border: 0px;

    @media (min-width: 1200px) {
        width: calc(25% - 18px);
    }

    @media (min-width: 992px) and (max-width: 1200px) {
        width: calc(33.33% - 1rem);
    }

    @media (min-width: 768px) and (max-width: 992px) {
        width: calc(50% - 1.5rem);
    }

    @media (min-width: 576px) and (max-width: 768px) {
        width: 100%;
    }

    // @media (min-width: 1200px) {
    //     width: calc(33.33% - 1rem);
    // }

    // @media (min-width: 992px) and (max-width: 1200px) {
    //     width: calc(50% - 1.5rem);
    // }

    // @media (min-width: 768px) and (max-width: 992px) {
    //     width: 100%;
    // }

    // @media (min-width: 576px) and (max-width: 768px) {
    //     width: 100%;
    // }
}

.chip-card {
    position: absolute;
    top: 60px;
    left: 13px;
    background: #D7E5FC;
    color: #367BF2;
    padding: 0px 8px;
}
</style>