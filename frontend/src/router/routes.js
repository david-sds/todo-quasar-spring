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
        path: 'a',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: RouteNames.TASKS.PATH,
        component: () => import('src/pages/tasks/Tasks.vue'),
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
