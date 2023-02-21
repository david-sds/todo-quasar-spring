<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import RouteNames from 'src/router/RouteNames'

export default ({
  name: 'AuthenticatedLayout',
  data: function () {
    return {
      menuDrawer: false,
      menuDrawerOptions: [
        {
          name: RouteNames.TASKS.NAME,
          route: RouteNames.TASKS.PATH,
        }
      ],
    };
  },
  methods: {
    toggleMenuDrawer: function () {
      this.menuDrawer = !this.menuDrawer;
    },
    menuDrawerOptionFunction:function (drawerOption) {
      switch (drawerOption) {
        case RouteNames.TASKS.NAME:
          this.$router.push(RouteNames.TASKS.PATH)
          break;
        default:
          this.$router.push('/')
          break;
      }
    }
  },
})
</script>

<style scoped>
.drawer-item {
  background-color: tomato;
  cursor: pointer;
}
</style>