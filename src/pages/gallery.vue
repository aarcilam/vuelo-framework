<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
    <!-- Navegación -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-blue-600">✈️ Vuelo Framework</a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="/" class="text-gray-700 hover:text-blue-600 transition">Inicio</a>
            <a href="/features" class="text-gray-700 hover:text-blue-600 transition">Características</a>
            <a href="/demo" class="text-gray-700 hover:text-blue-600 transition">Demo</a>
            <a href="/gallery" class="text-blue-600 font-semibold hover:text-blue-800">Galería</a>
            <a href="/contact" class="text-gray-700 hover:text-blue-600 transition">Contacto</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Galería Interactiva
        </h1>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto">
          Explora nuestra galería de imágenes con un carrusel interactivo que se hidrata bajo demanda.
        </p>
      </div>

      <!-- Carrusel Principal -->
      <div class="mb-16">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Carrusel de Imágenes (Hidratación en Click)
          </h2>
          <ImageCarousel data-hydrate="ImageCarousel" data-hydrate-event="click"></ImageCarousel>
        </div>
      </div>

      <!-- Grid de Productos -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
          Productos Destacados
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <ProductCard
              data-hydrate="ProductCard"
              data-hydrate-event="mouseover"
            ></ProductCard>
          </div>
          <div>
            <ProductCard
              data-hydrate="ProductCard"
              data-hydrate-event="mouseover"
            ></ProductCard>
          </div>
          <div>
            <ProductCard
              data-hydrate="ProductCard"
              data-hydrate-event="mouseover"
            ></ProductCard>
          </div>
        </div>
      </div>

      <!-- Carrusel Alternativo -->
      <div class="mb-16">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Más Imágenes (Hidratación en Load)
          </h2>
          <ImageCarousel data-hydrate="ImageCarousel" data-hydrate-event="load"></ImageCarousel>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400">
          © 2024 Vuelo Framework. Hecho con ❤️ usando Vue y Bun.
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import ImageCarousel from '../islands/ImageCarousel.vue';
import ProductCard from '../islands/ProductCard.vue';
</script>

<style>
</style>
