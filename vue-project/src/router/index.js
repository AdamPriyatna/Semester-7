
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/app.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/components/views/Home.vue'),
        meta: { breadcrumb: 'Home' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/components/views/About.vue'),
        meta: { breadcrumb: 'About' }
      },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('@/components/views/Browse.vue'),
        meta: { breadcrumb: 'Browse' },
        redirect: '/browse/events',
        children: [
          {
            path: 'events',
            name: 'events',
            component: () => import('@/components/views/EventList.vue'),
            meta: { breadcrumb: 'Event List' }
          },
          {
            path: 'events/:id',
            name: 'event-detail',
            component: () => import('@/components/views/EventDetail.vue'),
            meta: { breadcrumb: 'Event Detail' }
          },
          {
            path: 'events/:id/register',
            name: 'event-registration',
            component: () => import('@/components/views/EventRegistration.vue'),
            meta: { breadcrumb: 'Register Event' }
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/components/views/Category.vue'),
            meta: { breadcrumb: 'Category' }
          },
          {
            path: 'your-events',
            name: 'your-events',
            component: () => import('@/components/views/YourEvents.vue'),
            meta: { breadcrumb: 'Your Events' }
          },
          {
            path: 'your-events/:id',
            name: 'ticket-receipt',
            component: () => import('@/components/views/TicketReceipt.vue'),
            meta: { breadcrumb: 'Ticket Receipt' }
          }
        ]
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/components/views/Contact.vue'),
        meta: { breadcrumb: 'Contact' }
      }
    ]
  },
  {
    /* AREA PENYELENGGARA ACARA (DASHBOARD) */
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard-overview',
        component: () => import('@/components/views/Dashboard.vue')
      },
      {
        path: 'events',
        name: 'dashboard-events',
        component: () => import('@/components/views/EventManagement.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

