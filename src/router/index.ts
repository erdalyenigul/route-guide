import { createRouter, createWebHistory } from 'vue-router'
import { adminContentService } from '@/domains/admin/services/adminContentService'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/domains/trips/views/HomeView.vue'),
      meta: { titleKey: 'nav.route' }
    },
    {
      path: '/trips/:routeId/timeline',
      name: 'timeline',
      component: () => import('@/domains/trips/views/TimelineView.vue'),
      meta: { titleKey: 'nav.timeline' }
    },
    {
      path: '/trips/:routeId/summary',
      name: 'route-summary',
      component: () => import('@/domains/trips/views/RouteSummaryView.vue'),
      meta: { titleKey: 'routeSummary.title' }
    },
    {
      path: '/trips/:routeId/map',
      name: 'map',
      component: () => import('@/domains/map/views/MapView.vue'),
      meta: { titleKey: 'nav.map' }
    },
    {
      path: '/trips/:routeId/stops',
      name: 'stops',
      component: () => import('@/domains/stops/views/StopsView.vue'),
      meta: { titleKey: 'nav.stops' }
    },
    {
      path: '/trips/:routeId/gallery',
      name: 'gallery',
      component: () => import('@/domains/gallery/views/GalleryView.vue'),
      meta: { titleKey: 'nav.gallery' }
    },
    {
      path: '/trips/:routeId/stops/:stopId',
      name: 'stop-detail',
      component: () => import('@/domains/stops/views/StopDetailView.vue'),
      meta: { titleKey: 'stop.overview', hideNavigation: true }
    },
    {
      path: '/trips/:routeId/checklist',
      name: 'checklist',
      component: () => import('@/domains/checklists/views/ChecklistView.vue'),
      meta: { titleKey: 'nav.checklist' }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/domains/favorites/views/FavoritesView.vue'),
      meta: { titleKey: 'nav.favorites' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/domains/settings/views/SettingsView.vue'),
      meta: { titleKey: 'nav.settings' }
    },
    {
      path: '/manage/login',
      name: 'admin-login',
      component: () => import('@/domains/admin/views/AdminLoginView.vue'),
      meta: { titleKey: 'admin.loginTitle', hideNavigation: true }
    },
    {
      path: '/manage',
      name: 'admin-dashboard',
      component: () => import('@/domains/admin/views/AdminDashboardView.vue'),
      meta: { titleKey: 'admin.dashboardTitle', hideNavigation: true, requiresAuth: true }
    },
    {
      path: '/manage/stops/:stopId',
      name: 'admin-stop-editor',
      component: () => import('@/domains/admin/views/AdminStopEditorView.vue'),
      meta: { titleKey: 'admin.experienceTitle', hideNavigation: true, requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/app/views/NotFoundView.vue'),
      meta: { titleKey: 'notFound.title', hideNavigation: true }
    }
  ]
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  try {
    if (await adminContentService.currentUser()) return true
  } catch {
    // A missing Supabase configuration is handled by the login screen.
  }
  return { name: 'admin-login', query: { redirect: to.fullPath } }
})
