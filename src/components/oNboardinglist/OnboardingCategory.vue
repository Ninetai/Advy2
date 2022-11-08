<template>
    <div class="modal-content border-0 background border-r16 px-1 pb-0 pt-2">
        <div class="modal-header justify-content-center border-bottom-0 pb-0">
            <h4>
                <translate>Select the categories that your product fits into</translate>
            </h4>
        </div>
        <div class="modal-body d-flex gap-3 flex-wrap">
            <div v-for="card in CampCard" :key="card.title" class="card camp-card" href="#">
                <div class="card-body">
                    <div class="titleCard">
                        <h5>{{card.title}}</h5>
                        {{card.icon}}
                    </div>
                    <span class="card-subtitle mb-4 text-muted">{{card.text}}</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="input-style cancel col" type="button" @click="$emit('change-onboarding','social')">
                <translate>Back</translate>
            </button>
            <div class="col dropup dropend">
                <div class="input-style middle-button  text-center" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <translate>Bloggers available</translate>: 5 600
                </div>
                <CategoryMenu />
            </div>
            <button class="input-style next col" type="button" @click="$emit('change-onboarding','segment')">
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
import CategoryMenu from '@/components/oNboardinglist/CategoryMenu.vue'
export default {
    name: 'FreeSignup',
    components: {
        Icon,
        CategoryMenu,
    },
    data() {
        return {
            CampCard: [
                {
                    title: 'Auto and Moto',
                    icon: '🚗',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'Leisure and hobbies',
                    icon: '🧶',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'Health',
                    icon: '🩺',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'Culture and art',
                    icon: '🖼️',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'Sport',
                    icon: '👟',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'The science and technology',
                    icon: '🔬',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'News and media',
                    icon: '📰',
                    text: 'Traffic targeted to this category'
                },
                {
                    title: 'Other',
                    icon: '💕',
                    text: 'Traffic targeted to this category'
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
  