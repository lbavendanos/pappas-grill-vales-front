<template>
  <router-view :key="$route.name + ($route.params.resourceName || '')" />
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
