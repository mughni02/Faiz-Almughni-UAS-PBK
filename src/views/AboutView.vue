<template>
  <div class="about-page">
    <div class="page-container">
      <div class="header-section">
        <h1 class="main-title">Tentang ZaitunOrganic</h1>
        <p class="main-subtitle">Lahir dari sebuah mimpi sederhana: menyediakan akses mudah terhadap produk-produk alami dan organik yang menyehatkan bagi masyarakat Indonesia.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <h3 class="feature-title">Misi Kami</h3>
          <p class="feature-description">Misi kami adalah untuk menyeleksi dan menghadirkan produk organik terbaik dari para petani dan produsen lokal yang berkomitmen pada praktik pertanian berkelanjutan dan ramah lingkungan.</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-title">Kualitas Terjamin</h3>
          <p class="feature-description">Setiap produk yang kami tawarkan telah melalui proses kurasi yang ketat untuk memastikan kualitas, keaslian, dan manfaat terbaik bagi kesehatan Anda dan keluarga.</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-title">Komitmen pada Alam</h3>
          <p class="feature-description">Kami percaya bahwa apa yang baik untuk alam juga baik untuk kita. Oleh karena itu, kami mendukung penuh metode organik yang menjaga kesuburan tanah dan keseimbangan ekosistem.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  background-color: #ffffff;
  padding: 4rem 2rem;
}

.page-container {
  max-width: 1024px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.main-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background-color: #f9fafb;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4CAF50;
  margin: 0 0 1rem 0;
}

.feature-description {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin: 0;
}
</style>
