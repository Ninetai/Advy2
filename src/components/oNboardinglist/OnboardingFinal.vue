<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Final settings</translate>
            </h4>
        </div>
        <div class="modal-body pt-0">
            <div class="mb-3">
                <label class="ms-2" style="color:gray">
                    <translate>Audience age</translate>
                </label>
                <div class="label-header">
                    <span v-for="age in ages" class="label"
                        :class="{'start':age==ages[0], 'end':age==ages[ages.length-1]}">
                        {{age}}
                    </span>
                </div>
                <MultiRangeSlider baseClassName="multi-range-slider-bar-only" :min="0" :max="80" :ruler="false"
                    :step="1" :min-value="ageMin" :max-value="ageMax" @input="updateagesValues" />
            </div>
            <div>
                <label class="ms-2" style="color:gray">
                    <translate>Audience gender</translate>
                </label>
                <div class="label-header">
                    <span v-for="gender in genders" class="label"
                        :class="{'start':gender==genders[0], 'end':gender==genders[genders.length-1]}">
                        {{gender}}
                    </span>
                </div>
                <MultiRangeSlider baseClassName="multi-range-slider-bar-only" :min="-100" :max="100" :ruler="false"
                    :step="1" :min-value="genderMin" :max-value="genderMax" :min-caption="MinCaption"
                    :max-caption="MaxCaption" @input="updategenderValues">
                </MultiRangeSlider>
            </div>


            <div class="position-relative my-3">
                <label for="tag" class="multi-label">
                    <translate>Display region</translate>
                </label>
                <multiselect id="tag" v-model="value" tag-placeholder="Add this as new tag" label="name" track-by="code"
                    :options="options" :multiple="true" :taggable="true" @tag="addTag">
                </multiselect>
            </div>
            <div class="position-relative">
                <label for="tag1" class="multi-label">
                    <translate>Audience interests</translate>
                </label>
                <multiselect id="tag1" v-model="value1" tag-placeholder="Add this as new tag" label="name"
                    track-by="code" :options="options1" :multiple="true" :taggable="true" @tag="addTag">
                </multiselect>
            </div>
            <div class="form-floating my-3">
                <span class="budget">$</span>
                <input type="number" class="form-control background-style " id="floatingInput"
                    placeholder="name@example.com">
                <label for="floatingInput">Campaign budget</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','company')">
                <translate>Back</translate>
            </button>
            <div class="input-style middle-button col text-center">
                <translate>Bloggers available</translate>: 5 600
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','finish')">
                <translate>Continue</translate>
            </button>
        </div>
        <!-- <TheErrorPopup v-if="scene === 'error'" @repeat-popup="scene = 'init'"
            @cancel-popup="$emit('close-popup', false)" /> -->
        <!-- </div> -->
    </div>
</template>
  
<script>
import { Icon } from '@iconify/vue2';
import Multiselect from 'vue-multiselect'
import MultiRangeSlider from "multi-range-slider-vue";

export default {
    name: 'FreeSignup',
    components: {
        Icon,
        Multiselect,
        MultiRangeSlider
    },
    data() {
        return {
            value: [],
            value1: [],
            options1: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ],
            options: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ],
            ageMin: 0,
            ageMax: 50,
            genderMin: -100,
            genderMax: 100,
        }
    },
    computed: {
        ages() {
            return ["1", "10", "20", "30", "40", "50", "60", "70", "+"];
        },
        genders() {
            return ["Women", "50%", "0", "50%", "Men"];
        },
        MinCaption() {
            var tmp = Math.abs(this.genderMin);
            return tmp.toString();
        },
        MaxCaption() {
            var tmp = Math.abs(this.genderMax);
            return tmp.toString();
        },
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        },
        updateagesValues(e) {
            this.ageMin = e.minValue;
            this.ageMax = e.maxValue;
        },
        updategenderValues(e) {
            this.genderMin = e.minValue;
            this.genderMax = e.maxValue;
        },
    }
}
</script>

<style scoped lang="scss">
@import 'vue-multiselect/dist/vue-multiselect.min.css';
@import "multi-range-slider-vue/MultiRangeSliderBlack.css";
@import "multi-range-slider-vue/MultiRangeSliderBarOnly.css";

.middle-button {
    padding-top: 5px !important;

}
</style>
  