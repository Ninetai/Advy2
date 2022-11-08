<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Choose which price segment your product belongs to </translate>
            </h4>
        </div>
        <div class="modal-body ">
            <div class="d-flex gap-3 flex-wrap">
                <div v-for="card in CampCard" :key="card.title" class="card camp-card" href="#">
                    <div class="card-body">
                        <div class="titleCard">
                            <h5>{{card.title}}</h5>
                            <Icon :icon="card.icon" width="25px" />
                        </div>
                        <span class="card-subtitle mb-4 text-muted">{{card.text}}</span>
                    </div>
                </div>
            </div>
            <div class="form-floating my-3">
                <input type="email" class="form-control background-style" id="floatingInput"
                    placeholder="name@example.com">
                <label for="floatingInput">Link to product page</label>
            </div>
            <div class="form-floating">
                <textarea class="form-control background-style" placeholder="Leave a comment here" id="floatingTextarea"
                    style="height:150px"></textarea>
                <label for="floatingTextarea">Additional Information</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','category')">
                <translate>Back</translate>
            </button>
            <div class="input-style middle-button col text-center">
                <translate>Bloggers available</translate>: 5 600
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','company')">
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
                    title: 'Short',
                    icon: 'bx:signal-2',
                    text: 'For example: small items up to $5'
                },
                {
                    title: 'Average',
                    icon: 'bx:signal-3',
                    text: 'For example: clothes, shoes'
                },
                {
                    title: 'High',
                    icon: 'bx:signal-4',
                    text: 'For example: jewelry, technology'
                },
                {
                    title: 'Premium',
                    icon: 'bx:signal-5',
                    text: 'For example: cars, real estate'
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
  