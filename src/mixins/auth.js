import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['auth']),
  },
  methods: {
    ...mapMutations('auth', ['updateUser']),
    subscribe(type, callback) {
      return this.$store.subscribe((mutation, state) => {
        if (mutation.type === type) {
          callback()
        }
      })
    },
    subscribeToUser(callback) {
      return this.subscribe('auth/updateUser', callback)
    },
  },
}
