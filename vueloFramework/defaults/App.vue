<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h1 class="text-4xl font-bold text-green-600 mb-4">Bienvenido a Vuelo Framework</h1>
    <p class="text-lg text-gray-700 mb-6">{{ message }}</p>
    <RouteView class="w-full max-w-4xl bg-white shadow-md rounded-lg p-6"></RouteView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const message = ref("Message from setup");
</script>

<style scoped>
</style>
