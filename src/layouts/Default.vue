<template>
  <div class="default">
    <div class="default-wrapper">
      <navbar />
      <router-view />
      <footer-main />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.default {
  &-wrapper {
    background-image: url('./../assets/pattern.png');
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
}
</style>
