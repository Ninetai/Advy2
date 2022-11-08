<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Select the social network in which you want to advertise</translate>
            </h4>
        </div>
        <div class="modal-body d-flex gap-3 flex-wrap">
            <div v-for="card in CampCard" :key="card.title" class="card camp-card" href="#">
                <div class="card-body">
                    <div class="titleCard">
                        <h5>{{card.title}}</h5>
                        <Icon :icon="card.icon" :color="card.color" width="25px" />
                    </div>
                    <span class="card-subtitle mb-4 text-muted">{{card.text}}</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','start')">
                <translate>Back</translate>
            </button>
            <div class="input-style middle-button col text-center">
                <translate>Bloggers available</translate>: 5 600
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','category')">
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

export default {
    name: 'FreeSignup',
    components: {
        Icon,
    },
    data() {
        return {
            CampCard: [
                {
                    title: 'Instagram',
                    icon: 'bxl:instagram-alt',
                    color: '#C854FF',
                    text: 'Traffic directed to this social network'
                },
                {
                    title: 'Tik-Tok',
                    icon: 'bxl:tiktok',
                    color: 'black',
                    text: 'Traffic directed to this social network'
                },
                {
                    title: 'Telegram',
                    icon: 'bxl:telegram',
                    color: '#38A6DB',
                    text: 'Traffic directed to this social network'
                },
                {
                    title: 'Other',
                    icon: 'bx:network-chart',
                    color: '#27292C4D',
                    text: 'Traffic directed to this social network'
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
  