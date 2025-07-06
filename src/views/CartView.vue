<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const { items, subtotal, shippingCost, grandTotal } = storeToRefs(cartStore);

const isProcessing = ref(false);
const shippingDetails = ref({
  recipientName: authStore.user?.name || '',
  phone: '',
  address: '',
  city: '',
  postalCode: ''
});

async function handlePlaceOrder() {
  // Validasi sederhana
  if (!shippingDetails.value.recipientName || !shippingDetails.value.address || !shippingDetails.value.phone) {
    alert('Harap isi semua kolom alamat yang wajib diisi.');
    return;
  }

  isProcessing.value = true;
  const success = await cartStore.checkout(shippingDetails.value);
  isProcessing.value = false;

  if (success) {
    alert('Pesanan Anda telah berhasil dibuat!');
    router.push('/orders');
  }
}
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Checkout</h1>
    <form v-if="items.length > 0" class="checkout-layout" @submit.prevent="handlePlaceOrder">
      <!-- Kolom Alamat Pengiriman -->
      <div class="shipping-form">
        <h2 class="section-title">Alamat Pengiriman</h2>
        <div class="form-group">
          <label for="recipientName">Nama Penerima</label>
          <input id="recipientName" type="text" v-model="shippingDetails.recipientName" required class="form-input">
        </div>
        <div class="form-group">
          <label for="phone">Nomor Telepon</label>
          <input id="phone" type="tel" v-model="shippingDetails.phone" required class="form-input">
        </div>
        <div class="form-group">
          <label for="address">Alamat Lengkap</label>
          <textarea id="address" rows="4" v-model="shippingDetails.address" required class="form-input"></textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="city">Kota/Kabupaten</label>
            <input id="city" type="text" v-model="shippingDetails.city" required class="form-input">
          </div>
          <div class="form-group">
            <label for="postalCode">Kode Pos</label>
            <input id="postalCode" type="text" v-model="shippingDetails.postalCode" required class="form-input">
          </div>
        </div>
      </div>

      <!-- Kolom Ringkasan Pesanan -->
      <aside class="order-summary-section">
        <div class="summary-card">
          <h2 class="section-title">Ringkasan Pesanan</h2>
          <ul class="item-list">
            <li v-for="item in items" :key="item.productId" class="summary-item">
              <span>{{ item.name }} ({{ item.quantity }}x)</span>
              <span>Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</span>
            </li>
          </ul>
          <div class="summary-details">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>Rp {{ subtotal.toLocaleString('id-ID') }}</span>
            </div>
            <div class="summary-row">
              <span>Biaya Pengiriman</span>
              <span>Rp {{ shippingCost.toLocaleString('id-ID') }}</span>
            </div>
            <div class="summary-row total-row">
              <span>Total Pembayaran</span>
              <span>Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
            </div>
          </div>
          <button type="submit" :disabled="isProcessing" class="place-order-button button button-primary">
            {{ isProcessing ? 'Memproses...' : 'Buat Pesanan' }}
          </button>
        </div>
      </aside>
    </form>
    <div v-else class="empty-cart-container">
        <p>Keranjang Anda kosong. Tidak ada yang bisa di-checkout.</p>
    </div>
  </div>
</template>

<style scoped>
.page-container { max-width: 1280px; margin: 0 auto; padding: 2rem 1.5rem; }
.page-title { font-family: 'Lora', serif; font-size: 2.5rem; text-align: center; margin-bottom: 3rem; }
.checkout-layout { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
@media (min-width: 1024px) { .checkout-layout { grid-template-columns: 1.5fr 1fr; } }

.section-title { font-family: 'Lora', serif; font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; }
.shipping-form { background-color: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); }
.form-group { margin-bottom: 1.25rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 0.5rem; }
.form-input { width: 100%; padding: 0.8rem 1rem; border: 1px solid var(--border-color); border-radius: 8px; font-size: 1rem; }
.form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2); }
textarea.form-input { resize: vertical; }

.summary-card { background-color: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); position: sticky; top: 120px; }
.item-list { list-style: none; padding: 0 0 1.5rem 0; margin: 0 0 1.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem; }
.summary-item { display: flex; justify-content: space-between; font-size: 0.9rem; }
.summary-details { display: flex; flex-direction: column; gap: 1rem; }
.summary-row { display: flex; justify-content: space-between; }
.total-row { font-weight: 700; font-size: 1.25rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); }
.place-order-button { width: 100%; margin-top: 2rem; }
.place-order-button:disabled { background-color: #9ca3af; transform: none; box-shadow: none; cursor: not-allowed; }
.empty-cart-container { text-align: center; padding: 2rem; }
</style>
