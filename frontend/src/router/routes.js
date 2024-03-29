import RouteNames from './RouteNames'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: RouteNames.MY_DAY.PATH,
        component: () => import('src/pages/tasks/TasksPage.vue'),
      },
      {
        path: RouteNames.FAVORITED.PATH,
        component: () => import('src/pages/tasks/TasksPage.vue'),
      },
      {
        path: RouteNames.PLANNED.PATH,
        component: () => import('src/pages/tasks/TasksPage.vue'),
      },
      {
        path: RouteNames.TASKS.PATH,
        component: () => import('src/pages/tasks/TasksPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: RouteNames.AUTH.PATH,
        component : () => import('src/pages/auth/Auth.vue')
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
