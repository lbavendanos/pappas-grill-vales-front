import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

function persistedUser() {
  const type = 'auth/updateUser'
  const key = 'user'

  return (store) => {
    // called when the store is initialized
    const user = JSON.parse(window.localStorage.getItem(key))

    if (user) {
      store.commit(type, user)
    }

    store.subscribe((mutation, state) => {
      // called after every mutation.
      // The mutation comes in the format of `{ type, payload }`.
      if (mutation.type === type) {
        const value = JSON.stringify(mutation.payload)

        window.localStorage.setItem(key, value)
      }
    })
  }
}

export default new Vuex.Store({
  strict: debug,
  modules: { auth },
  plugins: [persistedUser()],
})
