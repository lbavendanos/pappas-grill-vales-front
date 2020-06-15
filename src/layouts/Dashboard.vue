<template>
  <div class="d-flex">
    <div class="sidebar-wrapper">
      <sidebar />
    </div>
    <div class="dashboard-wrapper">
      <header class="header">
        <div class="nav-top">
          <div class="d-flex justify-content-center align-items-center">
            <div class="">
              <sidebar-toggle-button />
            </div>
            <ul class="nav d-flex justify-content-end">
              <li class="nav-item mr-auto">
                <nav-sequence />
              </li>
              <li class="nav-item">
                <user-dropdown />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main class="main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: lighten($gray, 19%);
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  &-wrapper {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
    // min-height: calc(100vh - 46.94px); // If there is footer
    min-height: 100vh;
  }
}

.sidebar {
  &-wrapper {
    min-height: 100%;
  }
}

.nav-top {
  background-color: $sub-menu-color;
  .nav {
    width: calc(100% - 60px);
  }
}
</style>
