<template>
  <footer class="footer" id="kontak">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Tentang {{ companyInfo.name }}</h3>
        <p>Kami berkomitmen menyediakan produk organik berkualitas tinggi untuk mendukung gaya hidup sehat dan berkelanjutan.</p>
      </div>
      <div class="footer-section">
        <h3>Kontak Kami</h3>
        <div class="contact-item">
          <i class="icon">📧</i>
          <span>info@zaitunorganic.com</span>
        </div>
        <div class="contact-item">
          <i class="icon">📞</i>
          <span>+62 812-3456-7890</span>
        </div>
        <div class="contact-item">
          <i class="icon">📍</i>
          <span>Pekanbaru, Indonesia</span>
        </div>
      </div>

      <div class="footer-section">
        <h3>Layanan</h3>
        <a v-for="service in services" 
           :key="service" 
           @click="linkClicked(service)">{{ service }}</a>
      </div>
      <div class="footer-section">
        <h3>Ikuti Kami</h3>
        <div class="social-links">
          <a href="https://www.instagram.com/zaitunorganicmarket?igsh=MnkxNDZ3d2xhZ2Jp" target="_blank" class="social-link">
            <i class="social-icon">📷</i>
            <span>@zaitunorganicmarket</span>
          </a>
          <a href="https://id.shp.ee/Q771Hgm" target="_blank" class="social-link">
            <i class="social-icon">🛒</i>
            <span>Shopee Store</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} {{ companyInfo.name }}. Semua hak dilindungi undang-undang.</p>
    </div>
  </footer>
</template>

<script>
import { ref, computed } from 'vue'
import { companyInfo } from '../data/products'

export default {
  name: 'FooterComponent',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    const services = ref([
      'Bantuan Pelanggan',
      'Kebijakan Pengembalian',
      'Cara Pemesanan',
      'FAQ'
    ])

    const linkClicked = (linkText) => {
      alert(`Navigasi ke ${linkText} akan segera tersedia!`)
    }

    return {
      currentYear,
      companyInfo,
      services,
      linkClicked
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 3rem 2rem 1rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  text-align: left;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #4CAF50;
  font-size: 1.2rem;
}

.footer-section p, 
.footer-section a {
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #4CAF50;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  color: #95a5a6;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>