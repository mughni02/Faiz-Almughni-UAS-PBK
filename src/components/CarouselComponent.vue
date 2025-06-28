<template>
  <section class="carousel-section section" id="tentang">
    <h2 class="section-title">Mengapa Memilih {{ companyInfo.name }}?</h2>
    <div class="carousel-container" 
         @mouseenter="stopAutoPlay" 
         @mouseleave="startAutoPlay">
      <div class="carousel-wrapper" 
           :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(slide, index) in slides" 
             :key="index" 
             class="carousel-slide">
          <div class="card-icon">{{ slide.icon }}</div>
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.description }}</p>
        </div>
      </div>
      <div class="carousel-dots">
        <div v-for="(slide, index) in slides" 
             :key="index"
             class="dot" 
             :class="{ active: currentSlide === index }"
             @click="changeSlide(index)">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { carouselData, companyInfo } from '../data/products'

export default {
  name: 'CarouselComponent',
  setup() {
    const currentSlide = ref(0)
    const autoPlayInterval = ref(null)
    const slides = ref(carouselData)
    
    const changeSlide = (index) => {
      currentSlide.value = index
    }

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }

    const startAutoPlay = () => {
      autoPlayInterval.value = setInterval(nextSlide, 5000)
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value)
      }
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return {
      currentSlide,
      slides,
      companyInfo,
      changeSlide,
      startAutoPlay,
      stopAutoPlay
    }
  }
}
</script>

<style scoped>
.carousel-section {
  padding: 5rem 2rem;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  background: white;
  padding: 3rem;
  text-align: center;
}

.carousel-slide h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.carousel-slide p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.card-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #4CAF50;
  transform: scale(1.2);
}

.dot:hover {
  background: #4CAF50;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .carousel-slide {
    padding: 2rem 1rem;
  }
  
  .carousel-slide h3 {
    font-size: 1.5rem;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>