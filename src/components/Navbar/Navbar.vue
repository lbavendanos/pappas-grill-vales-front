<template>
  <div class="">
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
          <b-nav-item class="px-1" @click="onAuthLoginOpenModal">
            Login
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <auth-login-modal
      :show="modal.login.show"
      @success="onSuccess"
      @hidden="onAuthLoginHiddenModal()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: {
        login: {
          show: false,
        },
      },
    }
  },
  methods: {
    onAuthLoginOpenModal() {
      this.modal.login.show = true
    },
    onAuthLoginHiddenModal() {
      this.modal.login.show = false
    },
    onSuccess() {
      this.modal.login.show = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
