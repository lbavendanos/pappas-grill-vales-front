<template>
  <b-navbar toggleable="lg" type="dark" variant="brand-tertiary">
    <b-navbar-brand :to="{ name: 'home' }">
      <img src="./../../assets/imagotipo.png" alt="Pappas Grill" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'home' }"
          exact
          exact-active-class="active"
          class="px-1"
        >
          Inicio
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'canje' }"
          exact
          exact-active-class="active"
          class="px-1"
        >
          Canjes
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item class="px-1">
          Login
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
