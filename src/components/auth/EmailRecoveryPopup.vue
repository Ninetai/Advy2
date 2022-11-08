<template>
   <div class="modal forgot-img" tabindex="-1">
      <div class="modal-content forgot-dialog">
         <div v-if="scene === 'email'" style="width:320px">
            <h3 class="modal-title ">
               <translate>Access recovery</translate>
            </h3>
            <p>
               <translate>Enter the email address you provided during registration. On it we will send instructions
                  for restoring access</translate>
            </p>

            <form @submit.prevent="submitEmail()" action="#">
               <span class="email-error" style="color:red">{{ emailError }}</span>
               <input v-model="email" class="form-control input-style justify-contents-center" type="email"
                  :placeholder="$gettext('Email')" required>
               <button type="submit" class="btn btn-dark input-style">
                  <translate>Accept</translate>
               </button>
            </form>

            <div>
               <a href="#" class="link" @click.prevent="$emit('return-auth', 'auth')">
                  <translate>Login</translate>
               </a>
            </div>
         </div>

         <div v-if="scene === 'confirmation'" style="width:320px">
            <h3>
               <translate>Restore access</translate>
            </h3>
            <p>
               <translate>Check your email and follow the instructions in the email</translate>
            </p>
            <button class="btn btn-dark input-style" type="submit"
               @click.prevent="$emit('return-auth', 'auth')">OK</button>
         </div>
      </div>
   </div>
   <!-- <div class="overlay overlay_auth" :key="scene">
    
  </div> -->

</template>

<script>
import { mapActions } from "vuex";

export default {
   name: 'EmailRecoveryPopup',
   data() {
      return {
         scene: 'email', // 'email' | 'confirmation' | 'error'
         email: '',
         emailError: null,
      }
   },
   methods: {
      ...mapActions(['putPasswordReset']),
      submitEmail() {
         if (!this.email) {
            return;
         }

         this.putPasswordReset({
            email: this.email
         })
            .then(() => this.scene = 'confirmation')
            .catch(err => {
               if (err.response) {
                  console.log(err.response.data);
                  if (err.response.data.detail === 'Not found.') {
                     this.emailError = $gettext('Email not found!');
                  }
               } else if (err.request) {
                  console.log(err.request.data);
               } else {
                  console.log(err.message);
               }
            })
      }
   }
}
</script>

<style scoped>
.forgot-img {
   background-image: url('@/assets/bg-auth.jpg');
   display: flex;
   align-items: center;
   justify-content: center;
}

.forgot-dialog {
   text-align: center;
   padding: 64px 100px 64px 100px;
   width: auto;
}
</style>
