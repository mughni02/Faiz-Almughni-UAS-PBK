<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <div class="logo" @click="$emit('navigate', 'home')">
        {{ companyInfo.name }}
      </div>
      <ul class="nav-links">
        <li>
          <a @click="$emit('navigate', 'home')" 
             :class="{ active: activeSection === 'home' }">
            Beranda
          </a>
        </li>
        <li>
          <a @click="$emit('navigate', 'produk')" 
             :class="{ active: activeSection === 'produk' }">
            Produk
          </a>
        </li>
        <li>
          <a @click="$emit('navigate', 'tentang')" 
             :class="{ active: activeSection === 'tentang' }">
            Tentang
          </a>
        </li>
        <li>
          <a @click="$emit('navigate', 'kontak')" 
             :class="{ active: activeSection === 'kontak' }">
            Kontak
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { companyInfo } from '../data/products'

export default {
  name: 'NavbarComponent',
  props: {
    activeSection: {
      type: String,
      default: 'home'
    },
    isScrolled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['navigate'],
  setup() {
    return {
      companyInfo
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
}

.nav-links a:hover,
.nav-links a.active {
  color: #4CAF50;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>