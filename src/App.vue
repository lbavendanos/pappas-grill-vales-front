<template>
  <div id="app">
    <vue-progress-bar />
    <navbar />
    <router-view />
    <footer-main />
  </div>
</template>

<style lang="scss" scoped>
#app {
  background-image: url('./assets/pattern.png');
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
