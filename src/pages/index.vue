<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navegación -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">✈️ Vuelo Framework</h1>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="/" class="text-blue-600 font-semibold hover:text-blue-800">Inicio</a>
            <a href="/features" class="text-gray-700 hover:text-blue-600 transition">Características</a>
            <a href="/demo" class="text-gray-700 hover:text-blue-600 transition">Demo</a>
            <a href="/gallery" class="text-gray-700 hover:text-blue-600 transition">Galería</a>
            <a href="/contact" class="text-gray-700 hover:text-blue-600 transition">Contacto</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Bienvenido a <span class="text-blue-600">Vuelo Framework</span>
        </h1>
        <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Un framework ágil y ligero que combina la magia de Vue con la velocidad impresionante de Bun.
          Despega hacia el éxito con cada componente.
        </p>
        <div class="flex gap-4 justify-center">
          <a
            href="/demo"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg"
          >
            Ver Demo
          </a>
          <a
            href="/features"
            class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200 shadow-lg border-2 border-blue-600"
          >
            Características
          </a>
        </div>
      </div>
    </section>

    <!-- Sección de Islas Interactivas -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Islas Interactivas
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Contador con hidratación en load -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Contador (Load)</h3>
          <Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
        </div>

        <!-- Todo List con hidratación en click -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Todo List (Click)</h3>
          <TodoList data-hydrate="TodoList" data-hydrate-event="click"></TodoList>
        </div>

        <!-- Toggle Theme con hidratación en mouseover -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Toggle Theme (Mouseover)</h3>
          <ToggleTheme data-hydrate="ToggleTheme" data-hydrate-event="mouseover"></ToggleTheme>
        </div>
      </div>
    </section>

    <!-- Sección de Características Rápidas -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué Vuelo?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Velocidad Extrema</h3>
            <p class="text-gray-600">
              El servidor de Bun es rápido como un rayo, manejando miles de solicitudes por segundo.
            </p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Simplicidad</h3>
            <p class="text-gray-600">
              Combina lo mejor de Vue y Bun, permitiéndote enfocarte en construir algo increíble.
            </p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🏝️</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Islas Interactivas</h3>
            <p class="text-gray-600">
              Componentes que se hidratan bajo demanda, optimizando el rendimiento.
            </p>
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
</script>

<style>
</style>
