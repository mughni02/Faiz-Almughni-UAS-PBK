<template>
  <div id="app">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      Memuat ZaitunOrganic...
    </div>

    <!-- Main App -->
    <div v-else>
      <NavbarComponent 
        :active-section="activeSection" 
        :is-scrolled="isScrolled"
        @navigate="scrollToSection"
      />
      
      <HeroComponent @navigate="scrollToSection" />
      
      <CarouselComponent />
      
      <CardsComponent />
      
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavbarComponent from './components/NavbarComponent.vue'
import HeroComponent from './components/HeroComponent.vue'
import CarouselComponent from './components/CarouselComponent.vue'
import CardsComponent from './components/CardsComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useScroll } from './composables/useScroll'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    HeroComponent,
    CarouselComponent,
    CardsComponent,
    FooterComponent
  },
  setup() {
    const isLoading = ref(true)
    const { activeSection, isScrolled, scrollToSection } = useScroll()

    onMounted(() => {
      // Simulate loading
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    })

    return {
      isLoading,
      activeSection,
      isScrolled,
      scrollToSection
    }
  }
}
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #4CAF50;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-right: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>