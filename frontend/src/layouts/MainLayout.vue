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
        <q-item-label header>
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
            no-caps
            @click="menuDrawerOptionFunction(option.name)"
          >
            <q-icon :name="option.icon" :color="option.color" class="q-mr-sm" />
            <span v-html="$t(option.name)" style="font-weight: normal;"/>
          </q-btn>
        </q-item>
      </q-list>
      <q-item class="full-width q-pa-none">
        <q-btn
          flat
          text-color="grey-10"
          align="left"
          class="col-grow q-py-md"
          no-caps
          @click="logout"
        >
          <q-icon name="mdi-logout" class="q-mr-sm" />
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
          name: RouteNames.MY_DAY.NAME,
          route: RouteNames.MY_DAY.PATH,
          icon: 'mdi-weather-sunny',
          color: 'indigo-3',    
        },
        {
          name: RouteNames.FAVORITED.NAME,
          route: RouteNames.FAVORITED.PATH,
          icon: 'mdi-star-outline',
          color: 'red-7',
        },
        {
          name: RouteNames.PLANNED.NAME,
          route: RouteNames.PLANNED.PATH,
          icon: 'mdi-calendar-month',
          color: 'brown-4',
        },
        {
          name: RouteNames.TASKS.NAME,
          route: RouteNames.TASKS.PATH,
          icon: 'mdi-home',
          color: 'purple-3',
        }
      ],
    };
  },
  methods: {
    toggleMenuDrawer: function () {
      this.menuDrawer = !this.menuDrawer;
    },
    menuDrawerOptionFunction:function (drawerOptionName) {
      switch (drawerOptionName) {
        case RouteNames.MY_DAY.NAME:
          this.$router.push(RouteNames.MY_DAY.PATH)
          break;
        case RouteNames.FAVORITED.NAME:
          this.$router.push(RouteNames.FAVORITED.PATH)
          break;
        case RouteNames.PLANNED.NAME:
          this.$router.push(RouteNames.PLANNED.PATH)
          break;
        case RouteNames.TASKS.NAME:
          this.$router.push(RouteNames.TASKS.PATH)
          break;
        default:
          this.$router.push('/')
          break;
      }
      this.toggleMenuDrawer();
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