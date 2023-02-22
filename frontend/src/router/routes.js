import RouteNames from './RouteNames'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', //RouteNames.AUTH.PATH,
        component : () => import('src/pages/auth/Auth.vue')
      },
      {
        path: RouteNames.TASKS.PATH,
        component: () => import('src/pages/tasks/TasksPage.vue'),
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
