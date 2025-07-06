<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const messages = ref([]);
const isLoading = ref(true);

async function fetchMessages() {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3000/messages');
    messages.value = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Gagal mengambil data pesan:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchMessages);
</script>

<template>
  <div>
    <h2 class="header-title">Pesan Masuk</h2>

    <div v-if="isLoading" class="status-container">
      Memuat pesan...
    </div>
    <div v-else-if="messages.length === 0" class="status-container">
      Belum ada pesan yang masuk.
    </div>

    <div v-else class="messages-list">
      <div v-for="msg in messages" :key="msg.id" class="message-card">
        <div class="message-header">
          <div class="sender-info">
            <strong>{{ msg.name }}</strong>
            <a :href="`mailto:${msg.email}`">{{ msg.email }}</a>
          </div>
          <span class="message-date">{{ new Date(msg.date).toLocaleString('id-ID') }}</span>
        </div>
        <div class="message-body">
          <p>{{ msg.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Anda juga bisa menggunakan CSS dari Canvas "CSS untuk Tabel Admin" */
/* Cukup salin dan tempel CSS dari sana ke sini */
.header-title {
  font-family: 'Lora', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.status-container {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
}
.sender-info {
  display: flex;
  flex-direction: column;
}
.sender-info strong { 
  font-family: 'Lora', serif; 
  font-size: 1.1rem; 
  font-weight: 600;
}
.sender-info a { 
  font-size: 0.9rem; 
  color: var(--primary-color);
}
.message-date { 
  font-size: 0.85rem; 
  color: #6c757d; 
}
.message-body { 
  padding: 1.5rem; 
  line-height: 1.7; 
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
