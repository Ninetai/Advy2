<template>
   <div class="d-flex gap-2">
      <div class="text-end d-flex flex-column">
         <p v-if="user" class="fs-6 mb-0">{{ user.user_email }}</p>
         <a @click.prevent="logOut" href="#" class="font">
            <translate class="link">LOGOUT</translate>
         </a>
      </div>
      <router-link :to="{name: 'cabinet'}">
         <img src="@/assets/avatar.png" alt="" class="" style="cursor: pointer;">
      </router-link>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
   name: 'TheUser',
   methods: {
      ...mapActions(['logoutClient']),
      logOut() {
         this.logoutClient()

         this.$router.push({ name: 'start' })
      },
   },
   computed: {
      ...mapState({
         user: 'user',
      }),
   },
}
</script>

<style scoped lang="scss">
.font {
   font-size: 10px;
   font-weight: bold;
}
</style>
