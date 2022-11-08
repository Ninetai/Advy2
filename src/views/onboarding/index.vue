<template>
    <div class="modal fade show d-flex camp-main" data-bs-backdrop="static">
        <div class="modal-dialog start-popup modal-dialog-centered modal-dialog-scrollable">
            <OnboardingStart v-if="scene=='start'" @change-onboarding="onstart($event)" />
            <OnboardingSocial v-else-if="scene=='social'" @change-onboarding="scene = $event" />
            <OnboardingCategory v-else-if="scene=='category'" @change-onboarding="scene = $event" />
            <OnboardingSegment v-else-if="scene=='segment'" @change-onboarding="scene = $event" />
            <OnboardingCompany v-else-if="scene=='company'" @change-onboarding="scene = $event" />
            <OnboardingFinal v-else-if="scene=='final'" @change-onboarding="onfinal($event)" />
        </div>
    </div>
</template>

<script>
import OnboardingStart from '@/components/oNboardinglist/OnboardingStart.vue';
import OnboardingSocial from '@/components/oNboardinglist/OnboardingSocial.vue';
import OnboardingCategory from '@/components/oNboardinglist/OnboardingCategory.vue';
import OnboardingCompany from '@/components/oNboardinglist/OnboardingCompany.vue';
import OnboardingSegment from '@/components/oNboardinglist/OnboardingSegment.vue';
import OnboardingFinal from '@/components/oNboardinglist/OnboardingFinal.vue';

export default {
    name: 'FreeSignup',
    components: {
        OnboardingStart,
        OnboardingSocial,
        OnboardingCategory,
        OnboardingCompany,
        OnboardingSegment,
        OnboardingFinal
    },
    data() {
        return {
            scene: 'start',
        }
    },
    methods: {
        onstart($event) {
            this.scene = $event;
            if (this.scene == 'cancel')
                this.$router.push({ name: 'campaigns' });
        },
        onfinal($event) {
            this.scene = $event;
            if (this.scene == 'finish') {
                this.$router.push({ name: 'campaigns' });
                window.location.reload();
            }
        },
    },
    created() {
    }
}
</script>
  
<style scoped lang="scss">

</style>
  