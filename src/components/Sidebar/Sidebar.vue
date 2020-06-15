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
      items: [
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
        },
      ],
      currentItem: null,
      collapse: false,
      loading: false,
    }
  },
  watch: {
    $route(to, from) {
      if (this.isLoaded()) {
        this.changeByRouterName(to.name)
      }
    },
  },
  mounted() {
    this.setItem(this.mapItem(this.items))
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

        const disabled = false
        const active = false

        return { disabled, active, ...item }
      })
    },
    mapChildren(value) {
      return _.map(value, (item) => {
        const disabled = false

        return { disabled, ...item }
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
