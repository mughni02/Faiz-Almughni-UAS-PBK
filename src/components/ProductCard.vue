<script setup>
// ... (script setup Anda tetap sama)
import { computed } from 'vue';
const props = defineProps({ product: { type: Object, required: true } });
defineEmits(['add-to-cart', 'view-details']);
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
        <div class="button-group">
          <button @click="$emit('view-details', product)" class="details-btn">Detail</button>
          <button @click="$emit('add-to-cart', product)" class="add-to-cart-btn">Pesan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 12px; /* Lebih bulat */
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
}

.product-image-container {
  width: 100%;
  height: 220px;
}
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-family: 'Lora', serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.product-description {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.product-footer { margin-top: auto; }
.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.button-group { display: flex; gap: 0.5rem; }
.details-btn, .add-to-cart-btn {
  flex-grow: 1;
  border: 1px solid var(--border-color);
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.details-btn {
  background-color: #ffffff;
  color: var(--text-color);
}
.details-btn:hover {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.add-to-cart-btn {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
.add-to-cart-btn:hover {
  background-color: #4a6f4b; /* Sedikit lebih gelap saat hover */
  border-color: #4a6f4b;
  transform: translateY(-2px);
}
</style>
