import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '../router';
// PENTING: Import store keranjang
import { useCartStore } from './cart';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  function setLogin(userData) {
    const cartStore = useCartStore(); // Dapatkan instance cart store
    
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));

    // PENTING: Panggil fungsi untuk memuat keranjang milik pengguna yang baru login
    cartStore.loadCartForUser();

    if (userData.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
  }

  function logout() {
    const cartStore = useCartStore(); // Dapatkan instance cart store

    user.value = null;
    localStorage.removeItem('user');

    // PENTING: Panggil fungsi untuk mengosongkan keranjang di memori
    cartStore.clearCart();

    router.push('/login');
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    setLogin,
    logout
  };
});
