import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store/authStore'

// Lazy-load components to improve performance
const MainLayout = () => import('../layouts/MainLayout.vue')
const EventsListPage = () => import('../pages/Event/EventsListPage.vue')
const EventDetailPage = () => import('../pages/Event/EventDetailPage.vue')
const LoginPage = () => import('../pages/Auth/LoginPage.vue')
const RegisterPage = () => import('../pages/Auth/RegisterPage.vue')
const CategoryPage = () => import('../pages/Category/CategoryPage.vue')
const ProfilePage = () => import('../pages/Profile/ProfilePage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '', 
        name: 'Home', 
        component: EventsListPage 
      },
      {
        path: '/events/:id',
        name: 'EventDetail',
        component: EventDetailPage,
        props: true,
      },
      { 
        path: '/profile', 
        name: 'Profile', 
        component: ProfilePage, 
        meta: { requiresAuth: true } 
      },
      { 
        path: '/login', 
        name: 'Login', 
        component: LoginPage 
      },
      { 
        path: '/register', 
        name: 'Register', 
        component: RegisterPage 
      },
      { 
        path: '/category/:slug', 
        name: 'CategoryPage', 
        component: CategoryPage, 
        props: true 
      },
      { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFoundPage 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global authentication guard
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`) // Debugging point

  const authStore = useAuthStore()

  // Wait for `checkAuthStatus` to finish if still pending
  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    console.warn(`Access denied to ${to.fullPath}, redirecting to login.`) // Debugging point
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    console.log(`User is authenticated, allowing access to ${to.fullPath}`) // Debugging point
  }

  next() // Proceed to the route if authentication is not required or the user is authenticated
})

// Log errors when navigation fails
router.onError((error) => {
  console.error('Router navigation error:', error) // Debugging point
})

export default router
