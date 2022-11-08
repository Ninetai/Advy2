<template>
   <div class="w-100" :key="scene">

      <EmailRecoveryPopup v-if="scene === 'recovery'" @return-auth="scene = $event" />
      <TheSuccessPopup v-if="scene === 'sent_email'" @close-popup="scene = 'auth'">
         <translate>Password was reset!</translate>
         <translate>Please check your inbox - we have sent you new password.</translate>
      </TheSuccessPopup>

      <div class="auth">
         <div class="align-items-center d-flex justify-content-center">
            <video autoplay muted loop class="myVideo">
               <source src="@/assets/tt_1.mp4" type="video/mp4">
               Your browser does not support HTML5 video.
            </video>
            <AuthForm @change-scene="authFunc" />
            <RegistrationForm @change-scene="registerFunc" />
         </div>
      </div>
   </div>
</template>
 
<script>

import { KinesisContainer, KinesisElement } from 'vue-kinesis';
import AuthForm from '@/components/auth/AuthForm'
import EmailRecoveryPopup from '@/components/auth/EmailRecoveryPopup'
import RegistrationForm from '@/components/auth/RegistrationForm'
import TheSuccessPopup from '@/components/auth/TheSuccessPopup'
import authsvg1 from '@/assets/auth/auth-1.png'
import authsvg2 from '@/assets/auth/auth-2.png'
import registersvg2 from '@/assets/auth/register-2.png'
import authsvg3 from '@/assets/auth/auth-3.png'
import registersvg3 from '@/assets/auth/register-3.png'

export default {
   name: 'IndexView',
   components: {
      AuthForm,
      EmailRecoveryPopup,
      RegistrationForm,
      TheSuccessPopup,
      KinesisContainer,
      KinesisElement
   },
   data() {
      return {
         scene: 'auth', // 'recovery' | 'auth' | 'register' | 'sent_email'
         svgItems: [
            { class: 'first', auth: authsvg1, register: authsvg1 },
            { class: 'second', auth: authsvg2, register: registersvg2 },
            { class: 'third', auth: authsvg3, register: registersvg3 }
         ]
      }
   },
   mounted() {
      this.$bvModal.show('authModal');
   },
   created() {

      if (this.$route.query.sent_email == 'yes') {
         this.scene = 'sent_email'
      }
   },
   methods: {
      authFunc() {
         this.$bvModal.hide('authModal');
         this.$bvModal.show('registerModal');
      },
      registerFunc() {
         this.$bvModal.show('authModal');
         this.$bvModal.hide('registerModal');
      }
   }
}
</script>
 
<style scoped lang="scss">
@import "@/style/auth.scss";
</style>
 