<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
    <!-- Navegación -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-blue-600">✈️ Vuelo Framework</a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="/" class="text-gray-700 hover:text-blue-600 transition">Inicio</a>
            <a href="/features" class="text-blue-600 font-semibold hover:text-blue-800">Características</a>
            <a href="/demo" class="text-gray-700 hover:text-blue-600 transition">Demo</a>
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
          Características de Vuelo Framework
        </h1>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto">
          Descubre todas las características que hacen de Vuelo el framework perfecto para tus proyectos.
        </p>
      </div>

      <!-- Grid de Características -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Rendimiento Excepcional</h3>
          <p class="text-gray-600">
            Construido sobre Bun, uno de los runtimes más rápidos de JavaScript. Tu aplicación volará.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">⚛️</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Vue 3 Power</h3>
          <p class="text-gray-600">
            Aprovecha toda la reactividad y el sistema de componentes de Vue 3.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🏝️</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Arquitectura de Islas</h3>
          <p class="text-gray-600">
            Hidrata solo los componentes que necesitas, cuando los necesitas. Optimización automática.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">📁</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Routing Automático</h3>
          <p class="text-gray-600">
            Coloca archivos en la carpeta pages y obtén rutas automáticamente. Sin configuración.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
          <p class="text-gray-600">
            Estiliza tu aplicación con Tailwind CSS integrado. Diseño rápido y moderno.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">SSR por Defecto</h3>
          <p class="text-gray-600">
            Server-Side Rendering desde el primer momento. Páginas estáticas y rápidas.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🔧</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">TypeScript Ready</h3>
          <p class="text-gray-600">
            Soporte completo para TypeScript. Tipado fuerte y autocompletado inteligente.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">📦</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Zero Config</h3>
          <p class="text-gray-600">
            Empieza a desarrollar inmediatamente. Sin configuración compleja ni archivos de setup.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🔥</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Hot Reload</h3>
          <p class="text-gray-600">
            Desarrollo con recarga en caliente. Ve tus cambios instantáneamente.
          </p>
        </div>
      </div>
    </section>

    <!-- Sección de Demo Interactiva -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">
        Prueba las Islas en Acción
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Contador Interactivo</h3>
          <Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Lista de Tareas</h3>
          <TodoList data-hydrate="TodoList" data-hydrate-event="click"></TodoList>
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
</script>

<style>
</style>
