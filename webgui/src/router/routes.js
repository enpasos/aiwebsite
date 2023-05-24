import mdPageList from 'src/pages/listing'



import DocLayout from 'src/layouts/doc-layout/DocLayout.vue'

const routeMap = {
  './docs/docs.md': { path: '/docs' }
  // './integrations/integrations.md': { path: 'integrations' },
  // './components/components.md': { path: 'components', meta: { fullwidth: true, dark: true } }
}

const routes = [
  // shortcuts
  { path: '/start', redirect: '/giants' },

  // docs
  {
    path: '/',
    component: DocLayout,
    children: [
      {
        path: '',
        component: () => import('../pages/landing/PageLanding.vue'),
        meta: { fullscreen: true, dark: true }
      },
      ...Object.keys(mdPageList).map(key => {
        const acc = { component: mdPageList[ key ] }
        const route = routeMap[ key ]
        route !== void 0 && Object.assign(acc, route)

        if (acc.path === void 0) {
          const parts = key.substring(1, key.length - 3).split('/')
          const len = parts.length
          const path = parts[ len - 2 ] === parts[ len - 1 ]
            ? parts.slice(0, len - 1)
            : parts

          acc.path = path.join('/')
        }

        return acc
      })
    ]
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: DocLayout,
    children: [{
      path: '',
      component: () => import('../pages/Page404.vue'),
      meta: { fullscreen: true }
    }]
  }
]

export default routes
