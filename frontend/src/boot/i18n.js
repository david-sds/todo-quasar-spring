import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const DEFAULT_LOCALE = 'en-US'

// Create I18n instance
const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  globalInjection: true,
  messages
})

export default ({ app }) => {
  // Tell app to use the I18n instance
  app.use(i18n)
}

export {
  i18n,
}
