import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/app.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/components/views/Home.vue'),
        meta: { breadcrumb: 'Home' },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/components/views/About.vue'),
        meta: { breadcrumb: 'About' },
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
            meta: { breadcrumb: 'Event List' },
          },
          {
            path: 'events/:id',
            name: 'event-detail',
            component: () => import('@/components/views/EventDetail.vue'),
            meta: { breadcrumb: 'Event Detail' },
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/components/views/Category.vue'),
            meta: { breadcrumb: 'Category' },
          },
        ],
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/components/views/Contact.vue'),
        meta: { breadcrumb: 'Contact' },
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layout/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/components/views/Dashboard.vue'),
        meta: { breadcrumb: 'Dashboard' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router