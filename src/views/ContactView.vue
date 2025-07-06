<script setup>
import { ref } from 'vue';
import axios from 'axios';

// State untuk menampung data dari form
const form = ref({
  name: '',
  email: '',
  message: ''
});
const isLoading = ref(false);
const successMessage = ref('');

async function submitForm() {
  isLoading.value = true;
  successMessage.value = '';
  try {
    // Kirim data form ke endpoint 'messages' di json-server
    await axios.post('http://localhost:3000/messages', {
      ...form.value,
      date: new Date().toISOString() // Tambahkan tanggal pengiriman
    });

    successMessage.value = 'Terima kasih! Pesan Anda telah berhasil terkirim.';
    // Kosongkan form setelah berhasil
    form.value = { name: '', email: '', message: '' };

  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="contact-page">
    <div class="page-container">
      <div class="contact-layout">
        <div class="info-section">
          <h1 class="info-title">Hubungi Kami</h1>
          <p class="info-description">Kami senang mendengar dari Anda. Apakah Anda memiliki pertanyaan tentang produk, pesanan, atau ingin bekerja sama, jangan ragu untuk menghubungi kami.</p>
          
          <!-- DIKEMBALIKAN: Detail kontak dan link sosial -->
          <div class="contact-details">
            <div class="detail-item">
              <strong>Alamat:</strong>
              <span>Jl. Soekarno-Hatta No. 148, Pekanbaru, Riau, Indonesia</span>
            </div>
            <div class="detail-item">
              <strong>Telepon:</strong>
              <a href="tel:+6281234567890">+62 812 3456 7890</a>
            </div>
            <div class="detail-item">
              <strong>Email:</strong>
              <a href="mailto:halo@zaitunorganic.com">halo@zaitunorganic.com</a>
            </div>
            
            <div class="social-links">
              <div class="detail-item social">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                <a href="https://www.instagram.com/zaitunorganicmarket?igsh=MnkxNDZ3d2xhZ2Jp" target="_blank" rel="noopener noreferrer">@zaitunorganic</a>
              </div>
              <div class="detail-item social">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.52 6.49C18.17 5.15 16.36 4.4 14.28 4.4c-2.02 0-3.79.6-5.22 1.79-1.39 1.15-2.2 2.77-2.33 4.81h-1.2c-1.3 0-2.31.38-3.04 1.15-.73.77-1.1 1.8-1.1 3.09v.28c0 1.28.37 2.31 1.1 3.08.74.77 1.75 1.16 3.04 1.16h1.48c.13 1.28.6 2.39 1.4 3.3.81.92 1.84 1.38 3.1 1.38 1.25 0 2.28-.46 3.09-1.38.81-.92 1.28-2.03 1.4-3.3h1.48c1.3 0 2.31-.39 3.04-1.16.73-.77 1.1-1.8 1.1-3.08v-.28c0-1.28-.37-2.32-1.1-3.09-.73-.77-1.74-1.15-3.04-1.15h-1.2c-.13-2.04-.94-3.66-2.33-4.81zM10.1 17.58c-.33.39-.73.58-1.2.58-.46 0-.86-.2-1.2-.58-.33-.4-.5-.86-.5-1.38h3.4c0 .52-.17.98-.5 1.38zm6.67-1.38c-.58 0-1.05.23-1.4.69-.35.46-.53 1.02-.53 1.69h-3.4c0-.67-.18-1.23-.53-1.69-.35-.46-.82-.69-1.4-.69H7.03c-.9 0-1.6-.29-2.1-.88-.5-.58-.76-1.37-.76-2.36v-.28c0-.98.25-1.77.76-2.35.5-.59 1.2-.88 2.1-.88h1.48v4.25c0 .46.16.85.48 1.16.32.3.7.46 1.14.46h3.4c.44 0 .82-.15 1.14-.46.32-.3.48-.7.48-1.16V9.25h1.48c.9 0 1.6.29 2.1.88.5.58.76 1.37.76 2.35v.28c0 .99-.25 1.78-.76 2.36-.5.59-1.2.88-2.1.88h-1.48zm.05-6.95c.87-.84 1.94-1.26 3.2-1.26h.28c.9 0 1.6.29 2.1.88.5.58.76 1.37.76 2.35v.28c0 .28-.03.54-.08.78h-4.8c-.06-1.3-.52-2.36-1.38-3.18-.08-.07-.08-.07 0 0zm-6.72 0c-.87.82-1.32 1.88-1.38 3.18h-4.8c-.05-.24-.08-.5-.08-.78v-.28c0-.98.25-1.77.76-2.35.5-.59 1.2-.88 2.1-.88h.28c1.26 0 2.33.42 3.2 1.26z"></path></svg>
                <a href="https://id.shp.ee/c1RBTKS" target="_blank" rel="noopener noreferrer">zaitunorganic</a>
              </div>
            </div>
          </div>
        </div>
        <div class="form-section">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Nama Lengkap</label>
              <input type="text" id="name" v-model="form.name" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="form.email" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Pesan</label>
              <textarea id="message" rows="5" v-model="form.message" required class="form-input"></textarea>
            </div>
            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>
            <button type="submit" :disabled="isLoading" class="submit-button">
              {{ isLoading ? 'Mengirim...' : 'Kirim Pesan' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-message {
  padding: 1rem;
  background-color: #e8f5e9;
  color: #1b5e20;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
}
.submit-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
.contact-page { padding: 4rem 2rem; background-color: #ffffff; }
.page-container { max-width: 1024px; margin: 0 auto; }
.contact-layout { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media (min-width: 768px) { .contact-layout { grid-template-columns: 1fr 1fr; gap: 4rem; } }
.info-title { font-size: 2.5rem; font-weight: 700; color: #1f2937; }
.info-description { margin-top: 1rem; font-size: 1.125rem; color: #6b7280; line-height: 1.6; }
.form-section { background-color: #f9fafb; padding: 2rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; }
.contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-label { font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem; }
.form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem; }
.submit-button { padding: 0.75rem; background-color: #4CAF50; color: white; border: none; border-radius: 0.375rem; font-size: 1rem; font-weight: 600; cursor: pointer; align-self: flex-end; }

/* DIKEMBALIKAN: CSS untuk detail kontak */
.contact-details {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.detail-item {
  display: flex;
  flex-direction: column;
}
.detail-item strong {
  font-weight: 600;
  color: #374151;
}
.detail-item span, .detail-item a {
  color: #6b7280;
  text-decoration: none;
}
.detail-item a:hover {
  text-decoration: underline;
  color: #4CAF50;
}
.social-links {
  margin-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.detail-item.social {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}
.detail-item.social svg {
  fill: #374151;
  flex-shrink: 0;
}
.detail-item.social a {
  font-weight: 500;
  color: #374151;
}
</style>
