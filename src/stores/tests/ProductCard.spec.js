import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';

describe('ProductCard.vue', () => {
  const product = {
    id: 1,
    name: 'Minyak Zaitun Extra Virgin',
    price: 150000,
    imageUrl: 'https://example.com/image.jpg',
    description: 'Deskripsi produk sangat panjang dan informatif.'
  };

  it('emits "add-to-cart" with product and quantity', async () => {
    const wrapper = mount(ProductCard, {
      props: { product }
    });

    // Tambah jumlah 2x (jadi 3)
    await wrapper.findAll('button').at(1)?.trigger('click'); // +
    await wrapper.findAll('button').at(1)?.trigger('click'); // +

    await wrapper.find('.add-to-cart-btn').trigger('click');

    const emitted = wrapper.emitted('add-to-cart');

    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toEqual(product);       // produk
    expect(emitted[0][1]).toBe(3);                // kuantitas
  });
});
