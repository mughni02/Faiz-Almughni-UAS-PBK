<script setup>
import { computed, onMounted, ref, onUnmounted} from 'vue';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';
import ProductCard from '../components/ProductCard.vue';
import { RouterLink } from 'vue-router';

const productStore = useProductStore();
const cartStore = useCartStore();
const { products } = storeToRefs(productStore);

// State untuk mengelola modal detail (DITAMBAHKAN)
const isDetailModalOpen = ref(false);
const selectedProduct = ref(null);

// --- State untuk Slider "Mengapa Memilih Kami" ---
const currentSlide = ref(0);
const features = ref([
  {
    title: '100% Organik',
    description: 'Semua produk kami diproduksi tanpa pestisida, herbisida, atau bahan kimia berbahaya. Murni alami dari alam untuk kesehatan keluarga Anda.',
    icon: 'M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M16.5,8.5A1.5,1.5 0 0,1 15,7A1.5,1.5 0 0,1 16.5,5.5A1.5,1.5 0 0,1 18,7A1.5,1.5 0 0,1 16.5,8.5M12,2C14.75,2 15.09,2 16.17,2.07C17.23,2.14 17.8,2.35 18.23,2.5C18.8,2.69 19.2,2.94 19.6,3.34C20,3.74 20.26,4.14 20.45,4.7C20.6,5.15 20.82,5.72 20.88,6.77C20.95,7.86 21,8.19 21,11V13C21,15.81 20.95,16.14 20.88,17.23C20.82,18.28 20.6,18.85 20.45,19.3C20.26,19.86 20,20.26 19.6,20.66C19.2,21.06 18.8,21.31 18.23,21.5C17.8,21.65 17.23,21.86 16.17,21.93C15.09,22 14.75,22 12,22C9.25,22 8.91,22 7.83,21.93C6.77,21.86 6.2,21.65 5.77,21.5C5.2,21.31 4.8,21.06 4.4,20.66C4,20.26 3.74,19.86 3.55,19.3C3.4,18.85 3.18,18.28 3.12,17.23C3.05,16.14 3,15.81 3,13V11C3,8.19 3.05,7.86 3.12,6.77C3.18,5.72 3.4,5.15 3.55,4.7C3.74,4.14 4,3.74 4.4,3.34C4.8,2.94 5.2,2.69 5.77,2.5C6.2,2.35 6.77,2.14 7.83,2.07C8.91,2 9.25,2 12,2Z'
  },
  {
    title: 'Kualitas Terjamin',
    description: 'Setiap produk melewati proses seleksi dan pengujian ketat untuk memastikan Anda mendapatkan kualitas dan manfaat terbaik dari alam.',
    icon: 'M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H16A2,2 0 0,1 18,4V9H20A2,2 0 0,1 22,11V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M16,4V11H18V16H20V11L18,9V4H16M4,4V16H8V11A2,2 0 0,1 10,9H12.1L10.5,10.5L13,13L15.5,10.5L14,9H16V4H4Z'
  },
  {
    title: 'Dukung Petani Lokal',
    description: 'Dengan membeli produk kami, Anda turut serta memberdayakan para petani lokal dan mendukung praktik pertanian yang berkelanjutan di Indonesia.',
    icon: 'M12,12A3,3 0 0,0 9,15A3,3 0 0,0 12,18A3,3 0 0,0 15,15A3,3 0 0,0 12,12M12,20C15.31,20 18,17.31 18,14C18,10.69 15.31,8 12,8C8.69,8 6,10.69 6,14C6,17.31 8.69,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
  }
]);
let slideInterval;

// Fungsi untuk pindah slide
function goToSlide(index) {
  currentSlide.value = index;
}

// Otomatis pindah slide setiap 5 detik
function startSlider() {
  slideInterval = setInterval(() => {
    const nextSlide = (currentSlide.value + 1) % features.value.length;
    goToSlide(nextSlide);
  }, 5000);
}

onMounted(() => {
  productStore.fetchProducts();
  startSlider();
});

// Hentikan interval saat komponen dihancurkan untuk mencegah memory leak
onUnmounted(() => {
  clearInterval(slideInterval);
});

// Menampilkan 4 produk unggulan saja
const featuredProducts = computed(() => products.value.slice(0, 4));

function handleAddToCart(product) {
  cartStore.addToCart(product);
  alert(`${product.name} telah ditambahkan ke keranjang!`);
}

