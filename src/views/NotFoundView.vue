<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="notfound-container">
    <div class="notfound-content">
      <p class="status-code">404</p>
      <h1 class="title">Halaman tidak ditemukan</h1>
      <p class="description">Maaf, kami tidak dapat menemukan halaman yang Anda cari.</p>
      <div class="actions">
        <RouterLink to="/" class="action-button primary">Kembali ke Beranda</RouterLink>
        <RouterLink to="/contact" class="action-button secondary">Hubungi kami</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.notfound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #ffffff;
}

.notfound-content {
  text-align: center;
}

.status-code {
  font-size: 1rem;
  font-weight: 600;
  color: #4CAF50;
}

.title {
  margin-top: 1rem;
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
}

.description {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #6b7280;
}

.actions {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.action-button.primary {
  background-color: #4CAF50;
  color: white;
}

.action-button.primary:hover {
  background-color: #45a049;
}

.action-button.secondary {
  color: #374151;
}

.action-button.secondary:hover {
  text-decoration: underline;
}
</style>
