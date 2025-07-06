<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
// Pastikan nama file ini sesuai dengan nama file komponen Anda (Navbar.vue atau Header.vue)
import Navbar from './components/Navbar.vue'; 
import Footer from './components/Footer.vue';

const route = useRoute();

// Cek apakah rute saat ini adalah bagian dari panel admin
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <!-- 
    Tag div ini membantu struktur layout flexbox dari file CSS global
    untuk mendorong footer ke bawah.
  -->
  <div id="app-container">
    <!-- Tampilkan Navbar hanya jika BUKAN rute admin -->
    <Navbar v-if="!isAdminRoute" />

    <!-- RouterView akan merender komponen halaman yang sesuai dengan URL -->
    <main id="main-content">
      <RouterView />
    </main>

    <!-- Tampilkan Footer hanya jika BUKAN rute admin -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<style scoped>
/*
  Kita menggunakan #id di sini yang akan ditargetkan oleh gaya global
  di style.css untuk membuat layout sticky footer.
*/
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-content {
  flex-grow: 1; /* Membuat konten utama mengisi ruang yang tersedia */
}
</style>
