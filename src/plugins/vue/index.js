import Vue from 'vue'
import router from '@/router'
import VueProgressBar from 'vue-progressbar'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import VueEvents from 'vue-events'
// import VueGoogleCharts from 'vue-google-charts'
import './font-awesome'

Vue.use(VueEvents)
Vue.use(VueProgressBar, {
  color: '#3ada84',
})
Vue.use(BootstrapVue)
// Vue.use(VueGoogleCharts)

Vue.use(Toasted, {
  router,
  theme: 'toasted-primary',
  position: 'bottom-right',
  duration: 6000,
})
