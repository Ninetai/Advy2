<template>
    <div>
        <h4 class="mb-3">
            <translate>Audience analysis</translate>
        </h4>
        <div class="d-flex gap-3 mb-3">
            <CardHorizontalBarsNear :data="audience_ages" name="code" value="weight" mult="100" cls="w-50 p-20 border-r16" v-if="audience_ages">
                <template v-slot:title><translate class="text-secondary">Age</translate></template>
                <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
            </CardHorizontalBarsNear>

            <CardSimpleDoughnut cls="w-50 p-20 border-r16" :labels="audience_genders_labels" :points="audience_genders_weights" mult="100" v-if="audience_genders">
                <template v-slot:title><translate class="text-secondary">Gender</translate></template>
                <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
            </CardSimpleDoughnut>
        </div>
        <div class="d-flex gap-3 mb-3">
            <CardHorizontalBarsNear :data="audience_countries" name="name" value="weight" mult="100" cls="w-50 p-20 border-r16" v-if="audience_countries">
                <template v-slot:title><translate class="text-secondary">Countries</translate></template>
                <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
            </CardHorizontalBarsNear>
            <CardHorizontalBarsOver :data="audience_cities" name="name" value="weight" mult="100" cls="w-50 p-20 border-r16" v-if="audience_cities">
                <template v-slot:title><translate class="text-secondary">Cities</translate></template>
                <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
            </CardHorizontalBarsOver>
        </div>
        <div class="d-flex gap-3 mb-3">
            <CardHorizontalBarsOver :data="audience_languages" name="name" value="weight" mult="100" cls="w-100 p-20 border-r16" v-if="audience_languages">
                <template v-slot:title><translate class="text-secondary">Languages</translate></template>
                <template v-slot:icon><Icon class="text-secondary" icon="bxs:info-circle" /></template>
            </CardHorizontalBarsOver>
            <!-- <div class="card w-50 border-r16 p-20">
                <div class="d-flex justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <translate class="text-secondary">Related bloggers</translate>
                        <Icon class="text-secondary" icon="bxs:info-circle" />
                    </div>
                    <translate class="text-danger">Show more</translate>
                </div>
                <div v-for="item in relatedBloggers" class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex gap-3">
                        <img :src="item.img" alt="" style="margin-top:5px; width:60px;height: 57px;" />
                        <div class="text-break d-flex justify-content-center flex-column">
                            <div class="fw-bold">{{ item.name }}</div>
                            <div class="text-secondary">
                                @{{ item.network }}
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-dark">
                        <translate>View</translate>
                    </button>
                </div>
            </div> -->
        </div>
        <!-- <div class="blogger-account">
            <h3 class="text-white mb-4">
                <translate>Some kind of important text</translate>
                <br />
                <translate class="fw-bold">Improved</translate>
                <span>&nbsp;</span>
                <translate>account is cool!</translate>
            </h3>
            <button class="btn btn-dark py-2 px-4">
                <translate>Upgrade your account!</translate>
            </button>
        </div> -->
    </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import CardHorizontalBarsNear from '@/components/ui/CardHorizontalBarsNear.vue'
import CardHorizontalBarsOver from '@/components/ui/CardHorizontalBarsOver.vue'
import CardSimpleDoughnut from '@/components/ui/CardSimpleDoughnut.vue'

export default {
    data() {
        return {
        }
    },
    components: {
        Icon,
        CardSimpleDoughnut,
        CardHorizontalBarsNear,
        CardHorizontalBarsOver
    },
    props: ['bloggerItem'],
    watch: {
    },
    computed: {
        // Top level stat
        stat() {
            return this?.bloggerItem?.last_stat?.data
        },
        // Choose audience
        blogger_audience() {
            return this?.stat?.audience_likers?.data || this?.stat?.audience_followers?.data || this?.stat?.audience_commenters?.data;
        },
        audience_ages() {
            return this?.blogger_audience?.audience_ages
        },
        audience_genders() {
            return this?.blogger_audience?.audience_genders
        },
        audience_genders_labels() {
            return this?.audience_genders?.map((i) => {return i.code.charAt(0).toUpperCase() + i.code.slice(1).toLowerCase()})
        },
        audience_genders_weights() {
            return this?.audience_genders?.map((i) => {return i.weight})
        },
        audience_countries() {
            return this?.blogger_audience?.audience_geo?.countries
        },
        audience_cities() {
            let cities = this?.blogger_audience?.audience_geo?.cities;
            if (!(cities && cities.length)) return null
            cities = cities.sort((a, b) => b.weight - a.weight);
            cities = cities.slice(0, 6);
            let sum_cities = cities.reduce((accumulator, object) => {
                return accumulator + object.weight;
            }, 0);
            cities.push({"name": "Other", "weight": (1 - sum_cities)});
            return cities
        },
        audience_languages() {
            let languages = this?.blogger_audience?.audience_languages;
            if (!(languages && languages.length)) return null
            languages = languages.sort((a, b) => b.weight - a.weight);
            languages = languages.slice(0, 6);
            let sum_languages = languages.reduce((accumulator, object) => {
                return accumulator + object.weight;
            }, 0);
            languages.push({"name": "Other", "weight": (1 - sum_languages)});
            return languages
        }
    },
    methods: {
        minProg(val) {
            const tmp = val;
            if (tmp > 0 && tmp <= 5)
                return 'prog-bgBlue';
            else if (tmp > 5 && tmp <= 20)
                return 'prog-bgPurple'
            else if (tmp > 20 && tmp <= 30)
                return 'prog-bgYellow'
            else if (tmp > 30 && tmp <= 50)
                return 'prog-bgDarkyellow'
            else if (tmp > 50)
                return 'prog-bgRed'
            else
                return '';
        }
    }
}
</script>