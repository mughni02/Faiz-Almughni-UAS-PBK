<template>
  <section class="cards-section section" id="produk">
    <h2 class="section-title">Kategori Produk Unggulan</h2>
    <div class="cards-container">
      <transition-group name="slide" tag="div" style="display: contents;">
        <div v-for="(card, index) in cards" 
             :key="card.id"
             class="card"
             @click="cardClicked(card)"
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="card-icon">{{ card.icon }}</div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <div class="card-footer">
            <span class="product-count">{{ card.products }} produk</span>
            <div v-if="card.featured" class="featured-badge">
              ⭐ Produk Unggulan
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { productCategories } from '../data/products'

export default {
  name: 'CardsComponent',
  setup() {
    const cards = ref(productCategories)

    const cardClicked = (card) => {
      alert(`Anda tertarik dengan ${card.title}! Fitur detail produk akan segera hadir.`)
    }

    return {
      cards,
      cardClicked
    }
  }
}
</script>

<style scoped>
.cards-section {
  padding: 5rem 2rem;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.product-count {
  color: #999;
  font-size: 0.9rem;
}

.featured-badge {
  color: #4CAF50;
  font-weight: bold;
  font-size: 0.9rem;
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100px);
  opacity: 0;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .card {
    padding: 1.5rem;
  }
}
</style>