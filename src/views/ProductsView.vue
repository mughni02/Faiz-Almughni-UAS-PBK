<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();
const cartStore = useCartStore();
const { products, isLoading } = storeToRefs(productStore);

// State untuk mengelola modal detail
const isDetailModalOpen = ref(false);
const selectedProduct = ref(null);

onMounted(() => {
  productStore.fetchProducts();
});

function handleAddToCart(product) {
  cartStore.addToCart(product);
  alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

// Fungsi untuk membuka modal saat event 'view-details' diterima
function showDetails(product) {
  selectedProduct.value = product;
  isDetailModalOpen.value = true;
}
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Semua Produk Organik Kami</h1>
    
    <div v-if="isLoading" class="loading-indicator">
      Memuat produk, harap tunggu...
    </div>

    <div v-else class="product-grid">
      <!-- 
        PENTING: Tambahkan @view-details="showDetails" di sini 
        untuk menangkap sinyal dari ProductCard.
      -->
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
        @view-details="showDetails" 
      />
    </div>

    <!-- 
      PENTING: Tambahkan blok HTML ini untuk modal.
      Modal ini akan muncul saat isDetailModalOpen bernilai true.
    -->
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
.page-container { max-width: 1280px; margin: 0 auto; padding: 2rem; }
.page-title { text-align: center; font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 2.5rem; }
.loading-indicator { text-align: center; padding: 3rem; font-size: 1.25rem; color: #6b7280; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }

/* PENTING: Tambahkan CSS untuk Modal Detail */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}
.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #aaa;
  line-height: 1;
}
.close-button:hover { color: #333; }

.detail-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}
.detail-title { margin-top: 0; font-size: 2rem; color: #1f2937; }
.detail-price { font-size: 1.5rem; color: #4CAF50; font-weight: 500; margin: 0.5rem 0 1.5rem 0; }
.detail-description { font-size: 1rem; color: #374151; line-height: 1.6; margin-bottom: 2rem; }

.add-to-cart-modal-btn {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.2rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}
.add-to-cart-modal-btn:hover { background-color: #45a049; }
</style>
