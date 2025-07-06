<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const isLoading = ref(true);

async function fetchOrders() {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3000/orders');
    orders.value = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Gagal mengambil data pesanan:", error);
    alert("Gagal memuat pesanan. Pastikan server API (json-server) berjalan.");
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchOrders);

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

// DIUBAH: Fungsi updateStatus sekarang berfungsi penuh
async function updateStatus(orderId, newStatus) {
  try {
    // 1. Kirim permintaan PATCH ke API untuk memperbarui hanya field 'status'
    await axios.patch(`http://localhost:3000/orders/${orderId}`, {
      status: newStatus
    });

    // 2. Temukan pesanan di dalam state lokal dan perbarui statusnya
    //    Ini membuat UI langsung berubah tanpa perlu me-refresh halaman.
    const orderToUpdate = orders.value.find(order => order.id === orderId);
    if (orderToUpdate) {
      orderToUpdate.status = newStatus;
    }

    // (Opsional) Beri notifikasi sukses yang tidak mengganggu
    console.log(`Status pesanan #${orderId} berhasil diubah menjadi "${newStatus}".`);

  } catch (error) {
    console.error("Gagal mengupdate status:", error);
    alert("Gagal mengupdate status pesanan. Silakan coba lagi.");
  }
}
</script>

<template>
  <div>
    <h2 class="header-title">Kelola Pesanan</h2>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID Pesanan</th>
            <th>Tanggal</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="5" class="loading-cell">Memuat pesanan...</td>
          </tr>
          <tr v-else-if="orders.length === 0">
            <td colspan="5" class="loading-cell">Belum ada pesanan yang masuk.</td>
          </tr>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ new Date(order.date).toLocaleDateString('id-ID') }}</td>
            <td>{{ order.userId }}</td>
            <td>{{ formatRupiah(order.total) }}</td>
            <td>
              <select 
                :value="order.status || 'Baru'" 
                @change="updateStatus(order.id, $event.target.value)"
                class="status-select"
                :class="`status-${(order.status || 'baru').toLowerCase()}`"
              >
                <option>Baru</option>
                <option>Diproses</option>
                <option>Dikirim</option>
                <option>Selesai</option>
                <option>Dibatalkan</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Gaya dari jawaban sebelumnya tetap sama, dengan tambahan untuk status */
.header-title {
  font-family: 'Lora', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.table-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.data-table th {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  background-color: #f8f9fa;
}

.data-table td {
  font-size: 0.9rem;
  color: var(--text-color);
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.loading-cell {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.status-select {
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.25em;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
}

/* DITAMBAHKAN: Gaya warna latar belakang berdasarkan status */
.status-select.status-selesai { background-color: #dcfce7; color: #166534; border-color: #bbf7d0; }
.status-select.status-diproses { background-color: #dbeafe; color: #1e40af; border-color: #bfdbfe; }
.status-select.status-baru { background-color: #fef3c7; color: #92400e; border-color: #fde68a; }
.status-select.status-dibatalkan { background-color: #fee2e2; color: #991b1b; border-color: #fecaca; }
.status-select.status-dikirim { background-color: #e0e7ff; color: #3730a3; border-color: #c7d2fe; }
</style>
