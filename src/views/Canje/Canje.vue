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
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Culpa quidem harum facilis iusto repudiandae aperiam quam
                      animi quisquam. Tempora, in voluptates! Natus commodi
                      beatae fugit labore, assumenda earum eveniet numquam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus harum molestias voluptates quisquam dicta. Esse,
                      atque quos! Quos velit nihil sed ipsam? Aliquid temporibus
                      laborum tempore nam excepturi a earum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <button
              type="button"
              class="btn btn-secondary mx-1"
              @click.prevent="onClear"
            >
              Limpiar
            </button>
            <button type="submit" class="btn btn-brand-secondary mx-1">
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
      show: false,
    }
  },
  methods: {
    clearForm() {
      this.form.code = null
    },
    onClear() {
      this.clearForm()
      this.show = false
    },
    onSubmit(e) {
      this.clearForm()
      this.show = true
    },
  },
}
</script>

<style lang="scss" scoped>
#inputVale {
  font-size: 2.5rem;
}
</style>
