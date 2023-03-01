import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useLocalStorage } from '@vueuse/core'

import {
  notifySuccess,
  notifyError
 } from 'src/boot/notify'
import { i18n } from 'src/boot/i18n';

const { t, tc } = i18n.global;


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      role: null,
      jwt: useLocalStorage('jwt', null),
    }
  }),

  getters: {
    isLoggedIn: (state) => !!state.user?.jwt,
  },

  actions: {
    async register (user) {
      const params = {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
      }

      try {
        const response = await api.post('auth/register', params);

        this.user.jwt = response.data?.token;

        notifySuccess(t('NOTIFY.USER.CREATED'))
      } catch (e) {
        throw new Error(e);
      }
    },
    async login (user) {
      const params = {
        email: user.email,
        password: user.password,
      }

      try {
        const loginResponse = await api.post('auth/authenticate', params);
        const jwt = loginResponse.data?.token;

        this.user.jwt = jwt;

        await this.updateUserData();

        notifySuccess(t('NOTIFY.USER.WELCOME', { name: this.user.firstname }))
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateUserData () {
      try {
        const userDataResponse = await api.get('user');

        this.user.email = userDataResponse.data.email;
        this.user.firstname = userDataResponse.data.firstname;
        this.user.id = userDataResponse.data.id;
        this.user.lastname = userDataResponse.data.lastname;
        this.user.role = userDataResponse.data.role;
      } catch (e) {
        throw new Error(e);
      }
    },
    async logout () {
      this.user.id = null;
      this.user.firstname = null;
      this.user.lastname = null;
      this.user.email = null;
      this.user.role = null;
      this.user.jwt = null;
    },
  }
})
