<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view v-if="useRouter"/>
      <Auth v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import Auth from 'src/pages/auth/Auth.vue';

export default ({
  name: 'LoginLayout',
  components: {
    Auth: Auth,
  },
  data: function () {
    return {
      useRouter: false,
    }
  }
})
</script>

<style scoped>
.drawer-item {
  background-color: tomato;
  cursor: pointer;
}
</style>