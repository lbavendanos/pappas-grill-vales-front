<template>
  <div id="app">
    <vue-progress-bar />
    <component :is="layout"></component>
  </div>
</template>

<script>
import DefaultLayout from './layouts/Default'
import DashboardLayout from './layouts/Dashboard'

export default {
  components: { DefaultLayout, DashboardLayout },
  data() {
    return {
      layout: 'div',
    }
  },
  watch: {
    $route(to, from) {
      this.generateLayoutByRoyterName(to.name)
    },
  },
  methods: {
    setLayout(value) {
      this.layout = value
    },
    generateLayoutByRoyterName(routerName) {
      const split = routerName.split('.')
      const name = split[0] === 'dashboard' ? 'dashboard' : 'default'
      const layout = `${name}-layout`

      this.setLayout(layout)
    },
  },
}
</script>

<style lang="scss" scoped></style>
