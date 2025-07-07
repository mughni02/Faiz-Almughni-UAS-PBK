<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const isLoading = ref(true);

async function fetchUsers() {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3000/users');
    users.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data pengguna:", error);
    alert("Gagal memuat data pengguna. Pastikan server API (json-server) sudah berjalan.");
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchUsers);
</script>

<template>
  <div>
    <h2 class="header-title">Kelola Pengguna</h2>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Lengkap</th>
            <th>Email</th>
            <th>Peran (Role)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="loading-cell">Memuat data pengguna...</td>
          </tr>
          <tr v-else-if="users.length === 0">
            <td colspan="4" class="loading-cell">Tidak ada pengguna yang terdaftar.</td>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-tag" :class="`role-${user.role}`">
                {{ user.role }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Menggunakan gaya yang sama dengan halaman admin lainnya untuk konsistensi */
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

.role-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.role-tag.role-admin {
  background-color: #fee2e2;
  color: #991b1b;
}

.role-tag.role-customer {
  background-color: #dbeafe;
  color: #1e40af;
}
</style>
