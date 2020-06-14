<template>
  <div class="footer container-fluid bg-brand-tertiary py-2">
    <div class="row">
      <div class="col-6">
        <div class="footer-brand">
          <img
            src="./../../assets/logotipo.png"
            alt="Pappas Grill"
            class="img-fluid"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="footer-info">
          <h6 class="font-weight-light text-white m-0">
            &copy; 2020 Grupo 03
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  padding: 0.5rem 1rem;

  &-brand {
    width: 5rem;
  }

  &-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  }
}
</style>
