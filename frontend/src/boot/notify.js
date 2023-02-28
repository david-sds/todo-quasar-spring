import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

function notifySuccess (msg) {
  Notify.create({
    type: 'positive',
    message: msg,
  })
}

function notifyError (msg) {
  Notify.create({
    type: 'negative',
    message: msg,
  })
}

function notifyWarning (msg) {
  Notify.create({
    type: 'warning',
    message: msg,
  })
}

function notifyInfo (msg) {
  Notify.create({
    type: 'info',
    message: msg,
  })
}

export default boot(({ app }) => {

  app.config.globalProperties.$notify = {
    success: notifySuccess,
    error: notifyError,
    warning: notifyWarning,
    info: notifyInfo,
  }

})

export {
  notifySuccess,
  notifyError,
  notifyWarning,
  notifyInfo
}