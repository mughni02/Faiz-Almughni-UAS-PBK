<script setup>
// ... (script setup Anda tetap sama)
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const router = useRouter();
async function handleRegister() {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const existingUser = await axios.get(`http://localhost:3000/users?email=${email.value}`);
    if (existingUser.data.length > 0) {
      errorMessage.value = 'Email ini sudah terdaftar. Silakan gunakan email lain.';
      isLoading.value = false;
      return;
    }
    await axios.post('http://localhost:3000/users', { name: name.value, email: email.value, password: password.value, role: 'customer' });
    alert('Registrasi berhasil! Silakan login.');
    router.push('/login');
  } catch (error) {
    console.error('Terjadi kesalahan saat registrasi:', error);
    errorMessage.value = 'Terjadi kesalahan pada server. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="card-title">Buat Akun Baru</h2>
      <p class="card-subtitle">Bergabunglah dengan kami dan mulailah hidup sehat.</p>
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name" class="form-label">Nama Lengkap</label>
          <input v-model="name" id="name" type="text" required class="form-input" placeholder="Nama Anda" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Alamat Email</label>
          <input v-model="email" id="email" type="email" required class="form-input" placeholder="contoh@email.com" />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" type="password" required class="form-input" placeholder="Minimal 8 karakter" />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <button type="submit" :disabled="isLoading" class="submit-button button button-primary">
            {{ isLoading ? 'Memproses...' : 'Daftar' }}
          </button>
        </div>
      </form>
      <p class="login-link-container">
        Sudah punya akun?
        <RouterLink to="/login" class="login-link">Login di sini</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Menggunakan gaya yang sama persis dengan halaman login untuk konsistensi */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 1.5rem;
}
.register-card {
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
  font-family: 'Lora', serif;
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
.register-form { display: flex; flex-direction: column; gap: 1.5rem; }
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
.login-link-container {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6c757d;
}
.login-link {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: underline;
}
.login-link:hover { color: #4a6f4b; }
</style>
