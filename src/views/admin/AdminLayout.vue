<script setup>
// ... (script setup Anda tetap sama)
import { RouterView, RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Kelola Produk', href: '/admin/products' },
  { name: 'Kelola Pesanan', href: '/admin/orders' },
  { name: 'Lihat Pesan', href: '/admin/messages' },
];
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        ZaitunAdmin
      </div>
      <nav class="sidebar-nav">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="nav-link">
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <button @click="authStore.logout()" class="logout-button">Logout</button>
      </div>
    </aside>

    <div class="main-content">
      <header class="main-header">
        <h1>Selamat Datang, {{ authStore.user?.name || 'Admin' }}!</h1>
      </header>
      <main class="content-area">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout { display: flex; height: 100vh; }
.sidebar {
  width: 260px;
  background-color: #212529; /* Warna gelap pekat */
  color: #dee2e6;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.sidebar-header {
  padding: 1.5rem;
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  border-bottom: 1px solid #343a40;
}
.sidebar-nav { flex-grow: 1; padding: 1rem 0; }
.nav-link {
  display: block;
  padding: 0.85rem 1.5rem;
  margin: 0.25rem 1rem;
  color: #adb5bd;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-link:hover {
  background-color: #343a40;
  color: #ffffff;
}
.nav-link.router-link-exact-active {
  background-color: var(--primary-color);
  color: #ffffff;
  font-weight: 600;
}
.sidebar-footer { padding: 1.5rem; border-top: 1px solid #343a40; }
.logout-button {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #495057;
  background-color: transparent;
  color: #adb5bd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.logout-button:hover { background-color: #343a40; color: #ffffff; }
.main-content { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; }
.main-header {
  background-color: #ffffff;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border-color);
  z-index: 10;
}
.main-header h1 { margin: 0; font-size: 1.5rem; color: var(--text-color); }
.content-area { flex-grow: 1; padding: 2rem; overflow-y: auto; background-color: var(--background-color); }
</style>
