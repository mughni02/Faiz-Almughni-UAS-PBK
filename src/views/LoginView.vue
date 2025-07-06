<script setup>
// ... (script setup Anda tetap sama)
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
async function handleLogin() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('http://localhost:3000/users', {
      params: { email: email.value, password: password.value }
    });
    if (response.data.length > 0) {
      authStore.setLogin(response.data[0]);
    } else {
      errorMessage.value = 'Email atau password yang Anda masukkan salah.';
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat login:', error);
    errorMessage.value = 'Terjadi kesalahan pada server. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="card-title">Selamat Datang Kembali</h2>
      <p class="card-subtitle">Login untuk melanjutkan belanja Anda.</p>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email" class="form-label">Alamat Email</label>
          <input v-model="email" id="email" type="email" required class="form-input" placeholder="contoh@email.com" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" type="password" required class="form-input" placeholder="••••••••" />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <button type="submit" :disabled="isLoading" class="submit-button button button-primary">
            {{ isLoading ? 'Memproses...' : 'Login' }}
          </button>
        </div>
      </form>
      <p class="register-link-container">
        Belum punya akun?
        <RouterLink to="/register" class="register-link">Buat akun baru</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1.5rem;
}
.login-card {
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.card-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}
.card-subtitle {
  text-align: center;
  color: #6c757d;
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
}
.login-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-group { display: flex; flex-direction: column; }
.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}
.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
}
.error-message {
  color: #c9184a;
  background-color: #fff0f3;
  border: 1px solid #ffccd5;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}
.submit-button { width: 100%; }
.submit-button:disabled { background-color: #9ca3af; cursor: not-allowed; transform: none; box-shadow: none; }
.register-link-container {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6c757d;
}
.register-link {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: underline;
}
.register-link:hover { color: #4a6f4b; }
</style>
