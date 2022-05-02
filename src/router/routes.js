
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'cards', component: () => import('pages/Cards.vue') },
      { path: 'payments', component: () => import('pages/Index.vue') },
      { path: 'credit', component: () => import('pages/Index.vue') },
      { path: 'settings', component: () => import('pages/Index.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
