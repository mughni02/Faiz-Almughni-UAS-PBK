<template>
  <footer class="main-footer">
    <div class="footer-container page-container">
      <div class="footer-content">
        <div class="footer-section about">
          <h3 class="footer-title">ZaitunOrganic</h3>
          <p>Menyediakan produk organik berkualitas tinggi untuk gaya hidup sehat Anda, langsung dari sumbernya.</p>
        </div>
        <div class="footer-section links">
          <h3 class="footer-title">Tautan Cepat</h3>
          <ul>
            <li><router-link to="/about">Tentang Kami</router-link></li>
            <li><router-link to="/contact">Kontak</router-link></li>
            <li><router-link to="/products">Produk</router-link></li>
            <li><router-link to="/orders">Pesanan Saya</router-link></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h3 class="footer-title">Hubungi Kami</h3>
          <p>Jl. Soekarno-Hatta No. 148<br>Pekanbaru, Riau, Indonesia</p>
          <p><a href="https://www.instagram.com/zaitunorganicmarket?igsh=MnkxNDZ3d2xhZ2Jp" target="_blank" rel="noopener noreferrer">@zaitunorganic</a></p>
          <p><a href="tel:+6281234567890">+62 812 3456 7890</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} ZaitunOrganic. Pilihan ibu cerdas.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: #212529; /* Warna gelap yang sama dengan admin sidebar */
  color: #adb5bd; /* Teks abu-abu terang */
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  margin-top: auto; /* Mendorong footer ke bawah */
}

.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
    text-align: left;
  }
}

.footer-section .footer-title {
  font-family: 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.footer-section p {
  margin: 0;
  line-height: 1.7;
}

.footer-section.links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-section.links a {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section.links a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.footer-section.contact a {
  color: #adb5bd;
}

.footer-bottom {
  border-top: 1px solid #343a40;
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #6c757d;
}

.footer-bottom p {
  margin: 0;
}
</style>
