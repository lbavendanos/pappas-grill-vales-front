<template>
  <div class="container mt-5">
    <div class="row mb-4">
      <div class="col-12">
        <form class="card" @submit.prevent="onSubmit">
          <div class="card-header">
            <h2 class="text-brand-primary text-center m-0">
              Vales Pappa Grill
            </h2>
          </div>
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-12 col-md-5">
                <b-alert
                  v-if="hasErrors"
                  variant="danger"
                  show
                  dismissible
                  class="mt-4"
                >
                  <ul class="list-unstyled m-0">
                    <li v-for="(error, key) in errors" :key="key">
                      {{ error }}
                    </li>
                  </ul>
                </b-alert>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-md-center">
              <div class="form-group col-12 col-md-5 text-center">
                <label for="inputVale">
                  <h5>
                    Ingrese su # de Vale
                  </h5>
                </label>
                <input
                  id="inputVale"
                  v-model="form.code"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                />
              </div>
            </div>
            <div v-if="show" class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    Detalle
                  </div>
                  <div class="card-body">
                    <ul>
                      <li>
                        <strong>Numero de Vale: </strong>
                        <span>{{ detail.idvale }}</span>
                      </li>
                      <li>
                        <strong>Estado: </strong>
                        <span>{{ detail.activo ? 'Libre' : 'Canjeado' }}</span>
                      </li>
                      <li>
                        <strong>Monto: </strong>
                        <span>{{ currencyFormat(detail.monto) }}</span>
                      </li>
                      <li v-if="detail.canjeadopor.name">
                        <strong>Canjeado por: </strong>
                        <span>{{ detail.canjeadopor.name }}</span>
                      </li>
                      <li>
                        <strong>Fecha de vencimiento: </strong>
                        <span>{{ dateFormat(detail.vencimiento) }}</span>
                      </li>
                      <li v-if="detail.fechacanje">
                        <strong>Fecha de canje: </strong>
                        <span>{{ dateFormat(detail.fechacanje) }}</span>
                      </li>
                      <li>
                        <strong>Descripcion: </strong>
                        <span>{{ detail.descripcion }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <button
              type="button"
              class="btn btn-secondary mx-1"
              :disabled="isWorking"
              @click.prevent="onClear"
            >
              Limpiar
            </button>
            <button
              type="submit"
              class="btn btn-brand-secondary mx-1"
              :disabled="isWorking"
            >
              <div
                v-if="isWorking"
                class="spinner-border spinner-border-sm"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: null,
      },
      detail: {},
      submit: false,
      errors: [],
      show: false,
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
    isWorking() {
      return this.submit
    },
  },
  methods: {
    getCode() {
      return this.form.code
    },
    setDetail(value) {
      this.detail = value
    },
    currencyFormat(value) {
      const number = numeral(value).format('0,0.00')

      return `S/${number}`
    },
    dateFormat(value) {
      const date = moment(value).locale('es')

      return date.format('DD MMMM YYYY h:m a')
    },
    clearForm() {
      this.form.code = null
    },
    onClear() {
      this.clearErrors()
      this.clearForm()

      this.show = false
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
    async onSubmit(e) {
      this.startSubmit()
      this.clearErrors()

      const apiUrl = process.env.VUE_APP_API_URL
      const code = this.getCode()

      if (!code) {
        this.$nextTick(() => {
          this.endSubmit()
          this.addError('Por favor ingrese el numero del Vale')
        })
        return
      }

      try {
        const {
          data: { valeDB },
        } = await axios.get(`${apiUrl}/vales/${code}`)

        if (!valeDB) {
          this.addError('Numero de Vale incorrecto')
          return
        }

        this.setDetail(valeDB)
        this.show = true
      } catch (error) {
        this.addError('Numero de Vale incorrecto')
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#inputVale {
  font-size: 2.5rem;
}
</style>
