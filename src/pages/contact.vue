<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
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
            <a href="/gallery" class="text-gray-700 hover:text-blue-600 transition">Galería</a>
            <a href="/contact" class="text-blue-600 font-semibold hover:text-blue-800">Contacto</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Contáctanos
        </h1>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto">
          ¿Tienes preguntas? ¿Quieres saber más sobre Vuelo Framework? Estamos aquí para ayudarte.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <!-- Formulario de Contacto -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
          <ContactForm data-hydrate="ContactForm" data-hydrate-event="load"></ContactForm>
        </div>

        <!-- Información de Contacto -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
          <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div class="flex items-start">
              <div class="text-3xl mr-4">📧</div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-1">Email</h3>
                <p class="text-gray-600">contacto@vueloframework.com</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="text-3xl mr-4">💬</div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-1">Discord</h3>
                <p class="text-gray-600">Únete a nuestra comunidad</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="text-3xl mr-4">🐙</div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-1">GitHub</h3>
                <p class="text-gray-600">github.com/vueloframework</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="text-3xl mr-4">📚</div>
              <div>
                <h3 class="font-semibold text-gray-800 mb-1">Documentación</h3>
                <p class="text-gray-600">docs.vueloframework.com</p>
              </div>
            </div>
          </div>

          <!-- Formulario Alternativo con Click -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Formulario Alternativo (Hidratación en Click)
            </h3>
            <ContactForm data-hydrate="ContactForm" data-hydrate-event="click"></ContactForm>
          </div>
        </div>
      </div>

      <!-- Sección de Redes Sociales -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Síguenos en Redes Sociales</h2>
        <div class="flex justify-center gap-6">
          <a href="#" class="text-4xl hover:scale-110 transition-transform">🐦</a>
          <a href="#" class="text-4xl hover:scale-110 transition-transform">📷</a>
          <a href="#" class="text-4xl hover:scale-110 transition-transform">💼</a>
          <a href="#" class="text-4xl hover:scale-110 transition-transform">📺</a>
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
import ContactForm from '../islands/ContactForm.vue';
</script>

<style>
</style>
