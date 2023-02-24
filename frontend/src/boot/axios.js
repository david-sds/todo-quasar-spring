import { boot } from 'quasar/wrappers'
import Router from 'src/router'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8081",
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD, TRACE, CONNECT",
  }
})

api.interceptors.request.use(
  config => {
    if (config.url === "auth/authenticate" || config.url === "auth/register") {
      return config;
    }
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      config.headers["Authorization"] = 'Bearer ' + jwtToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error.response);
  }
);


export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;

})

export { api }