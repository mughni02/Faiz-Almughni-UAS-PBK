import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', () => {
  // 1. STATE & STORE DEPENDENCIES
  const authStore = useAuthStore();
  const items = ref([]);
  const shippingCost = ref(15000); // Biaya pengiriman tetap

  // 2. GETTERS (COMPUTED PROPERTIES)
  // Menghitung subtotal dari semua item
  const subtotal = computed(() => 
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  // Menghitung total keseluruhan (subtotal + ongkir)
  const grandTotal = computed(() => subtotal.value + shippingCost.value);

  // Menghitung total jumlah item
  const totalItems = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  // Membuat kunci unik untuk localStorage berdasarkan ID pengguna
  const userCartKey = computed(() => 
    authStore.isAuthenticated ? `cart_${authStore.user.id}` : null
  );

  // 3. FUNGSI INTERNAL (HELPERS)
  // Menyimpan keranjang ke localStorage
  function saveCartToLocalStorage() {
    if (userCartKey.value) {
      localStorage.setItem(userCartKey.value, JSON.stringify(items.value));
    }
  }

  // Mengawasi perubahan pada 'items' dan otomatis menyimpan ke localStorage
  watch(items, saveCartToLocalStorage, { deep: true });

  // 4. ACTIONS (FUNGSI UTAMA)
  // Memuat keranjang dari localStorage untuk pengguna yang login
  function loadCartForUser() {
    if (userCartKey.value) {
      const savedCart = localStorage.getItem(userCartKey.value);
      items.value = savedCart ? JSON.parse(savedCart) : [];
    }
  }

  // Mengosongkan keranjang (saat logout atau checkout berhasil)
  function clearCart() {
    items.value = [];
    saveCartToLocalStorage(); // Pastikan localStorage juga dibersihkan
  }

  // Menambah produk ke keranjang (dengan jumlah spesifik)
  function addToCart(product, quantity = 1) {
    if (!authStore.isAuthenticated) {
      console.warn("Pengguna belum login. Item tidak ditambahkan.");
      alert("Silakan login terlebih dahulu untuk menambahkan item.");
      return false; // Gagal
    }
    const existingItem = items.value.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: quantity
      });
    }
    return true; // Sukses
  }

  // Menghapus item dari keranjang
  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.productId !== productId);
  }

  // Mengubah jumlah item di keranjang
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

  // Memproses checkout dan membuat pesanan baru
  async function checkout(shippingDetails) {
    if (items.value.length === 0 || !authStore.isAuthenticated) return false;
    
    const newOrder = {
      userId: authStore.user.id,
      date: new Date().toISOString(),
      subtotal: subtotal.value,
      shippingCost: shippingCost.value,
      total: grandTotal.value,
      status: 'Baru',
      shippingAddress: shippingDetails,
      items: JSON.parse(JSON.stringify(items.value))
    };

    try {
      await axios.post('http://localhost:3000/orders', newOrder);
      clearCart();
      return true;
    } catch (error) {
      console.error("Gagal saat proses checkout:", error);
      alert("Terjadi kesalahan saat membuat pesanan.");
      return false;
    }
  }

  // 5. INISIALISASI
  // Langsung muat keranjang jika pengguna sudah login saat store ini pertama kali digunakan
  if (authStore.isAuthenticated) {
    loadCartForUser();
  }

  // 6. RETURN
  // Kembalikan semua state dan action yang perlu diakses oleh komponen lain
  return { 
    items, 
    subtotal, 
    shippingCost, 
    grandTotal, 
    totalItems,
    addToCart, 
    removeFromCart, 
    updateQuantity,
    loadCartForUser, 
    clearCart, 
    checkout
  };
});
