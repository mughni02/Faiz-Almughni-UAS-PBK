<script setup>
// ... (script setup Anda tetap sama)
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';
const orders = ref([]);
const isLoading = ref(true);
const authStore = useAuthStore();
async function fetchOrders() {
  if (!authStore.isAuthenticated) { isLoading.value = false; return; }
  try {
    isLoading.value = true;
    const userId = authStore.user.id;
    const response = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
    orders.value = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) { console.error("Gagal mengambil riwayat pesanan:", error); } 
  finally { isLoading.value = false; }
}
onMounted(fetchOrders);
function formatRupiah(number) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number); }
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Riwayat Pesanan Saya</h1>

    <div v-if="isLoading" class="status-container">Memuat riwayat pesanan...</div>
    <div v-else-if="!authStore.isAuthenticated" class="status-container">
      <p>Silakan <RouterLink to="/login" class="login-link">login</RouterLink> untuk melihat riwayat pesanan Anda.</p>
    </div>
    <div v-else-if="orders.length === 0" class="status-container">
      <p>Anda belum memiliki riwayat pesanan.</p>
      <RouterLink to="/products" class="start-shopping-button button button-primary">Mulai Belanja Sekarang</RouterLink>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="header-info">
            <span class="info-label">Nomor Pesanan</span>
            <span class="info-value">#{{ order.id }}</span>
          </div>
          <div class="header-info">
            <span class="info-label">Tanggal</span>
            <span class="info-value">{{ new Date(order.date).toLocaleDateString('id-ID') }}</span>
          </div>
           <div class="header-info">
            <span class="info-label">Status</span>
            <span class="info-value status" :class="order.status.toLowerCase()">{{ order.status }}</span>
          </div>
          <div class="header-info total">
            <span class="info-label">Total</span>
            <span class="info-value">{{ formatRupiah(order.total) }}</span>
          </div>
        </div>
        <div class="order-body">
          <h4 class="items-title">Detail Item</h4>
          <ul class="items-list">
            <li v-for="item in order.items" :key="item.productId" class="order-item">
              <span class="item-name">{{ item.name }} ({{ item.quantity }}x)</span>
              <span class="item-total-price">{{ formatRupiah(item.price * item.quantity) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
.page-title { text-align: center; font-family: 'Lora', serif; font-size: 2.5rem; font-weight: 700; color: var(--text-color); margin-bottom: 3rem; }
.status-container { text-align: center; padding: 3rem; font-size: 1.125rem; color: #6c757d; background-color: #fff; border-radius: 12px; border: 1px solid var(--border-color); }
.login-link { color: var(--primary-color); font-weight: 600; }
.start-shopping-button { display: inline-block; margin-top: 1.5rem; }
.orders-list { display: flex; flex-direction: column; gap: 1.5rem; }
.order-card { background-color: #ffffff; border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }
.order-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem 1.5rem; padding: 1.25rem 1.5rem; background-color: #f8f9fa; border-bottom: 1px solid var(--border-color); }
.header-info { display: flex; flex-direction: column; }
.info-label { font-size: 0.8rem; color: #6c757d; text-transform: uppercase; margin-bottom: 0.25rem; }
.info-value { font-size: 0.95rem; font-weight: 600; color: var(--text-color); }
.info-value.status { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; text-align: center; font-weight: 500; }
.info-value.status.selesai { background-color: #d1fae5; color: #065f46; }
.info-value.status.diproses { background-color: #dbeafe; color: #1e40af; }
.info-value.status.baru { background-color: #fef3c7; color: #92400e; }
.info-value.status.dibatalkan { background-color: #fee2e2; color: #991b1b; }
.header-info.total .info-value { font-size: 1.1rem; color: var(--primary-color); }
.order-body { padding: 1.5rem; }
.items-title { font-size: 1rem; font-weight: 600; margin: 0 0 1rem 0; color: #495057; }
.items-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.order-item { display: flex; justify-content: space-between; font-size: 0.9rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); }
.order-item:last-child { border-bottom: none; padding-bottom: 0; }
.item-name { color: var(--text-color); }
.item-total-price { font-weight: 500; color: #495057; }
</style>
