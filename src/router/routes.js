export default [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Home/Home.vue'),
  },
  {
    path: '/canjes',
    name: 'canje',
    component: () =>
      import(/* webpackChunkName: "canje" */ '../views/Canje/Canje.vue'),
  },
]
