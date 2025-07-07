import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../cart';

// PENTING: Lakukan "mocking" pada authStore.
// Ini memberitahu Vitest untuk menggunakan versi palsu dari authStore
// setiap kali cart.js mencoba mengimpornya.
vi.mock('../auth', () => ({
  useAuthStore: () => ({
    // Kita anggap pengguna selalu login selama tes ini berjalan
    isAuthenticated: true,
    user: { id: 1 } // Sediakan ID pengguna palsu
  })
}));

describe('Cart Store', () => {
  beforeEach(() => {
    // Buat instance Pinia baru untuk setiap tes agar terisolasi
    setActivePinia(createPinia());
    // Bersihkan localStorage untuk memastikan tidak ada sisa data dari tes lain
    localStorage.clear();
  });

  it('adds a new item to the cart', () => {
    const store = useCartStore();
    const product = { id: 1, name: 'Minyak Zaitun', price: 150000 };
    
    store.addToCart(product);

    expect(store.items).toHaveLength(1);
    expect(store.items[0].productId).toBe(1);
    expect(store.items[0].quantity).toBe(1);
  });

  it('increments quantity for an existing item', () => {
    const store = useCartStore();
    const product = { id: 1, name: 'Minyak Zaitun', price: 150000 };

    store.addToCart(product); // Tambah pertama kali
    store.addToCart(product); // Tambah produk yang sama lagi

    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(2);
  });

  it('calculates total price correctly', () => {
    const store = useCartStore();
    const product1 = { id: 1, name: 'Minyak Zaitun', price: 150000 };
    const product2 = { id: 2, name: 'Madu Hutan', price: 120000 };

    store.addToCart(product1);
    store.addToCart(product2);

    // subtotal (150000 + 120000) = 270000
    expect(store.subtotal).toBe(270000);
  });

  it('updates an item quantity correctly', () => {
    const store = useCartStore();
    const product = { id: 1, name: 'Madu Hutan', price: 120000 };
    store.addToCart(product);

    store.updateQuantity(1, 5);
    expect(store.items[0].quantity).toBe(5);
  });

  it('removes an item if quantity is updated to 0', () => {
    const store = useCartStore();
    const product = { id: 1, name: 'Madu Hutan', price: 120000 };
    store.addToCart(product);

    store.updateQuantity(1, 0);
    expect(store.items).toHaveLength(0);
  });
});
