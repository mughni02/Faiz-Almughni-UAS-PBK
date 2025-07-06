<script setup>
// ... (script setup Anda tetap sama)
import { onMounted, ref } from 'vue';
import { useProductStore } from '../../stores/product';
import { storeToRefs } from 'pinia';
const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);
const isModalOpen = ref(false);
const isEditing = ref(false);
const currentProduct = ref({});
onMounted(() => { productStore.fetchProducts(); });
function openAddModal() { isEditing.value = false; currentProduct.value = { name: '', category: '', price: 0, stock: 0, imageUrl: '', description: '' }; isModalOpen.value = true; }
function openEditModal(product) { isEditing.value = true; currentProduct.value = { ...product }; isModalOpen.value = true; }
async function handleSave() {
  const payload = { ...currentProduct.value, price: Number(currentProduct.value.price) || 0, stock: Number(currentProduct.value.stock) || 0 };
  if (isEditing.value) { await productStore.updateProduct(payload); } else { await productStore.addProduct(payload); }
  isModalOpen.value = false;
}
async function handleDelete(productId) { if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) { await productStore.deleteProduct(productId); } }
</script>

<template>
  <div>
    <div class="page-header">
      <h2 class="header-title">Kelola Produk</h2>
      <button @click="openAddModal" class="button button-primary">Tambah Produk</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading"><td colspan="5" class="loading-cell">Memuat produk...</td></tr>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="product-info-cell">
                <img class="product-thumbnail" :src="product.imageUrl" alt="">
                <span>{{ product.name }}</span>
              </div>
            </td>
            <td>{{ product.category }}</td>
            <td>Rp {{ product.price.toLocaleString('id-ID') }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <div class="action-buttons">
                <button @click="openEditModal(product)" class="action-btn edit-btn">Edit</button>
                <button @click="handleDelete(product.id)" class="action-btn delete-btn">Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">{{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}</h3>
        <form @submit.prevent="handleSave" class="product-form">
          <div class="form-group">
            <label for="name">Nama Produk</label>
            <input id="name" type="text" v-model="currentProduct.name" required>
          </div>
          <div class="form-group">
            <label for="description">Keterangan</label>
            <textarea id="description" rows="4" v-model="currentProduct.description" required></textarea>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label for="category">Kategori</label>
              <input id="category" type="text" v-model="currentProduct.category" required>
            </div>
            <div class="form-group">
              <label for="price">Harga</label>
              <input id="price" type="number" v-model.number="currentProduct.price" required>
            </div>
          </div>
          <div class="form-group">
            <label for="stock">Stok</label>
            <input id="stock" type="number" v-model.number="currentProduct.stock" required>
          </div>
          <div class="form-group">
            <label for="imageUrl">URL Gambar</label>
            <input id="imageUrl" type="text" v-model="currentProduct.imageUrl" required>
          </div>
          <div class="modal-actions">
            <button type="button" @click="isModalOpen = false" class="btn-cancel">Batal</button>
            <button type="submit" class="button button-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.header-title { font-family: 'Lora', serif; font-size: 2rem; font-weight: 600; color: var(--text-color); }
.table-container { background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--border-color); overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid var(--border-color); }
.data-table th { font-size: 0.8rem; font-weight: 600; color: #6c757d; text-transform: uppercase; background-color: #f8f9fa; }
.data-table td { font-size: 0.9rem; color: var(--text-color); }
.data-table tbody tr:last-child td { border-bottom: none; }
.loading-cell { text-align: center; padding: 2rem; color: #6c757d; }
.product-info-cell { display: flex; align-items: center; gap: 1rem; }
.product-thumbnail { width: 45px; height: 45px; border-radius: 8px; object-fit: cover; }
.action-buttons { display: flex; gap: 0.75rem; }
.action-btn { background: none; border: none; cursor: pointer; font-weight: 600; transition: color 0.3s; }
.edit-btn { color: #4361ee; }
.delete-btn { color: #c9184a; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: white; padding: 2.5rem; border-radius: 12px; width: 90%; max-width: 600px; }
.modal-title { font-family: 'Lora', serif; margin: 0 0 2rem 0; font-size: 1.75rem; }
.product-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 8px; font-family: 'Inter', sans-serif; }
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
.btn-cancel { padding: 0.75rem 1.5rem; border: 1px solid var(--border-color); border-radius: 8px; background-color: #f8f9fa; cursor: pointer; }
</style>
