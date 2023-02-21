import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8081/",
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD, TRACE, CONNECT",
  }
})

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;

})

export { api }