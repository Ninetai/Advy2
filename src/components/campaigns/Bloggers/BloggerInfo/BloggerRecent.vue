<template>
    <div>
        <h4 class="mb-3">
            <translate>Top Publications</translate>
        </h4>
        <div class="d-flex gap-3 mb-3">
            <div v-for="(item, idx) in top_posts" :key="idx" class="card col px-0" style="border-radius:18px">
                <img :src="item.image" style="flex-grow: 1; object-fit: cover; border-top-left-radius: 18px; border-top-right-radius: 18px;">
                <div class="p-3">
                    <translate class="text-secondary">
                        {{ new Date(item.created).toLocaleDateString() }}
                    </translate>
                    <div class="d-flex justify-content-between mt-2">
                        <div class="text-left">
                            <span class="fw-bold fs-5" style="margin-left:-3px">{{ (item?.stat?.likes || 0) | formatNumber }}</span> <br />
                            <translate>Likes</translate>
                        </div>
                        <div class="text-right">
                            <span class="fw-bold fs-5">{{ (item?.stat?.comments || 0) | formatNumber }}</span> <br />
                            <translate>Comments</translate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    components: {
    },
    props: ["bloggerItem"],
    watch: {
    },
    computed: {
        // Top level stat
        stat() {
            return this?.bloggerItem?.last_stat?.data
        },
        top_posts() {
            console.log(this?.stat?.user_profile)
            return this?.stat?.user_profile?.top_posts?.filter((i) => {return i.type == 'photo'}).slice(0, 4)
        }
    },
    methods: {
    }
}
</script>
<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>