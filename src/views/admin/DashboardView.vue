<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stats = ref([
  { name: 'Total Produk', value: 0, icon: '📦' },
  { name: 'Total Pesanan', value: 0, icon: '🛒' },
  { name: 'Pesan Masuk', value: 0, icon: '✉️' },
  { name: 'Total Pengguna', value: 0, icon: '👥' },
]);
const isLoading = ref(true);

async function fetchDashboardData() {
  try {
    isLoading.value = true;
    const [productsRes, ordersRes, messagesRes, usersRes] = await Promise.all([
      axios.get('http://localhost:3000/products'),
      axios.get('http://localhost:3000/orders'),
      axios.get('http://localhost:3000/messages'),
      axios.get('http://localhost:3000/users')
    ]);

    stats.value[0].value = productsRes.data.length;
    stats.value[1].value = ordersRes.data.length;
    stats.value[2].value = messagesRes.data.length;
    stats.value[3].value = usersRes.data.length;

  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchDashboardData);
</script>

<template>
  <div class="dashboard-container">
    <h2 class="page-header">Dashboard Ringkasan</h2>
    
    <div v-if="isLoading" class="loading-indicator">
      Memuat data statistik...
    </div>

    <div v-else class="stats-grid">
      <div v-for="stat in stats" :key="stat.name" class="stat-card">
        <div class="stat-icon-wrapper">
          <span class="stat-icon">{{ stat.icon }}</span>
        </div>
        <div class="stat-info">
          <p class="stat-label">{{ stat.name }}</p>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  font-family: 'Lora', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.loading-indicator {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.06);
}

.stat-icon-wrapper {
  background-color: #eaf3ea;
  padding: 1rem;
  border-radius: 50%;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  font-family: 'Lora', serif;
  color: var(--text-color);
  margin: 0;
}
</style>
