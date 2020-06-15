<template>
  <div v-if="loading" class="nav-link h-100 d-flex align-items-center">
    <span class="font-medium">{{ sequence }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sequence: null,
      loading: false,
    }
  },
  watch: {
    $route(to, from) {
      if (this.isLoaded()) {
        let split = to.name.split('.')

        this.generateNav(split)
      }
    },
  },
  mounted() {
    this.changeByRouterName(this.$route.name)
    this.loaded()
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

      this.generateNav(split)
    },
    setSequence(value) {
      this.sequence = value
    },
    mapNames(array) {
      return _.map(array, (value) => {
        return voca.capitalize(value, true)
      })
    },
    removeIndexName(array) {
      return _.remove(array, (value) => {
        return value !== 'Index'
      })
    },
    generateNav(value) {
      const names = this.mapNames(value)
      const section = this.removeIndexName(names)
      const sequence = section.join(' → ')

      this.setSequence(sequence)
    },
  },
}
</script>

<style lang="scss" scoped></style>
