<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart', 'view-details']);

// State lokal untuk melacak jumlah
const quantity = ref(1);

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

// Fungsi untuk menambah ke keranjang, sekarang dengan jumlah yang spesifik
function handleAddToCart() {
  // Kita kirim produk dan jumlahnya ke komponen induk
  emit('add-to-cart', props.product, quantity.value);
}

const shortDescription = computed(() => {
  if (props.product.description && props.product.description.length > 80) {
    return props.product.description.substring(0, 80) + '...';
  }
  return props.product.description;
});
</script>

<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ shortDescription }}</p>
      <div class="product-footer">
        <p class="product-price">Rp {{ product.price.toLocaleString('id-ID') }}</p>
        
        <!-- DITAMBAHKAN: Kontrol Jumlah (Quantity) -->
        <div class="quantity-control">
          <button @click="decreaseQuantity" class="quantity-btn">-</button>
          <span class="quantity-display">{{ quantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn">+</button>
        </div>

        <div class="button-group">
          <button @click="$emit('view-details', product)" class="details-btn">Detail</button>
          <!-- DIUBAH: Tombol pesan sekarang memanggil fungsi handleAddToCart -->
          <button @click="handleAddToCart" class="add-to-cart-btn">Pesan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... (CSS dari jawaban sebelumnya tetap sama, dengan tambahan) ... */
.product-card { border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; display:flex; flex-direction: column;}
.product-card:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07); }
.product-image-container { width: 100%; height: 220px; }
.product-image { width: 100%; height: 100%; object-fit: cover; }
.product-info { padding: 1.25rem; flex-grow:1; display:flex; flex-direction:column; }
.product-name { font-family: 'Lora', serif; font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem 0; }
.product-description { font-size: 0.9rem; color: #6c757d; line-height: 1.5; margin-bottom: 1rem; flex-grow: 1; }
.product-footer { margin-top: auto; }
.product-price { font-size: 1.25rem; font-weight: 700; color: var(--text-color); margin-bottom: 1rem; }

/* DITAMBAHKAN: CSS untuk Kontrol Jumlah */
.quantity-control {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.quantity-btn {
  width: 35px;
  height: 35px;
  border: 1px solid var(--border-color);
  background-color: #f8f9fa;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
.quantity-btn:first-child { border-radius: 8px 0 0 8px; }
.quantity-btn:last-child { border-radius: 0 8px 8px 0; }
.quantity-display {
  width: 50px;
  height: 35px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group { display: flex; gap: 0.5rem; }
.details-btn, .add-to-cart-btn { flex-grow: 1; border: 1px solid var(--border-color); padding: 0.7rem 1.2rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.details-btn { background-color: #ffffff; color: var(--text-color); }
.details-btn:hover { background-color: #f8f9fa; border-color: #dee2e6; }
.add-to-cart-btn { background-color: var(--primary-color); color: white; border-color: var(--primary-color); }
.add-to-cart-btn:hover { background-color: #4a6f4b; border-color: #4a6f4b; transform: translateY(-2px); }
</style>
