import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Router } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      jwt: null,
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
        const response = await api.post('auth/authenticate', params);

        this.user.jwt = response.data?.token;
      } catch (e) {
        throw new Error(e);
      }
    },
    async logout () {
      this.user.id = null;
      this.user.firstname = null;
      this.user.lastname = null;
      this.user.email = null;
      this.user.jwt = null;
    },
  }
})
