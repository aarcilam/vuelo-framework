<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
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
            <a href="/demo" class="text-blue-600 font-semibold hover:text-blue-800">Demo</a>
            <a href="/gallery" class="text-gray-700 hover:text-blue-600 transition">Galería</a>
            <a href="/contact" class="text-gray-700 hover:text-blue-600 transition">Contacto</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Demostración de Islas Interactivas
        </h1>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto">
          Explora diferentes formas de hidratación de componentes. Cada isla se activa con diferentes eventos.
        </p>
      </div>

      <!-- Sección: Hidratación en Load -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Hidratación Automática (Evento: load)
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Estos componentes se hidratan automáticamente cuando la página carga.
        </p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Contador</h3>
            <Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Selector de Tema</h3>
            <ToggleTheme data-hydrate="ToggleTheme" data-hydrate-event="load"></ToggleTheme>
          </div>
        </div>
      </div>

      <!-- Sección: Hidratación en Click -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Hidratación al Hacer Click (Evento: click)
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Haz click en estos componentes para activarlos y verlos en acción.
        </p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Lista de Tareas</h3>
            <TodoList data-hydrate="TodoList" data-hydrate-event="click"></TodoList>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Tarjeta de Producto</h3>
            <ProductCard
              data-hydrate="ProductCard"
              data-hydrate-event="click"
            ></ProductCard>
          </div>
        </div>
      </div>

      <!-- Sección: Hidratación en Mouseover -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Hidratación al Pasar el Mouse (Evento: mouseover)
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Pasa el mouse sobre estos componentes para activarlos.
        </p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Carrusel de Imágenes</h3>
            <ImageCarousel data-hydrate="ImageCarousel" data-hydrate-event="mouseover"></ImageCarousel>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Contador Alternativo</h3>
            <Counter data-hydrate="Counter" data-hydrate-event="mouseover"></Counter>
          </div>
        </div>
      </div>

      <!-- Sección: Componentes Estáticos -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Componentes Estáticos (Sin Hidratación)
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Estos componentes se renderizan en el servidor y no tienen interactividad del cliente.
        </p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Contador Estático</h3>
            <Counter></Counter>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Lista de Tareas Estática</h3>
            <TodoList></TodoList>
          </div>
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
import Counter from '../islands/counter.vue';
import TodoList from '../islands/TodoList.vue';
import ToggleTheme from '../islands/ToggleTheme.vue';
import ImageCarousel from '../islands/ImageCarousel.vue';
import ProductCard from '../islands/ProductCard.vue';
</script>

<style>
</style>
