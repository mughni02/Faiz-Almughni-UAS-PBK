import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const isLoading = ref(false);

  async function fetchProducts() {
    isLoading.value = true;
    try {
      const response = await axios.get(API_URL);
      products.value = response.data;
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // CREATE
  async function addProduct(newProduct) {
    try {
      const response = await axios.post(API_URL, newProduct);
      // Tambahkan produk baru ke state atau fetch ulang semua data
      await fetchProducts(); 
    } catch (error) {
      console.error('Gagal menambah produk:', error);
    }
  }

  // UPDATE
  async function updateProduct(productToUpdate) {
    try {
      const response = await axios.put(`${API_URL}/${productToUpdate.id}`, productToUpdate);
      await fetchProducts();
    } catch (error) {
      console.error('Gagal mengupdate produk:', error);
    }
  }

  // DELETE
  async function deleteProduct(productId) {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      await fetchProducts();
    } catch (error) {
      console.error('Gagal menghapus produk:', error);
    }
  }

  return { products, isLoading, fetchProducts, addProduct, updateProduct, deleteProduct };
});
