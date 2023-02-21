<template>
  <q-page>
    <Login v-if="!isNewUser" />
    <Register v-else />
    <q-toggle v-model="isNewUser" />
  </q-page>
</template>

<script>

import Login from 'src/components/auth/Login.vue'
import Register from 'src/components/auth/Register.vue'

export default {
  name: 'Auth',
  components: {
    Login: Login,
    Register: Register,
  },
  created: function () {
    console.log('$store', this.$store);
  },
  data: function () {
    return {
      isNewUser: true,
    };
  },
}
</script>

<style>

</style>