<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Setting up and launching a campaign in 5 minutes</translate>
            </h4>
        </div>
        <div class="modal-body d-flex gap-3 flex-wrap">
            <div v-for="card in CampCard" :key="card.title" class="card camp-card" href="#">
                <div class="card-body">
                    <div class="titleCard">
                        <h5>{{card.title}}</h5>
                        <Icon :icon="card.icon" color="red" width="25px" />
                    </div>
                    <span class="card-subtitle mb-4 text-muted">{{card.text}}</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','cancel')">
                <translate>Cancel</translate>
            </button>
            <div class="input-style middle-button col text-center">
                <translate>Bloggers available</translate>: 5 600
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','social')">
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
                    title: 'Outreach Campaign',
                    icon: 'bx:crosshair',
                    text: 'We increase your brand awareness'
                },
                {
                    title: 'Traffic for social networks',
                    icon: 'bx:network-chart',
                    text: 'Social oriented traffic only'
                },
                {
                    title: 'Direct sales',
                    icon: 'bxs:wallet',
                    text: 'Incremental Sales'
                },
                {
                    title: 'Subscriber set',
                    icon: 'bxs:group',
                    text: 'Payment for increasi ng the number of subscribers'
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
  