<template>
   <!-- <div class="auth-main"> -->
   <b-modal id="authModal" ref="modal" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered
      hide-backdrop>
      <template #default="{ hide }">
         <div class="d-flex justify-content-center" style="padding:60px">
            <div v-if="load" class="loading my-2" style="height:440px">
               <b-spinner class="w-40px align-middle"></b-spinner>
               <strong class="fs-5">
                  <translate>Loading...</translate>
               </strong>
            </div>
            <div class="text-center " :class="load ? 'opacity-5' : ''" style="width:320px">
               <h3 class="mb-5 fw-bold fs-2">
                  <translate>Authorisation</translate>
               </h3>
               <form @submit.prevent="submitAuth">
                  <div class="mb-3">

                     <input v-model="form.email" type="email" class="form-control input-style"
                        aria-describedby="invalid" :class="error ? 'is-invalid' : ''" :placeholder="$gettext('Email')"
                        required>
                     <div class="invalid-feedback text-left" id="invalid">
                        Please check your Email or Password.
                     </div>
                  </div>
                  <div class="mb-3">
                     <input v-model="form.password" type="password" class="form-control input-style"
                        :class="error ? 'is-invalid' : ''" :placeholder="$gettext('Password')" required>

                  </div>
                  <p class="text-start" style="font-size:13px">
                     <translate>Language</translate>
                  </p>
                  <select v-model="form.lang" class="form-select input-style">
                     <option :value="code" v-for="(name, code) in AVAILABLE_LANGUAGES" :key="code">{{ name }}
                     </option>
                  </select>
                  <button type="submit" class="btn input-style btn-dark mt-3">
                     <translate>Login</translate>
                  </button>
               </form>
               <div class="mt-4">
                  <a href="#" @click="$emit('change-scene', 'recovery')">
                     <translate class="text-secondary" style="text-decoration:underline">Forgot password?</translate>
                  </a>
                  <div class="mt-2">
                     <translate style="padding-right:3px">First time here?</translate>
                     <span @click="$emit('change-scene', 'register')">
                        <translate class="link">Registration</translate>
                     </span>
                  </div>
               </div>
            </div>
            <!-- </div> -->
         </div>
         <!-- <div>
               <img src="@/assets/logo-gray.png" alt="logo" height='50px'>
            </div> -->
      </template>
   </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { AVAILABLE_LANGUAGES, setLanguage, getLanguage } from "@/services/locale.service";

export default {
   name: 'AuthForm',
   data() {
      return {
         AVAILABLE_LANGUAGES: AVAILABLE_LANGUAGES,
         form: {
            email: '',
            password: '',
            lang: getLanguage(),
         },
         error: false,
         load: false,
      }
   },
   methods: {
      ...mapActions(['postClientLogin']),
      submitAuth() {
         this.load = true;
         this.postClientLogin({
            email: this.form.email,
            password: this.form.password,
         }).then((response) => {
            this.load = false;
            this.error = false;
            setLanguage(this.form.lang);
            this.$router.push({
               name: 'campaigns',
            });
         }).catch(err => {
            this.error = true;
            this.load = false;
            if (err.response) {
               // if (
               //    (err.response.data.detail === 'Password is not valid') ||
               //    (err.response.data.detail === 'Password is not valid')
               // ) {
               //    this.formError.password = this.$gettext("Invalid Password!");
               // } else if (
               //    (err.response.data.detail === 'Not found.') ||
               //    (err.response.data.detail === 'Page not found.')
               // ) {
               //    this.formError.email = this.$gettext("Email not found!");
               // }
               // } else if (err.request) {
               // console.log(err.request);
               // } else {
               //    console.log(err.message);
               // }
            }
         })
      }
   },
   watch: {
      'form.lang': function (val) {
         if (val != getLanguage()) {
            setLanguage(val);
            window.location.reload()
         }
      }
   }
}
</script>

<style scoped lang="scss">
// .auth-main {
//    width: 560px;
//    text-align: -webkit-center;
//    position: fixed;
//    background: white;
//    /* background: rgba(0, 0, 0, 0.5); */
//    /* color: #f1f1f1; */
//    padding: 95px;
//    top: calc(50% - 675px/2);
//    left: calc(50% - 280px);
//    border-radius: 16px;
// }
</style>
