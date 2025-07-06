import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore();
  const items = ref([]);

  // BIAYA PENGIRIMAN TETAP (FLAT RATE)
  const shippingCost = ref(15000);

  const subtotal = computed(() => items.value.reduce((total, item) => total + (item.price * item.quantity), 0));
  const grandTotal = computed(() => subtotal.value + shippingCost.value);
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));

  const userCartKey = computed(() => authStore.isAuthenticated ? `cart_${authStore.user.id}` : null);
  function saveCartToLocalStorage() { if (userCartKey.value) { localStorage.setItem(userCartKey.value, JSON.stringify(items.value)); } }
  watch(items, saveCartToLocalStorage, { deep: true });

  function loadCartForUser() { if (userCartKey.value) { const savedCart = localStorage.getItem(userCartKey.value); items.value = savedCart ? JSON.parse(savedCart) : []; } }
  function clearCart() { items.value = []; saveCartToLocalStorage(); }
  
  function addToCart(product) {
    if (!authStore.isAuthenticated) { alert("Silakan login terlebih dahulu."); return; }
    const existingItem = items.value.find(item => item.productId === product.id);
    if (existingItem) { existingItem.quantity++; } 
    else { items.value.push({ productId: product.id, name: product.name, price: product.price, quantity: 1 }); }
  }

  function saveCartToLocalStorage() {
    if (userCartKey.value) {
      localStorage.setItem(userCartKey.value, JSON.stringify(items.value));
    }
  }

  watch(items, saveCartToLocalStorage, { deep: true });

  function loadCartForUser() {
    if (userCartKey.value) {
      const savedCart = localStorage.getItem(userCartKey.value);
      items.value = savedCart ? JSON.parse(savedCart) : [];
    }
  }

  function clearCart() {
    items.value = [];
    saveCartToLocalStorage(); // Pastikan localStorage juga dibersihkan
  }

  function addToCart(product) {
    if (!authStore.isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk menambahkan item ke keranjang.");
      return;
    }
    const existingItem = items.value.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.productId !== productId);
  }

  function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity, 10);
    const itemToUpdate = items.value.find(item => item.productId === productId);
    if (itemToUpdate) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        itemToUpdate.quantity = quantity;
      }
    }
  }

  /**
   * BARU: Fungsi untuk memproses checkout.
   */
  async function checkout(shippingDetails) {
    if (items.value.length === 0 || !authStore.isAuthenticated) return false;

    // Siapkan data pesanan baru
    const newOrder = {
      userId: authStore.user.id,
      date: new Date().toISOString(),
      subtotal: subtotal.value,
      shippingCost: shippingCost.value,
      total: grandTotal.value, // Gunakan grandTotal
      status: 'Baru',
      shippingAddress: shippingDetails, // Simpan alamat pengiriman
      items: JSON.parse(JSON.stringify(items.value))
    };

    try {
      // Kirim data pesanan ke server API
      await axios.post('http://localhost:3000/orders', newOrder);
      
      // Jika berhasil, kosongkan keranjang
      clearCart();
      
      return true; // Kembalikan true untuk menandakan sukses
    } catch (error) {
      console.error("Gagal saat proses checkout:", error);
      alert("Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.");
      return false; // Kembalikan false untuk menandakan gagal
    }
  }

  return { 
    items, subtotal, shippingCost, grandTotal, totalItems,
    addToCart, removeFromCart, updateQuantity,
    loadCartForUser, clearCart, checkout
  };
});
