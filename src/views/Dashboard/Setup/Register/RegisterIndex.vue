<template>
  <div v-if="loading" class="container-fluid px-4 my-4">
    <div class="row mb-4">
      <div class="col-12">
        <form class="card" @submit.prevent="onSubmit">
          <div class="card-body">
            <b-alert
              v-if="hasErrors"
              variant="danger"
              show
              dismissible
              class=""
            >
              <ul class="list-unstyled m-0">
                <li v-for="(error, key) in errors" :key="key">
                  {{ error }}
                </li>
              </ul>
            </b-alert>
            <div class="row">
              <div class="col-12 col-xl-3">
                <h5>Registrar vale</h5>
                <p>
                  Esta seccion le permite registrar un vale
                </p>
              </div>
              <div class="col-12 col-xl-7">
                <div class="form-group">
                  <label for="inputVale">
                    Vale
                  </label>
                  <input
                    id="inputVale"
                    v-model="form.code"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Ingrese su # de Vale"
                  />
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
                            <span
                              :class="
                                detail.activo ? 'text-success' : 'text-danger'
                              "
                              >{{ detail.activo ? 'Libre' : 'Canjeado' }}</span
                            >
                          </li>
                          <li>
                            <strong>Monto: </strong>
                            <span>{{ currencyFormat(detail.monto) }}</span>
                          </li>
                          <li v-if="detail.canjeadopor">
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
                      <div v-if="detail.activo" class="card-footer">
                        <button
                          class="btn btn-primary"
                          :disabled="isWorking"
                          @click.prevent="onRegister"
                        >
                          <div
                            v-if="isRegister"
                            class="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                          Registrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-right">
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
              class="btn btn-primary mx-1"
              :disabled="isWorking"
            >
              <div
                v-if="isSubmit"
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
      errors: [],
      show: false,
      submit: false,
      register: false,
      loading: false,
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    },
    isSubmit() {
      return this.submit
    },
    isRegister() {
      return this.register
    },
    isWorking() {
      return this.submit || this.register
    },
  },
  mounted() {
    this.loaded()
  },
  methods: {
    loaded() {
      this.loading = true
    },
    getData() {
      const { user } = this.auth
      const userid = user.id
      const localesPlain = _.map(user.locales, (o) => {
        return `"${o.id}"`
      }).join(', ')
      const local = `[${localesPlain}]`

      return { userid, local }
    },
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
    startRegister() {
      this.register = true
    },
    endRegister() {
      this.register = false
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
    async onRegister() {
      this.startRegister()
      this.clearErrors()

      const apiUrl = process.env.VUE_APP_API_URL
      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const code = this.getCode()
      const data = this.getData()

      if (!code) {
        this.$nextTick(() => {
          this.endRegister()
          this.addError('Por favor ingrese el numero del Vale')
        })
        return
      }

      try {
        await axios.put(`${apiUrl}/vales/admin/${code}`, data, params)

        this.$toasted.show('El vale fue registrado', {
          type: 'success',
        })

        const {
          data: { valeDB },
        } = await axios.get(`${apiUrl}/vales/${code}`)

        this.setDetail(valeDB)
      } catch (error) {
      } finally {
        this.endRegister()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
