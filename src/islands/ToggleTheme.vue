<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto transition-colors duration-200">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Selector de Tema</h2>
    <div class="flex items-center justify-between">
      <span class="text-gray-700 dark:text-gray-300">Modo Oscuro</span>
      <button
        @click="toggleTheme"
        :class="isDark ? 'bg-blue-600' : 'bg-gray-300'"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span
          :class="isDark ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
        ></span>
      </button>
    </div>
    <div class="mt-4 p-4 rounded-lg" :class="isDark ? 'bg-gray-700' : 'bg-gray-100'">
      <p :class="isDark ? 'text-white' : 'text-gray-800'" class="text-sm">
        {{ isDark ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>
