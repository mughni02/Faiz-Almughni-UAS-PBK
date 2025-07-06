import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from '../ProductCard.vue'; // Asumsi Anda membuat komponen ini

// Konten dummy untuk ProductCard.vue:
/*
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="font-semibold text-lg">{{ product.name }}</h3>
      <p class="text-gray-600">Rp {{ product.price.toLocaleString('id-ID') }}</p>
      <button @click="$emit('add-to-cart', product)" class="mt-4 w-full bg-green-600 text-white py-2 rounded-md">
        Tambah ke Keranjang
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({ product: { type: Object, required: true } });
defineEmits(['add-to-cart']);
</script>
*/

describe('ProductCard.vue', () => {
    it('renders product details correctly', () => {
        const product = { id: 1, name: 'Minyak Zaitun Extra Virgin', price: 150000, imageUrl: 'url-gambar' };

        const wrapper = mount(ProductCard, {
            props: { product }
        });

        expect(wrapper.find('h3').text()).toBe('Minyak Zaitun Extra Virgin');
        expect(wrapper.find('p').text()).toContain('150.000');
        expect(wrapper.find('img').attributes('src')).toBe('url-gambar');
    });

    it('emits "add-to-cart" event with product payload on button click', async () => {
        const product = { id: 1, name: 'Minyak Zaitun Extra Virgin', price: 150000, imageUrl: 'url-gambar' };

        const wrapper = mount(ProductCard, {
            props: { product }
        });

        await wrapper.find('button').trigger('click');

        // Cek apakah event di-emit
        expect(wrapper.emitted()).toHaveProperty('add-to-cart');
        // Cek apakah payload-nya benar
        expect(wrapper.emitted('add-to-cart')[0][0]).toEqual(product);
    });
});