<template>
  <div class="container-fluid container-fluid px-4 my-4">
    <div class="row">
      <div class="col-12">
        <form class="card mb-3" @submit.prevent="onSubmit">
          <div class="card-header">
            Filtros
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="inputFechaInicio" class="col-form-label">
                    Fecha Inicio
                  </label>
                  <input
                    id="inputFechaInicio"
                    v-model="form.fechaInicio"
                    type="date"
                    name="fechaInicio"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="inputFechaFin" class="col-form-label">
                    Fecha Fin
                  </label>
                  <input
                    id="inputFechaFin"
                    v-model="form.fechaFin"
                    type="date"
                    name="fechaFin"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="form-group">
                  <label for="inputLocal" class="col-form-label">
                    Local
                  </label>
                  <select
                    id="inputLocal"
                    v-model="form.local"
                    name="local"
                    class="form-control"
                  >
                    <option :value="null">Seleccione local</option>
                    <option value="Miraflores">Miraflores</option>
                    <option value="San Isidro">San Isidro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button
              type="submit"
              class="btn btn-primary mr-1"
              :disabled="isWorking"
            >
              <span
                v-show="isSubmit"
                class="spinner-border spinner-border-sm"
              />
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            N. Vales Canjeados vs N. Vales Pendientes
          </div>
          <div class="card-body">
            <GChart
              type="PieChart"
              :data="charts.pie.chartData"
              :options="charts.pie.chartOptions"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">
            N. Vales Emitidos por Local
          </div>
          <div class="card-body">
            <GChart
              type="ColumnChart"
              :data="charts.bar.chartData"
              :options="charts.bar.chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fechaInicio: moment().format('YYYY-MM-DD'),
        fechaFin: moment().format('YYYY-MM-DD'),
        local: null,
      },
      charts: {
        pie: {
          chartData: [
            ['Tipo', 'Cantidad'],
            ['Vales canjeados', 0],
            ['Vales pendientes', 0],
          ],
          chartOptions: {
            chart: {
              title: 'N. Vales Canjeados vs N. Vales Pendientes',
            },
            chartArea: { width: 400, height: 300 },
          },
        },
        bar: {
          chartData: [
            ['Local', 'Cantidad'],
            ['Miraflores', 0],
            ['Cercado', 0],
            ['San Isidro', 0],
            ['Molina', 0],
          ],
          chartOptions: {
            chart: {
              title: 'N. Vales Emitidos por Local',
            },
          },
        },
      },
      submit: false,
    }
  },
  computed: {
    isSubmit() {
      return this.submit
    },
    isWorking() {
      return this.submit
    },
  },
  methods: {
    getData() {
      const fechaInicio = moment(this.form.fechaInicio).valueOf()
      const fechaFin = moment(this.form.fechaFin).valueOf()

      return { fechaInicio, fechaFin }
    },
    refreshCharts(value) {
      const { canjeados } = value
      const { cantidad } = value

      this.charts.pie.chartData = [
        ['Tipo', 'Cantidad'],
        ['Vales canjeados', canjeados],
        ['Vales pendientes', cantidad - canjeados],
      ]

      this.charts.bar.chartData = [
        ['Local', 'Cantidad'],
        ['Miraflores', 1],
        ['Cercado', 2],
        ['San Isidro', 1],
        ['Molina', 2],
      ]
    },
    startSubmit() {
      this.submit = true
    },
    endSubmit() {
      this.submit = false
    },
    onClear() {},
    async onSubmit(e) {
      this.startSubmit()

      const apiUrl = process.env.VUE_APP_API_URL
      const token = this.auth.user.token
      const headers = { token }
      const params = this.getData()
      const url = `${apiUrl}/vales/dash`

      try {
        const response = await axios.get(url, { params, headers })

        this.refreshCharts(response.data.resumen)
      } catch (error) {
      } finally {
        this.endSubmit()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
