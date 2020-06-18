<template>
  <b-dropdown
    variant="link"
    right
    no-caret
    toggle-class="nav-link dropdown-toggle mr-3"
    class="h-100"
  >
    <template slot="button-content">
      <div class="dropdown-title">
        <img :src="avatar" alt="user" class="rounded-circle" width="25" />
        <span class="ml-2 font-medium">
          {{ auth.user.name }}
        </span>
      </div>
    </template>
    <b-dropdown-header>
      <div class="d-flex align-items-center p-3 mb-2 border-bottom">
        <div class="">
          <img :src="avatar" alt="user" class="rounded" width="80" />
        </div>
        <div class="ml-2">
          <h4 class="mb-0">{{ auth.user.name }}</h4>
          <p class="mb-0 text-muted">{{ auth.user.email }}</p>
          <span class="mb-0 text-muted">{{ auth.user.role }}</span>
        </div>
      </div>
    </b-dropdown-header>
    <b-dropdown-item href="#" @click.prevent="onLogout">
      Logout
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      avatar:
        'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
    }
  },
  methods: {
    onLogout() {
      this.updateUser({})
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
