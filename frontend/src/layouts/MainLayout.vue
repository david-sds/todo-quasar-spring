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

    <q-drawer v-model="menuDrawer" show-if-above bordered class="column justify-between items-start">
      <q-list class="full-width">
        <q-item-label header @click="menuDrawerOptionFunction">
          Menu
        </q-item-label>
        <q-item
          v-for="option in menuDrawerOptions"
          :key="option.name"
          class="q-pa-none"
        >
          <q-btn
            flat
            text-color="grey-10"
            align="left"
            class="col-grow q-py-md"
            @click="menuDrawerOptionFunction(option.name)"
          >
            <span v-html="option.name" style="font-weight: normal;"/>
          </q-btn>
        </q-item>
      </q-list>
      <q-item class="full-width q-pa-none">
        <q-btn
          flat
          text-color="grey-10"
          align="left"
          class="col-grow q-py-md"
          @click="logout"
        >
          <span v-html="$t('LOGOUT')" style="font-weight: normal;"/>
        </q-btn>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import RouteNames from 'src/router/RouteNames'
import { useAuthStore } from 'src/stores/auth.js'

export default ({
  name: 'MainLayout',
  data: function () {
    return {
      auth: useAuthStore(),
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
    },
    logout: async function () {
      await this.auth.logout();

      this.$router.push(RouteNames.AUTH.PATH)
    },
  },
})
</script>

<style scoped>
</style>