// Fungsi untuk membuka modal detail (DITAMBAHKAN)
function showDetails(product) {
  selectedProduct.value = product;
  isDetailModalOpen.value = true;
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1 class="hero-title">Kebaikan Alam di Setiap Produk</h1>
        <p class="hero-subtitle">Temukan produk organik berkualitas tinggi untuk gaya hidup sehat Anda, langsung dari sumbernya.</p>
        <RouterLink to="/products" class="hero-button">Belanja Sekarang</RouterLink>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-section">
      <div class="section-container">
        <h2 class="section-title">Produk Unggulan Kami</h2>
        <div v-if="productStore.isLoading" class="loading-indicator">Memuat produk...</div>
        <div v-else class="product-grid">
          <!-- DIUBAH: Tambahkan @view-details untuk menangkap event -->
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
            @view-details="showDetails"
          />
        </div>
      </div>
    </section>

    <!-- DITAMBAHKAN: Seksi "Mengapa Memilih Kami" -->
    <section class="why-us-section">
      <div class="section-container">
        <h2 class="section-title">Mengapa Memilih ZaitunOrganic?</h2>
        <div class="slider-card">
          <div v-for="(feature, index) in features" :key="index">
            <div v-if="index === currentSlide" class="slide-content">
              <div class="icon-wrapper">
                <svg viewBox="0 0 24 24" class="feature-icon">
                  <path :d="feature.icon" />
                </svg>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
          <div class="slider-dots">
            <button
              v-for="(feature, index) in features"
              :key="`dot-${index}`"
              @click="goToSlide(index)"
              :class="{ active: index === currentSlide }"
              class="dot"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- DITAMBAHKAN: Blok HTML untuk Modal Detail Produk -->
    <div v-if="isDetailModalOpen && selectedProduct" class="modal-overlay" @click.self="isDetailModalOpen = false">
      <div class="modal-content">
        <button @click="isDetailModalOpen = false" class="close-button">&times;</button>
        <img :src="selectedProduct.imageUrl" :alt="selectedProduct.name" class="detail-image">
        <h3 class="detail-title">{{ selectedProduct.name }}</h3>
        <p class="detail-price">Rp {{ selectedProduct.price.toLocaleString('id-ID') }}</p>
        <p class="detail-description">{{ selectedProduct.description }}</p>
        <button @click="handleAddToCart(selectedProduct); isDetailModalOpen = false" class="add-to-cart-modal-btn">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Gaya untuk halaman dan grid produk */
.home-page { width: 100%; }
.hero-section { position: relative; display: flex; justify-content: center; align-items: center; text-align: center; color: white; height: 60vh; min-height: 400px; }
.hero-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop'); background-size: cover; background-position: center; filter: brightness(0.5); z-index: 1; }
.hero-content { position: relative; z-index: 2; max-width: 800px; padding: 2rem; }
.hero-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin: 0; }
.hero-subtitle { font-size: 1.25rem; margin-top: 1rem; max-width: 600px; margin-left: auto; margin-right: auto; }
.hero-button { display: inline-block; margin-top: 2rem; padding: 0.8rem 2rem; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 0.375rem; font-weight: 600; transition: background-color 0.3s; }
.hero-button:hover { background-color: #45a049; }
.featured-section { padding: 4rem 2rem; }
.section-container { max-width: 1280px; margin: 0 auto; }
.section-title { font-size: 2rem; font-weight: 700; color: #1f2937; text-align: center; margin-bottom: 2.5rem; }
.loading-indicator { text-align: center; padding: 2rem; color: #6b7280; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }

/* DITAMBAHKAN: CSS untuk Modal Detail */
/* DITAMBAHKAN: CSS untuk Seksi "Mengapa Memilih Kami" */
.why-us-section {
  padding: 4rem 2rem;
  background-color: #ffffff; /* Latar belakang putih untuk kontras */
}
.slider-card {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.slide-content {
  animation: fadeIn 0.8s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem auto;
  background-color: #eaf3ea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.feature-icon {
  width: 40px;
  height: 40px;
  fill: var(--primary-color);
}
.feature-title {
  font-family: 'Lora', serif;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}
.feature-description {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
}
.slider-dots {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #d1d5db;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}
.dot.active {
  background-color: var(--primary-color);
  transform: scale(1.2);
}
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
  padding: 1rem;
}
.modal-content {
  background-color: white; padding: 2rem; border-radius: 8px;
  width: 90%; max-width: 600px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative; max-height: 90vh; overflow-y: auto;
}
.close-button {
  position: absolute; top: 10px; right: 15px;
  background: none; border: none; font-size: 2rem; cursor: pointer; color: #aaa;
  line-height: 1;
}
.close-button:hover { color: #333; }
.detail-image { width: 100%; height: 250px; object-fit: cover; border-radius: 4px; margin-bottom: 1.5rem; }
.detail-title { margin-top: 0; font-size: 2rem; color: #1f2937; }
.detail-price { font-size: 1.5rem; color: #4CAF50; font-weight: 500; margin: 0.5rem 0 1.5rem 0; }
.detail-description { font-size: 1rem; color: #374151; line-height: 1.6; margin-bottom: 2rem; }
.add-to-cart-modal-btn {
  width: 100%; background-color: #4CAF50; color: white; border: none;
  padding: 0.75rem 1.2rem; border-radius: 0.375rem; font-size: 1rem;
  font-weight: 600; cursor: pointer; transition: background-color 0.3s;
}
.add-to-cart-modal-btn:hover { background-color: #45a049; }
</style>
