<template>
  <b-modal
    v-model="modalShow"
    centered
    :title="title"
    header-bg-variant="brand-primary"
    header-text-variant="light"
    @hidden="onHiddenModal"
    @show="onShowModal"
  >
    <b-alert v-if="hasErrors" variant="danger" show dismissible class="">
      <ul class="list-unstyled m-0">
        <li v-for="(error, key) in errors" :key="key">
          {{ error }}
        </li>
      </ul>
    </b-alert>

    <form class="card" @submit.prevent="onSubmit">
      <div class="card-body">
        <div class="form-group">
          <label for="inputEmail" class="">Correo Electrónico</label>
          <input
            id="inputEmail"
            ref="email"
            v-model="form.usuario"
            type="text"
            name="email"
            placeholder="Ingrese su correo electrónico"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword" class="">Contraseña</label>
          <input
            id="inputPassword"
            v-model="form.contraseña"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            class="form-control"
          />
        </div>
      </div>
      <button type="submit" class="d-none"></button>
    </form>

    <template v-slot:modal-footer="{ ok }">
      <button
        class="btn btn-block btn-brand-primary"
        :disabled="isWorking"
        @click="onSubmit(ok)"
      >
        <div
          v-if="isWorking"
          class="spinner-border spinner-border-sm"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        Ingresar
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: 'Iniciar Sesión',
      form: {
        usuario: null,
        contraseña: null,
      },
      errors: [],
      submit: false,
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
    modalShow: {
      get() {
        return this.show
      },
      set(value) {
        // emit event to set show value
      },
    },
    isWorking() {
      return this.submit
    },
  },
  methods: {
    getCredentials() {
      return this.form
    },
    clearForm() {
      this.form.usuario = null
      this.form.contraseña = null
    },
    clearErrors() {
      this.errors = []
    },
    addError(error) {
      this.errors.push(error)
    },
    startSubmit() {
      this.submit = true
    },
    endSubmit() {
      this.submit = false
    },
    onShowModal() {
      this.clearForm()
      this.clearErrors()
      this.$emit('show')
    },
    onHiddenModal() {
      this.$emit('hidden')
    },
    mapUser(value) {
      const { token } = value
      const { user } = value

      return {
        token,
        name: user.name,
        email: user.email,
        role: user.role.name,
      }
    },
    async onSubmit(ok) {
      this.startSubmit()
      this.clearErrors()

      const apiUrl = process.env.VUE_APP_API_URL
      const credentials = this.getCredentials()

      if (!credentials.usuario || !credentials.contraseña) {
        this.$nextTick(() => {
          if (!credentials.usuario) {
            this.addError('Por favor ingrese su usuario')
          }

          if (!credentials.contraseña) {
            this.addError('Por favor ingrese su contraseña')
          }
          this.endSubmit()
        })
        return
      }

      try {
        const {
          data: { user },
        } = await axios.post(`${apiUrl}/login`, credentials)

        this.updateUser(this.mapUser(user))
        this.$emit('success')
      } catch (error) {
        if (error.response.status == 401) {
          this.addError(error.response.data.error)
        }
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
