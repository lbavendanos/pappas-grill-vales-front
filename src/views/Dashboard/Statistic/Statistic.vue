<template>
  <div class="container-fluid container-fluid px-4 my-4">
    <div class="row">
      <div class="col-12">
        <form class="card mb-3" @submit="onSubmit">
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
            <button class="btn btn-primary mr-1">Aplicar</button>
            <button class="btn btn-secondary ml-1" @click.prevent="onClear">
              Limpiar
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
        fechaInicio: null,
        fechaFin: null,
        local: null,
      },
      charts: {
        pie: {
          chartData: [
            ['Tipo', 'Cantidad'],
            ['Vales canjeados', 1000],
            ['Vales pendientes', 1170],
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
            ['Miraflores', 1000],
            ['Cercado', 1170],
            ['San Isidro', 660],
            ['Molina', 1030],
          ],
          chartOptions: {
            chart: {
              title: 'N. Vales Emitidos por Local',
            },
          },
        },
      },
    }
  },
  methods: {
    onClear() {},
    onSubmit(e) {},
  },
}
</script>

<style lang="scss" scoped></style>
