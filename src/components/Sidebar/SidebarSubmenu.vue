<template>
  <transition name="slide-fade">
    <div
      v-if="children && children.length > 0 && !collapse"
      class="sidebar-submenu"
    >
      <div class="sidebar-submenu-wrapper">
        <div class="sidebar-submenu-header mb-4">
          <h3 class="m-0">{{ title }}</h3>
        </div>
        <div class="sidebar-submenu-body">
          <ul class="nav flex-column">
            <li
              v-for="(child, index) in children"
              :key="index"
              class="nav-item"
            >
              <div class="">
                <router-link
                  class="nav-link p-0 m-0"
                  :to="{ name: child.to || '' }"
                  :class="{
                    active: child.active,
                    disabled: child.disabled,
                  }"
                >
                  <span>{{ child.title }}</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    children: {
      type: Array,
      required: true,
    },
    collapse: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  &-submenu {
    background-color: $sub-menu-color;
    width: 10.5rem;
    white-space: nowrap;
    overflow: hidden;

    &-wrapper {
      padding: 1.5rem 1rem;
      width: 100%;
      height: 100%;
    }

    .nav {
      &-item {
        margin-bottom: 0.5rem;
      }

      &-link {
        width: 100%;
        color: $input-color;
        font-size: 0.9rem;

        &:hover,
        &.router-link-active,
        &.active {
          color: lighten($brand-primary, 5%);
        }

        &.disabled {
          opacity: 0.65;
          pointer-events: none;
        }
      }
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  width: 0;
}
</style>
