<template>
  <div class="sidebar-menu">
    <ul class="nav flex-column">
      <li class="nav-item">
        <div class="sidebar-menu-logo">
          <router-link
            v-b-tooltip.hover="tooltip"
            title="Home"
            :to="{ name: 'dashboard.home' }"
            class="nav-link text-center p-0 m-0"
          >
            <h3 class="sidebar-menu-logo-title">PG</h3>
          </router-link>
        </div>
      </li>
      <li v-for="(item, index) in items" :key="index" class="nav-item">
        <a
          v-if="item.visible"
          v-b-tooltip.hover="tooltip"
          href="#"
          class="nav-link text-center p-0 m-0"
          :class="{
            active: item.active,
            disabled: item.disabled,
          }"
          @click.prevent="onItem(item)"
        >
          <div class="nav-icon">
            <fa :icon="item.icon" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tooltip: {
        placement: 'right',
        variant: 'white',
        delay: { show: 1000, hide: 100 },
      },
    }
  },
  methods: {
    onItem(item) {
      this.$emit('item', item.name)

      if (item.to) {
        this.$router.push({ name: item.to }).catch((error) => {})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  &-menu {
    background-color: lighten($gray, 12%);
    height: 100%;
    width: 4.5rem;

    &-logo {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-title {
        color: $brand-primary;
        font-weight: 600;
        padding: 1rem;
        margin: 3.5px 0;
      }
    }

    .nav {
      &-link {
        width: 100%;
        color: $gray-600;

        &:hover {
          color: $brand-primary;
        }

        // &.router-link-active,
        &.active {
          background-color: $sub-menu-color;
          color: $brand-primary;
        }

        &.disabled {
          opacity: 0.65;
          pointer-events: none;
        }
      }

      &-icon {
        padding: 1rem 1.5rem;
        font-size: 1.3rem;
      }
    }
  }
}
</style>
