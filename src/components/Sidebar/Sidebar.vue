<template>
  <nav v-if="loading" class="sidebar">
    <sidebar-menu :items="items" @item="onItem" />
    <sidebar-submenu
      v-if="currentItem"
      :children="currentItem.children"
      :title="currentItem.title"
      :collapse="collapse"
    />
  </nav>
</template>

<script>
import {
  EVENT_SIDEBAR_TOGGLE_ACTION,
  EVENT_SIDEBAR_CHANGED,
} from '@/util/events'

export default {
  data() {
    return {
      items: [],
      currentItem: null,
      collapse: false,
      loading: false,
    }
  },
  computed: {
    structure() {
      const { user } = this.auth

      return [
        {
          title: 'Dashboard',
          name: 'home',
          to: 'dashboard.home',
          icon: 'home',
        },
        {
          title: 'Statistic',
          name: 'statistic',
          to: 'dashboard.statistic',
          icon: 'chart-bar',
          disabled: user.role === 'Administrador',
          visible: user.role !== 'Administrador',
        },
        {
          title: 'Setup',
          name: 'setup',
          icon: 'cog',
          children: [
            {
              title: 'Vales',
              to: 'dashboard.setup.vales',
              disabled: user.role === 'Administrador',
              visible: user.role !== 'Administrador',
            },
            {
              title: 'Registrar',
              to: 'dashboard.setup.register',
              disabled: user.role === 'Supervisor',
              visible: user.role !== 'Supervisor',
            },
          ],
        },
      ]
    },
  },
  watch: {
    $route(to, from) {
      if (this.isLoaded()) {
        this.changeByRouterName(to.name)
      }
    },
  },
  mounted() {
    this.setItem(this.mapItem(this.structure))
    this.changeByRouterName(this.$route.name)
    this.loaded()
  },
  events: {
    [EVENT_SIDEBAR_TOGGLE_ACTION]() {
      this.collapse = !this.collapse
    },
  },
  methods: {
    loaded() {
      this.loading = true
    },
    isLoaded() {
      return this.loading
    },
    changeByRouterName(routerName) {
      const split = routerName.split('.')
      const name = split[1]

      this.onItem(name)
      this.emitItemChanged()
    },
    setItem(value) {
      this.items = value
    },
    mapItem(value) {
      return _.map(value, (item) => {
        item.children = this.mapChildren(item.children)

        const visible = true
        const disabled = false
        const active = false

        return { visible, disabled, active, ...item }
      })
    },
    mapChildren(value) {
      return _.map(value, (item) => {
        const visible = true
        const disabled = false

        return { visible, disabled, ...item }
      })
    },
    getActiveItem() {
      return _.find(this.items, (item) => {
        return item.active
      })
    },
    setActiveItemByName(name) {
      _.forEach(this.items, (item) => {
        item.active = item.name === name
      })
    },
    setCurrentItem(value) {
      this.currentItem = this.getActiveItem()
    },
    resetCollapse() {
      this.collapse = false
    },
    onItem(name) {
      this.setActiveItemByName(name)
      this.setCurrentItem(this.getActiveItem())
      this.resetCollapse()
    },
    emitItemChanged() {
      this.$events.fire(EVENT_SIDEBAR_CHANGED, this.currentItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  height: 100%;
}
</style>
