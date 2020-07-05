<template>
  <b-modal
    ref="el"
    v-model="modalShow"
    centered
    :title="title"
    @hidden="onHiddenModal"
    @show="onShowModal"
  >
    <vale-form
      v-model="value"
      :errors="errors"
      :submitted="isWorking"
      @submit="onSubmit"
    />

    <template v-slot:modal-footer="{ cancel, ok }">
      <button class="btn btn-secondary" :disabled="isWorking" @click="cancel()">
        Cancelar
      </button>
      <button
        class="btn btn-brand-primary"
        :disabled="isWorking"
        @click="onSubmit(ok)"
      >
        <span v-show="isSubmit" class="spinner-border spinner-border-sm" />
        {{ submitNameButton }}
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
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errors: {},
      submit: false,
    }
  },
  computed: {
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    hasId() {
      return this.value.id ? true : false
    },
    submitNameButton() {
      return this.hasId ? 'Actualizar' : 'Crear'
    },
    successMessage() {
      const type = this.hasId ? 'actualizado' : 'creado'

      return `El vale fue ${type}!`
    },
    title() {
      const type = this.hasId ? 'Editar' : 'Crear'

      return `${type} vale`
    },
    modalShow: {
      get() {
        return this.show
      },
      set(value) {
        // emit event to set show value
      },
    },
    isSubmit() {
      return this.submit
    },
    isWorking() {
      return this.submit
    },
  },
  methods: {
    getData() {
      const { user } = this.auth
      const userid = user.id
      const vencimiento = this.value.vencimiento
        ? moment(this.value.vencimiento).valueOf()
        : null
      const localesPlain = _.map(user.locales, (o) => {
        return `"${o.id}"`
      }).join(', ')
      const locales = `[${localesPlain}]`

      return this.hasId
        ? { ...this.value, vencimiento, userid }
        : { ...this.value, vencimiento, locales, userid }
    },
    clearErrors() {
      this.errors = {}
    },
    startSubmit() {
      this.submit = true
    },
    endSubmit() {
      this.submit = false
    },
    onShowModal() {
      this.clearErrors()
      this.$emit('show')
    },
    onHiddenModal() {
      this.$emit('hidden')
    },
    checkForm(value) {
      if (!value.monto) {
        this.errors['monto'] = 'El monto es obligatorio.'
      }

      if (!value.vencimiento) {
        this.errors['vencimiento'] = 'El vencimiento es obligatorio.'
      }

      if (!value.descripcion) {
        this.errors['descripcion'] = 'El descripcion es obligatorio.'
      }
    },
    async onSubmit(ok) {
      this.startSubmit()
      this.clearErrors()

      const apiUrl = process.env.VUE_APP_API_URL
      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const data = this.getData()
      const { id } = data
      const url = id ? `${apiUrl}/vales/${id}` : `${apiUrl}/vales`

      this.checkForm(data)

      if (this.hasErrors) {
        this.endSubmit()
        return
      }

      if (!_.isFunction(ok)) {
        ok = this.$refs.el.onOk
      }

      try {
        if (this.hasId) {
          await axios.put(url, data, params)
        } else {
          await axios.post(url, data, params)
        }

        this.$emit('success')

        this.$toasted.show(this.successMessage, {
          type: 'success',
        })

        if (!this.hasId) {
          ok()
        }
      } catch (error) {
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
