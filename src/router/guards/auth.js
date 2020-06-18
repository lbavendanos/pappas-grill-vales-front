import store from './../../store'

export default {
  checkIfAuthenticated: (to, from, next) => {
    const auth = store.getters['auth/auth']
    const { user } = auth

    if (_.isEmpty(user)) {
      return next({ name: 'home' })
    }

    next()
  },
}
