import { auth } from './guards'

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
    beforeEnter: auth.checkIfAuthenticated,
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
      {
        name: 'dashboard.setup',
        path: 'setup',
        component: () =>
          import(
            /* webpackChunkName: "dashboard-setup" */ '../views/Dashboard/Setup/Setup.vue'
          ),
        children: [
          {
            name: 'dashboard.setup.vales',
            path: 'vales',
            redirect: { name: 'dashboard.setup.vales.index' },
            component: () => import('@/views/Dashboard/Setup/Vale/Vale.vue'),
            props: true,
            children: [
              {
                name: 'dashboard.setup.vales.index',
                path: '',
                component: () =>
                  import('@/views/Dashboard/Setup/Vale/ValeIndex.vue'),
                props: true,
              },
            ],
          },
        ],
      },
    ],
  },
]
