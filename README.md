ZaitunOrganic - Platform E-Commerce Produk Organik
📜 Deskripsi Proyek
ZaitunOrganic adalah sebuah aplikasi web e-commerce full-stack (simulasi) yang dibangun sebagai studi kasus untuk mendemonstrasikan pembuatan toko online modern menggunakan Vue.js. Aplikasi ini dirancang dengan antarmuka yang bersih, elegan, dan profesional untuk menjual berbagai produk organik, mulai dari makanan, minyak esensial, hingga produk herbal.

Proyek ini mencakup dua peran utama: Pelanggan yang dapat menjelajahi dan membeli produk, serta Admin yang memiliki dasbor khusus untuk mengelola seluruh aspek operasional toko.

✨ Fitur Utama
Aplikasi ini memiliki serangkaian fitur lengkap yang mencakup fungsionalitas untuk pelanggan dan administrator.

Untuk Pelanggan:
Autentikasi Pengguna: Sistem registrasi dan login yang aman dan terpisah untuk setiap pengguna.

Penjelajahan Produk: Halaman utama dengan produk unggulan dan halaman produk dengan semua item yang tersedia.

Lihat Detail Produk: Modal pop-up interaktif untuk melihat deskripsi lengkap, harga, dan gambar produk.

Keranjang Belanja (CRUD):

Menambah produk ke keranjang.

Mengubah jumlah (quantity) item langsung di halaman keranjang.

Menghapus item dari keranjang.

Data keranjang disimpan per pengguna menggunakan localStorage.

Sistem Checkout & Pengiriman:

Halaman checkout khusus untuk mengisi alamat pengiriman.

Kalkulasi subtotal, biaya pengiriman tetap, dan total pembayaran.

Riwayat Pesanan: Halaman khusus bagi pengguna untuk melihat semua pesanan yang pernah mereka buat, diurutkan dari yang terbaru.

Form Kontak Fungsional: Pengguna dapat mengirim pesan yang akan diterima dan disimpan di sisi admin.

Untuk Admin:
Dasbor Admin Profesional: Halaman ringkasan yang menampilkan statistik penting seperti total produk, jumlah pesanan, pesan masuk, dan total pengguna.

Manajemen Produk (CRUD Penuh):

Menambah produk baru melalui form modal.

Mengedit detail produk yang sudah ada, termasuk harga, stok, dan deskripsi.

Menghapus produk dari daftar.

Manajemen Pesanan Fungsional:

Melihat semua pesanan yang masuk dari pelanggan.

Mengubah status pesanan (Baru, Diproses, Dikirim, Selesai, Dibatalkan) yang perubahannya akan tersimpan.

Lihat Pesan Masuk: Halaman khusus untuk membaca semua pesan yang dikirim oleh pengguna melalui form kontak, diurutkan dari yang terbaru.

🛠️ Teknologi yang Digunakan
Proyek ini dibangun menggunakan ekosistem Vue.js modern dan beberapa teknologi pendukung:

Frontend:

Vue.js 3 (Composition API & <script setup>)

Vue Router untuk navigasi dan routing halaman.

Pinia untuk manajemen state global (keranjang belanja, status login, dll.).

CSS Manual (Scoped) untuk styling komponen yang modular, terisolasi, dan elegan.

Backend (Simulasi):

json-server untuk menyediakan REST API tiruan yang cepat dan mudah untuk data produk, pengguna, pesanan, dan pesan.

HTTP Client:

Axios untuk melakukan permintaan ke API.

Testing:

Vitest untuk unit testing komponen dan Pinia stores.

@vue/test-utils untuk membantu proses mounting komponen saat testing.

🚀 Panduan Instalasi dan Menjalankan Proyek
Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

1. Clone Repositori
git clone [https://github.com/mughni02/zaitunorganic.git](https://github.com/mughni02/zaitunorganic.git)
cd zaitunorganic

2. Install Dependensi
Pastikan Anda memiliki Node.js terinstal. Kemudian, jalankan perintah berikut untuk menginstal semua paket yang dibutuhkan.

npm install

3. Jalankan Server API (Backend)
Proyek ini membutuhkan json-server sebagai backend. Buka terminal baru dan jalankan perintah berikut. Biarkan terminal ini tetap berjalan.

npm run api

Server API akan berjalan di http://localhost:3000.

4. Jalankan Aplikasi Vue (Frontend)
Di terminal pertama Anda, jalankan perintah berikut untuk memulai server development Vite.

npm run dev

Aplikasi akan tersedia di http://localhost:5173 (atau port lain yang tersedia).

5. Menjalankan Unit Tests
Untuk menjalankan semua tes yang telah