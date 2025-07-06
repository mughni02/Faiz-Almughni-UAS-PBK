<script setup>
// ... (script setup Anda tetap sama)
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);
function toggleMobileMenu() { isMobileMenuOpen.value = !isMobileMenuOpen.value; }
function handleLogout() { authStore.logout(); isMobileMenuOpen.value = false; }
</script>

<template>
  <header class="main-header">
    <div class="header-container">
      <RouterLink to="/" class="logo-link">
        <span class="logo-text">ZaitunOrganic</span>
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/products" class="nav-item">Products</RouterLink>
        <RouterLink to="/about" class="nav-item">About</RouterLink>
        <RouterLink to="/contact" class="nav-item">Contact</RouterLink>
      </nav>

      <div class="action-buttons">
        <RouterLink to="/cart" class="nav-item cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.087-.835l1.858-6.491A1.125 1.125 0 0 0 18 5.25H5.438M7.5 14.25 6.108 5.25m0 0L3.292 3M7.5 14.25l1.833-6.75" /></svg>
        </RouterLink>
        
        <template v-if="!authStore.isAuthenticated">
          <RouterLink to="/login" class="login-btn">Login</RouterLink>
        </template>
        <template v-else>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
      </div>

      <div class="mobile-menu-button-container">
        <button @click="toggleMobileMenu" class="mobile-menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="mobile-nav">
      <RouterLink to="/" @click="toggleMobileMenu" class="nav-item-mobile">Home</RouterLink>
      <RouterLink to="/products" @click="toggleMobileMenu" class="nav-item-mobile">Products</RouterLink>
      <RouterLink to="/about" @click="toggleMobileMenu" class="nav-item-mobile">About</RouterLink>
      <RouterLink to="/contact" @click="toggleMobileMenu" class="nav-item-mobile">Contact</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background-color: rgba(253, 252, 249, 0.8);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
}

.logo-text {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
}

.desktop-nav { display: none; }
@media (min-width: 768px) { .desktop-nav { display: flex; gap: 2.5rem; } }

.nav-item {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  padding-bottom: 0.5rem;
}
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}
.nav-item:hover::after, .nav-item.router-link-exact-active::after {
  width: 100%;
}

.action-buttons { display: flex; align-items: center; gap: 1rem; }
.icon { width: 1.5rem; height: 1.5rem; color: var(--text-color); }

.login-btn, .logout-btn {
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
  color: var(--primary-color);
}
.login-btn:hover, .logout-btn:hover {
  background-color: var(--primary-color);
  color: #ffffff;
}

.mobile-menu-button-container { display: block; }
@media (min-width: 768px) { .mobile-menu-button-container { display: none; } }
.mobile-menu-button { background: none; border: none; cursor: pointer; }
.mobile-nav { display: flex; flex-direction: column; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem; }
@media (min-width: 768px) { .mobile-nav { display: none; } }
.nav-item-mobile { padding: 0.75rem; text-decoration: none; color: var(--text-color); font-weight: 500; border-radius: 6px; }
.nav-item-mobile:hover { background-color: #f0efeb; }
</style>
