<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleMenuDrawer"
        />

        <q-toolbar-title> ToDo App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="menuDrawer" show-if-above bordered>
      <q-list>
        <q-item-label header @click="menuDrawerOptionFunction">
          Menu
        </q-item-label>
        <q-item
          v-for="option in menuDrawerOptions"
          :key="option.name"
          class="drawer-item"
        >
          <q-item-label @click="menuDrawerOptionFunction(option.name)">
            {{ option.name }}
          </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import RouteNames from 'src/router/RouteNames'

export default ({
  name: 'MainLayout',
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