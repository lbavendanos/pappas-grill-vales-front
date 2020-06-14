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
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="inputEmail" class="">Correo Electrónico</label>
          <input
            id="inputEmail"
            ref="email"
            v-model="form.email"
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
            v-model="form.password"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <template v-slot:modal-footer="{ ok }">
      <button
        class="btn btn-block btn-brand-primary"
        :disabled="isWorking"
        @click="onSubmit(ok)"
      >
        <span v-show="isWorking" class="spinner-border spinner-border-sm" />
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
        email: null,
        password: null,
      },
      submit: false,
    }
  },
  computed: {
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
    getData() {
      return this.form
    },
    clearForm() {
      this.form.file = null
    },
    clearErrors() {},
    startSubmit() {
      this.submit = true
    },
    endSubmit() {
      this.submit = false
    },
    onShowModal() {
      this.clearErrors()
      this.clearForm()
      this.$emit('show')
    },
    onHiddenModal() {
      this.$emit('hidden')
    },
    async onSubmit(ok) {
      this.startSubmit()
      this.clearErrors()

      const data = this.getData()

      try {
        // const response = await axios.post('', data)

        this.$emit('success')

        this.clearForm()
      } catch (error) {
        if (error.response.status === 404 || error.response.status == 422) {
        }
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
