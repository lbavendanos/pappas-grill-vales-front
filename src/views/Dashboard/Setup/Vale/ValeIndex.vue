<template>
  <div v-if="loading" class="container-fluid px-4 my-4">
    <div class="card">
      <div class="card-header">
        <button class="btn btn-primary">Agregar Vale</button>
      </div>
      <div class="card-body">
        <b-table
          striped
          hover
          bordered
          :fields="table.fields"
          :items="table.items"
        >
          <template v-slot:cell(accion)="row">
            <button class="btn btn-primary btn-sm" @click="onEdit(row.item.id)">
              <fa icon="pen" />
            </button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        fields: [
          {
            key: 'id',
            label: 'Id',
          },
          {
            key: 'fechaCreacion',
            label: 'Fecha de creación',
          },
          {
            key: 'fechaVencimiento',
            label: 'Fecha de vencimiento',
          },
          {
            key: 'creador',
            label: 'Usuario',
          },
          {
            key: 'monto',
            label: 'Monto',
          },
          {
            key: 'locales',
            label: 'Locales',
          },
          {
            key: 'accion',
            label: 'Acción',
            class: 'text-center',
          },
        ],
        items: [],
      },
      loading: false,
    }
  },
  async mounted() {
    await this.refreshTable()
    this.loaded()
  },
  methods: {
    loaded() {
      this.loading = true
    },
    async fetchVales() {
      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const apiUrl = process.env.VUE_APP_API_URL

      try {
        const {
          data: { vales },
        } = await axios.get(`${apiUrl}/vales`, params)

        return vales
      } catch (error) {}
    },
    dateFormat(value) {
      const date = moment(value).locale('es')

      return date.format('DD MMMM YYYY h:m a')
    },
    mapItems(items) {
      return _.map(items, (item) => {
        const locales = _.map(item.locales, (o) => {
          return o.name
        }).join(', ')

        return {
          id: item.idvale,
          monto: item.monto,
          creador: item.creadopor.name,
          fechaCreacion: this.dateFormat(item.creacion),
          fechaVencimiento: this.dateFormat(item.vencimiento),
          locales: locales,
          descripcion: item.descripcion,
        }
      })
    },
    async refreshTable() {
      const vales = await this.fetchVales()
      const items = this.mapItems(vales)

      this.table.items = items
    },
    onEdit(id) {
      console.log(id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
