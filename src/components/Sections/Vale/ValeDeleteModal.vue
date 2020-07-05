<template>
  <b-modal
    v-model="modalShow"
    centered
    size="sm"
    :title="title"
    @hidden="onHiddenModal"
    @show="onShowModal"
  >
    <p>{{ `¿Estas seguro que deseas eliminar el vale seleccionado?` }}</p>

    <template v-slot:modal-footer="{ cancel, ok }">
      <button class="btn btn-secondary" :disabled="isWorking" @click="cancel()">
        Cancelar
      </button>
      <button
        class="btn btn-brand-primary"
        :disabled="isWorking"
        @click="onSubmit(ok)"
      >
        <span v-show="isWorking" class="spinner-border spinner-border-sm" />
        Eliminar
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
    valeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: 'Eliminar vale',
      errors: [],
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
    clearErrors() {
      this.errors = []
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
    async onSubmit(ok) {
      this.startSubmit()
      this.clearErrors()

      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const apiUrl = process.env.VUE_APP_API_URL
      const id = this.valeId

      try {
        await axios.delete(`${apiUrl}/vales/${id}`, params)

        this.$emit('success')

        this.$toasted.show('El vale fue eliminado!', {
          type: 'success',
        })

        ok()
      } catch (error) {
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
