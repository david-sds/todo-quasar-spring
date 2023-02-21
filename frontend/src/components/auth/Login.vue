<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="email"
        :label="$t('EMAIL')"
      />
      <q-input
        v-model="password"
        :label="$t('PASSWORD')"
      />
    </q-card-section>
    <q-card-section>
      <q-btn :label="$t('LOGIN')" @click="loginUser" />
    </q-card-section>
  </q-card>
</template>

<script>
import { useAuthStore } from 'src/stores/auth.js'

export default {
  name: 'Login',
  data: function () {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    loginUser: async function () {
      const auth = useAuthStore();

      const params = {
        email: this.email,
        password: this.password,
      }

      const response = await auth.login(params);
    },
  },
}
</script>

<style>

</style>