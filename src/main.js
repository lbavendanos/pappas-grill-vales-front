import './styles/app.scss'
import './plugins'
import './plugins/vue'
import './components'
import { auth as authMixin } from './mixins'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin(authMixin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
