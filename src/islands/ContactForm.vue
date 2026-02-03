<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Formulario de Contacto</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          v-model="form.message"
          required
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tu mensaje..."
        ></textarea>
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
      </button>
    </form>
    <div v-if="submitted" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
      <p class="font-semibold">¡Mensaje enviado exitosamente!</p>
      <p class="text-sm mt-1">Gracias por contactarnos, {{ form.name }}.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  // Simular envío
  await new Promise(resolve => setTimeout(resolve, 1000));
  isSubmitting.value = false;
  submitted.value = true;
  
  // Resetear formulario después de 3 segundos
  setTimeout(() => {
    form.value = { name: '', email: '', message: '' };
    submitted.value = false;
  }, 3000);
};
</script>
