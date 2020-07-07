<template>
  <div v-if="loading" class="container-fluid px-4 my-4">
    <div class="card">
      <div class="card-header">
        <button class="btn btn-primary" @click="onValeOpenModal">
          Agregar Vale
        </button>
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
            <button
              class="btn btn-primary btn-sm mr-1"
              @click="onEdit(row.item.id)"
            >
              <fa icon="pen" />
            </button>
            <button
              class="btn btn-danger btn-sm ml-1"
              @click="onDelete(row.item.id)"
            >
              <fa icon="trash-alt" />
            </button>
          </template>
        </b-table>
      </div>
    </div>

    <vale-modal
      v-model="modal.vale.value"
      :show="modal.vale.show"
      @success="onSuccess"
      @hidden="onValeHiddenModal"
    />

    <vale-delete-modal
      :show="modal.delete.show"
      :vale-id="modal.delete.valeId"
      @success="onSuccess"
      @hidden="onDeleteHiddenModal()"
    />
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
      modal: {
        vale: {
          show: false,
          value: {},
        },
        delete: {
          show: false,
          valeId: '',
        },
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
    async fetchVale(id) {
      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const apiUrl = process.env.VUE_APP_API_URL

      try {
        const {
          data: { valeDB },
        } = await axios.get(`${apiUrl}/vales/${id}`, params)

        return valeDB
      } catch (error) {}
    },
    async fetchVales() {
      const token = this.auth.user.token
      const headers = { token }
      const params = { headers }
      const apiUrl = process.env.VUE_APP_API_URL

      try {
        const {
          data: { vales },
        } = await axios.get(`${apiUrl}/vales?inicio=1&rango=15`, params)

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
          creador: item.creadopor ? item.creadopor.name : '',
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
    setValeId(value) {
      this.modal.delete.valeId = value
    },
    setVale(value) {
      this.modal.vale.value = value
    },
    mapVale(value) {
      return {
        id: value.idvale,
        monto: value.monto,
        vencimiento: moment(value.vencimiento).format('YYYY-MM-DD'),
        descripcion: value.descripcion,
      }
    },
    clearVale() {
      this.modal.vale.value = {}
    },
    onValeOpenModal() {
      this.modal.vale.show = true
    },
    onValeHiddenModal() {
      this.clearVale()
      this.modal.vale.show = false
    },
    onDeleteOpenModal() {
      this.modal.delete.show = true
    },
    onDeleteHiddenModal() {
      this.modal.delete.show = false
    },
    async onSuccess() {
      await this.refreshTable()
    },
    async onEdit(id) {
      const response = await this.fetchVale(id)
      this.setVale(this.mapVale(response))
      this.onValeOpenModal()
    },
    onDelete(id) {
      this.setValeId(id)
      this.onDeleteOpenModal()
    },
  },
}
</script>

<style lang="scss" scoped></style>
