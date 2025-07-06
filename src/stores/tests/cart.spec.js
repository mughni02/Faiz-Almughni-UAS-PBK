import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../cart';

describe('Cart Store', () => {
  beforeEach(() => {
    // Buat instance Pinia baru untuk isolasi tes
    setActivePinia(createPinia());
  });

  it('adds an item to the cart', () => {
    const store = useCartStore();
    expect(store.items).toHaveLength(0);

    const product = { id: 1, name: 'Minyak Zaitun', price: 150000 };
    store.addToCart(product);

    expect(store.items).toHaveLength(1);
    expect(store.items[0].productId).toBe(1);
    expect(store.items[0].quantity).toBe(1);
  });

  it('increments quantity for existing item', () => {
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

    expect(store.totalPrice).toBe(270000);
  });
});