<template>
  <form class="card" @submit.prevent="onSubmit">
    <div class="card-body">
      <div class="form-group">
        <label for="inputMonto" class="col-form-label">
          Monto
        </label>
        <input
          id="inputMonto"
          v-model="value.monto"
          type="number"
          name="monto"
          min="0"
          class="form-control"
          :class="{
            'is-invalid': errors.monto,
          }"
          placeholder="Ingrese el monto"
        />
        <div v-if="errors.monto" class="invalid-feedback d-block m-0">
          {{ errors.monto }}
        </div>
      </div>
      <div class="form-group">
        <label for="inputVencimiento" class="col-form-label">
          Vencimiento
        </label>
        <input
          id="inputVencimiento"
          v-model="value.vencimiento"
          type="date"
          name="vencimiento"
          class="form-control"
          :class="{
            'is-invalid': errors.vencimiento,
          }"
          placeholder=""
        />
        <div v-if="errors.vencimiento" class="invalid-feedback d-block m-0">
          {{ errors.vencimiento }}
        </div>
      </div>
      <div class="form-group">
        <label for="inputDescripcion" class="col-form-label">
          Descripcion
        </label>
        <textarea
          id="inputDescripcion"
          v-model="value.descripcion"
          name="description"
          rows="5"
          class="form-control"
          :class="{
            'is-invalid': errors.descripcion,
          }"
          placeholder="Ingrese descripcion"
        ></textarea>
        <div v-if="errors.descripcion" class="invalid-feedback d-block m-0">
          {{ errors.descripcion }}
        </div>
      </div>
      <button type="submit" class="d-none"></button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    submitted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    onSubmit(e) {
      this.$emit('submit', e)
    },
  },
}
</script>

<style lang="scss" scoped></style>
