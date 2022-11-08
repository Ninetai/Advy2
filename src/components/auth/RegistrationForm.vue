<template>
   <b-modal id="registerModal" ref="modal" hide-footer hide-header no-close-on-backdrop no-close-on-esc centered
      hide-backdrop>
      <template #default="{ hide }">
         <div class="d-flex justify-content-center" style="padding:60px">
            <div v-if="load" class="loading my-2" style="height:630px">
               <b-spinner class="w-40px align-middle"></b-spinner>
               <strong class="fs-5">Loading...</strong>
            </div>
            <div class="text-center" style="width:320px" :class="load ? 'opacity-5' : ''">
               <h3 class="mb-5 fw-bold fs-2">
                  <translate>
                     <translate>Registration</translate>
                  </translate>
               </h3>
               <form @submit.prevent="submitRegistration">
                  <div class="mb-3">
                     <input v-model="form.name" type="text" class="form-control input-style"
                        :class="formError.name ? 'is-invalid' : ''" :placeholder="$gettext('Your name')" required>
                     <div class="invalid-feedback text-left">
                        {{ formError.name }}
                     </div>
                  </div>
                  <div class="mb-3">
                     <input v-model="form.email" type="email" class="form-control input-style"
                        :class="formError.email ? 'is-invalid' : ''" :placeholder="$gettext('Email')" required>
                     <div class="invalid-feedback text-left">
                        {{ formError.email }}
                     </div>
                  </div>
                  <div class="mb-3">
                     <input v-model="form.phone" type="number" class="form-control input-style"
                        :class="formError.phone ? 'is-invalid' : ''" :placeholder="$gettext('Phone number')" required>
                     <div class="invalid-feedback text-left">
                        {{ formError.phone }}
                     </div>
                  </div>
                  <div class="mb-3">
                     <input v-model="form.password" type="password" class="form-control input-style"
                        :class="formError.password ? 'is-invalid' : ''" :placeholder="$gettext('Create password')"
                        required>
                     <div class="invalid-feedback text-left">
                        {{ formError.password }}
                     </div>
                  </div>

                  <input v-model="form.confirmPassword" type="password" class="form-control input-style mb-3"
                     :class="formError.password ? 'is-invalid' : ''" :placeholder="$gettext('Repeat password')"
                     required>

                  <div class="d-flex gap-3 mb-4">
                     <div style="margin: 6px 0px 0px 6px">
                        <input class="checkbutton" type="checkbox" value="1" id="flexCheckDefault"
                           v-model="form.privacyPolicy" required>
                     </div>
                     <label class="form-check-label text-start" for="flexCheckDefault">
                        <translate>Familiarized with the privacy policy and terms of service</translate>
                     </label>
                  </div>
                  <button class="btn btn-dark input-style mb-3" type="submit">
                     <translate>Register</translate>
                  </button>
               </form>
               <div>
                  <a @click.prevent="$emit('change-scene', 'auth')" href="#" class="link">
                     <translate>Login</translate>
                  </a>
               </div>
            </div>
         </div>
      </template>
   </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import { AVAILABLE_LANGUAGES, setLanguage } from "@/services/locale.service";

export default {
   name: 'RegistrationForm',
   data() {
      return {
         AVAILABLE_LANGUAGES: AVAILABLE_LANGUAGES,
         form: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            privacyPolicy: false,
         },
         formError: {
            name: null,
            phone: null,
            email: null,
            password: null,
         },
         load: false,
      }
   },
   methods: {
      ...mapActions(['postClientRegister', 'postClientLogin', 'logoutClient']),
      submitRegistration() {

         const { name, email, phone, password, confirmPassword, privacyPolicy } = this.form;
         this.logoutClient();
         if (password != confirmPassword) {
            this.formError.password = "Password do not matched! Please check again!!!";
            return;
         }
         else if (password.length < 8) {
            this.formError.password = "This password is too short. It must contain at least 8 characters.";
            return;
         }
         this.load = true;
         this.postClientRegister({
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1],
            email: email,
            phone: phone,
            password: password,
            confirm_password: confirmPassword,
         }).then(() => {
            this.load = false;
            setLanguage(this.form.lang);
            this.postClientLogin({
               email: email,
               password: password,
            });

         }).catch(err => {
            this.load = false;
            this.formError.email = err.response.data?.email[0];
            this.formError.password = err.response.data?.password[0];
            this.formError.name = err.response.data?.name[0];
            this.formError.phone = err.response.data?.phone[0];
         })
      },
   },
}
</script>

<style scoped lang="scss">
.checkbutton {
   min-width: 21px;
   min-height: 21px;
}
</style>
