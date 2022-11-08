<template>
   <div class="card mt-4 border-r16 border-0 ">
      <CampaignCreate v-if="description" mode="edit" :id="description.id" />
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true"
         data-bs-backdrop="static" data-bs-keyboard="false" style="backdrop-filter: blur(10px);">
         <CampaignDelete />
      </div>
      <div class="card-body">
         <div class="d-flex justify-content-between align-items-center">
            <div class="modal-header border-0 justify-content-start gap-3 align-items-baseline">
               <button type="button" class="back-button" @click="backFunction">
                  <Icon icon="bx:arrow-back" color="#367bf2" />
               </button>
               <h5 class="modal-title fw-bold">
                  <span>{{ description?.name }}</span>
               </h5>
            </div>
            <div class=" d-flex gap-3">
               <button type="button" class="edit-style btn" @click="$bvModal.show('edit')">Editing</button>
               <button type="button" class=" btn stop-style" data-bs-toggle="modal"
                  data-bs-target="#deleteModal">Stop</button>
            </div>
         </div>
         <slot />
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { Icon } from '@iconify/vue2';
import CampaignCreate from '../CampaignCreate.vue';
import CampaignDelete from '../CampaignDelete.vue';

export default {
   props: ["title"],
   components: {
      Icon,
      CampaignCreate,
      CampaignDelete,
   },
   data() {
      return {
         headers: [
            { title: "Description", route: 'description', active: false },
            { title: "Bloggers", route: 'bloggers', active: false },
            { title: "Results", route: 'results', active: false },
            { title: "Barter settings", route: 'barterSettings', active: false }
         ],
      }
   },
   computed: {
      ...mapState({
         description: 'campaignDescription',
      })
   },
   created() {
      if (this.title == "Desc")
         this.headers[0].active = true;
      else if (this.title == "Blog")
         this.headers[1].active = true;
      else if (this.title == "Res")
         this.headers[2].active = true;
      else if (this.title == "Bart")
         this.headers[3].active = true;
   },
   methods: {
      backFunction() {
         this.$router.push({ name: 'campaigns' });
      },
   }
}
</script>

<style scoped lang="scss">
@import '@/style/campaign.scss';
</style>