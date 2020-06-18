export default {
  namespaced: true,
  state: () => ({
    auth: {
      user: {},
    },
  }),
  getters: {
    auth: (state) => state.auth,
  },
  mutations: {
    updateUser(state, user) {
      state.auth.user = user
    },
  },
}
