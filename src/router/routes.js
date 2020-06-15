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
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: { name: 'dashboard.home' },
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '../views/Dashboard/Dashboard.vue'
      ),
    children: [
      {
        name: 'dashboard.home',
        path: 'home',
        component: () =>
          import(
            /* webpackChunkName: "dashboard-home" */ '../views/Dashboard/Home/Home.vue'
          ),
      },
      {
        name: 'dashboard.statistic',
        path: 'statistic',
        component: () =>
          import(
            /* webpackChunkName: "dashboard-statistic" */ '../views/Dashboard/Statistic/Statistic.vue'
          ),
      },
    ],
  },
]
