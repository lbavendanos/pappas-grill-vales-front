<template>
  <a
    v-if="show"
    href="#"
    class="btn btn-link btn-toggle"
    @click.prevent="toggleSidebar"
  >
    <fa icon="bars" />
  </a>
</template>

<script>
import {
  EVENT_SIDEBAR_TOGGLE_ACTION,
  EVENT_SIDEBAR_CHANGED,
} from '@/util/events'

export default {
  data() {
    return {
      show: false,
    }
  },
  events: {
    [EVENT_SIDEBAR_CHANGED](item) {
      let status = false

      if (item) {
        status = item.children && item.children.length > 0
      }

      this.show = status
    },
  },
  methods: {
    toggleSidebar() {
      this.$events.fire(EVENT_SIDEBAR_TOGGLE_ACTION)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-toggle {
  color: $brand-primary;
}
</style>
