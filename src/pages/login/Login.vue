<template>
  <div class="d-flex h-100 justify-content-center align-items-center">
    <div style="min-width: 250px">
      <h1 class="h3 mb-4 fw-normal text-center">
        {{ step === LoginStep.ENTER_MOBILE ? 'ورود' : 'اعتبارسنجی' }}
      </h1>

      <form @submit.prevent="handleLogin">
        <div v-if="step===LoginStep.ENTER_MOBILE" class="form-floating mb-2">
          <input v-model="userData.mobile" required
                 type="tel" class="form-control" id="floatingInput" placeholder="09151234567">
          <label for="floatingInput">شماره همراه</label>
        </div>
        <div v-else class="form-floating mb-2">
          <input type="password" required
                 class="form-control" id="floatingPassword" placeholder="12345">
          <label for="floatingPassword">کد اعتبارسنجی</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          {{ step === LoginStep.ENTER_MOBILE ? 'ارسال کد تایید' : 'ورود' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

enum LoginStep {
  ENTER_MOBILE,
  VERIFY,
}
const step = ref<LoginStep>(LoginStep.ENTER_MOBILE)

const userData = reactive({
  mobile: '',
  verify_code: '',
})

const store = useStore()
const router = useRouter()

/**
 * when login btn clicked
 */
const handleLogin = () => {
  switch (step.value){
    case LoginStep.ENTER_MOBILE:
      store.dispatch('auth/login', userData).then(() => {
        step.value = LoginStep.VERIFY
      })
      break;

    case LoginStep.VERIFY:
      store.dispatch('auth/loginVerify', userData).then(() => {
        router.push('/')
      })
      break;
  }
}
</script>

<style lang="scss" scoped>

</style>
