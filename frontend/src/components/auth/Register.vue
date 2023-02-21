<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="firstName"
        :label="$t('FIRST_NAME')"
      />
      <q-input
        v-model="lastName"
        :label="$t('LAST_NAME')"
      />
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
      <q-btn :label="$t('REGISTER')" @click="createUser" />
    </q-card-section>
  </q-card>
</template>

<script>

import { useAuthStore } from 'src/stores/auth.js'

export default {
  name: 'Register',
  data: function () {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }
  },
  methods: {
    createUser: async function () {
      const auth = useAuthStore();

      const params = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      }

      const response = await auth.register(params);
    },
  }
}
</script>