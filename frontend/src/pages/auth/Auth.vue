<template>
  <q-page class="row justify-center items-center" style="background-color: darkgray;">
    <q-card class="auth-card q-pa-md">
      <template v-if="isLogin">
        <q-card-section>
          <p v-html="$t('LOGIN')" class="text-h6 text-uppercase q-mb-none" />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="user.email"
            outlined
            dense
            class="q-mb-md"
            :label="$t('EMAIL')"
          />
          <q-input
            v-model="user.password"
            outlined
            dense
            type="password"
            class="q-mb-md"
            :label="$t('PASSWORD')"
          />
          <q-btn
            :label="$t('LOGIN')"
            no-caps
            color="blue-8"
            class="full-width q-pa-sm q-mt-md"
            @click="loginUser"
          />
          <p
            v-html="$t('FORGOT_PASSWORD_?')"
            class="q-py-sm text-underline-hover cursor-pointer"
          />
        </q-card-section>
        <q-separator class="q-my-lg" />
        <q-card-section class="row justify-center items-center">
          <p
            v-html="$t('NEED_AN_ACCOUNT_?')"
            class="q-mb-none q-mr-xs"
          />
          <p
            v-html="$t('REGISTER')"
            class="q-mb-none text-uppercase text-underline-hover cursor-pointer"
            @click="isLogin = false"
          />
        </q-card-section>
      </template>
      <template v-else>
        <q-card-section>
          <p v-html="$t('REGISTER')" class="text-h6 text-uppercase q-mb-none" />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="user.firstName"
            outlined
            dense
            class="q-mb-md"
            :label="$t('FIRST_NAME')"
          />
          <q-input
            v-model="user.lastName"
            outlined
            dense
            class="q-mb-md"
            :label="$t('LAST_NAME')"
          />
          <q-input
            v-model="user.email"
            outlined
            dense
            class="q-mb-md"
            :label="$t('EMAIL')"
          />
          <q-input
            v-model="user.password"
            outlined
            dense
            type="password"
            class="q-mb-md"
            :label="$t('PASSWORD')"
          />
          <q-input
            v-model="passwordConfirmation"
            outlined
            dense
            type="password"
            class="q-mb-md"
            :label="$t('CONFIRM_PASSWORD')"
          />
          <q-btn
            :label="$t('REGISTER')"
            no-caps
            color="blue-8"
            class="full-width q-pa-sm q-mt-md"
            @click="createUser"
          />
        </q-card-section>
        <q-separator class="q-my-lg" />
        <q-card-section class="row justify-center items-center">
          <p
            v-html="$t('ALREADY_A_USER_?')"
            class="q-mb-none q-mr-xs"
          />
          <p
            v-html="$t('LOGIN')"
            class="q-mb-none text-uppercase text-underline-hover cursor-pointer"
            @click="isLogin = true"
          />
        </q-card-section>
      </template>
    </q-card>
  </q-page>
</template>

<script>
import { useAuthStore } from 'src/stores/auth.js'
import RouteNames from 'src/router/RouteNames'

export default {
  name: 'Auth',
  data: function () {
    return {
      auth: useAuthStore(),
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      },
      passwordConfirmation: null,
      isLogin: true,
    };
  },
  methods: {
    loginUser: async function () {
      const params = {
        email: this.user.email,
        password: this.user.password,
      }

      await this.auth.login(params);

      this.$router.push(RouteNames.TASKS.PATH)
    },
    createUser: async function () {
      const params = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      }

      await this.auth.register(params);
    },
  },
}
</script>

<style scoped>

.auth-card {
  width: 500px;
}

.text-underline-hover:hover {
  text-decoration: underline;
}

</style>