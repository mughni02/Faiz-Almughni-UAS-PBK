<template>
  <section class="hero" id="home">
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">{{ companyInfo.name }}</h1>
      <p class="hero-subtitle">{{ companyInfo.tagline }}</p>
      <p class="hero-description">{{ companyInfo.description }}</p>
      <button class="cta-button" @click="$emit('navigate', 'produk')">
        Jelajahi Produk
      </button>
    </div>
  </section>
</template>

<script>
import { companyInfo } from '../data/products'

export default {
  name: 'HeroComponent',
  emits: ['navigate'],
  setup() {
    return {
      companyInfo
    }
  }
}
</script>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://www.integraldo.bio/application/themes/integraldo/img/tutto-per-uno-stile-di-vita-etico-e-salutare-2.jpg') center/cover no-repeat;
  animation: float 20s ease-in-out infinite;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.hero-content {
  z-index: 2;
  color: #2c3e50;
  max-width: 800px;
  padding: 2rem;
  position: relative;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.3s both;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 0.4s both;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
  animation: fadeInUp 1s ease-out 0.6s both;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(76, 175, 80, 0.4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
}
</style>