<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Select similar companies</translate>
            </h4>
        </div>
        <div class="modal-body d-flex gap-3 flex-wrap">
            <div v-for="card in CampCard" :key="card.title" class="card camp-card" href="#">
                <div class="card-body">
                    <div class="titleCard">
                        <h5>{{card.title}}</h5>
                        <img v-if="card.title !='Other'" :src="card.icon" width="25px" height="25px">
                    </div>
                    <span class="card-subtitle mb-4 text-muted">{{card.text}}</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','segment')">
                <translate>Back</translate>
            </button>
            <div class="input-style middle-button col text-center">
                <translate>Bloggers available</translate>: 5 600
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','final')">
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
import ozon from '@/assets/svgs/ozon.svg';
import mercedes from '@/assets/svgs/mercedes.svg'
import xiaomi from '@/assets/svgs/xiaomi.svg'
import willd from '@/assets/svgs/willd.svg'
import apple from '@/assets/svgs/apple.svg';
import space from '@/assets/svgs/space.svg';
import komm from '@/assets/svgs/komm.svg';
export default {
    name: 'FreeSignup',
    components: {
        Icon,
    },
    data() {
        return {
            CampCard: [
                {
                    title: 'Ozon',
                    icon: ozon,
                    text: 'Internet score'
                },
                {
                    title: 'Mercedes',
                    icon: mercedes,
                    text: 'Production cars'
                },
                {
                    title: 'Xiaomi',
                    icon: xiaomi,
                    text: 'Technique,system software'
                },
                {
                    title: 'Willdberries',
                    icon: willd,
                    text: 'Internet score'
                },
                {
                    title: 'Apple',
                    icon: apple,
                    text: 'Technique,system software'
                },
                {
                    title: 'Space X',
                    icon: space,
                    text: 'Space company'
                },
                {
                    title: 'Kommunarka',
                    icon: komm,
                    text: 'Confectionery products'
                },
                {
                    title: 'Other',
                    icon: '',
                    text: 'Choose a company from the list'
                }
            ]
        }
    },
    methods: {
    }
}
</script>
  
<style scoped lang="scss">

</style>
  