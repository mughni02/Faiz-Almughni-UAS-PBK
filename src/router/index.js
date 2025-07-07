import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // Rute yang sudah ada
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/products', name: 'Products', component: () => import('../views/ProductsView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterView.vue') },

  // Rute baru untuk pelanggan
  { path: '/cart', name: 'Cart', component: () => import('../views/CartView.vue') },
  { path: '/checkout', name: 'Checkout', component: () => import('../views/CheckoutView.vue') },
  { path: '/orders', name: 'Orders', component: () => import('../views/OrdersView.vue') },

  // Rute baru untuk Admin dengan Nested Routes
  {
    path: '/admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('../views/admin/DashboardView.vue') },
      { path: 'products', name: 'AdminProducts', component: () => import('../views/admin/ManageProductsView.vue') },
      { path: 'orders', name: 'AdminOrders', component: () => import('../views/admin/ManageOrdersView.vue') },
      // DITAMBAHKAN: Rute baru untuk halaman pesan
      { path: 'messages', name: 'AdminMessages', component: () => import('../views/admin/ViewMessages.vue') },
      { path: 'users', name: 'AdminUsers', component: () => import('../views/admin/ManageUsersView.vue') },
    ]
  },
   // Fallback
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router