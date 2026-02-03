<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Galería de Imágenes</h2>
    <div class="relative">
      <div class="overflow-hidden rounded-lg">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="min-w-full"
          >
            <img
              :src="image.url"
              :alt="image.alt"
              class="w-full h-64 object-cover"
            />
            <p class="text-center mt-2 text-gray-700">{{ image.title }}</p>
          </div>
        </div>
      </div>
      <button
        @click="previous"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
      >
        ‹
      </button>
      <button
        @click="next"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
      >
        ›
      </button>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        :class="currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'"
        class="w-3 h-3 rounded-full transition"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    alt: 'Montañas',
    title: 'Hermosas Montañas'
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
    alt: 'Océano',
    title: 'Océano Azul'
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    alt: 'Bosque',
    title: 'Bosque Verde'
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    alt: 'Aurora',
    title: 'Aurora Boreal'
  }
]);

const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const previous = () => {
  currentIndex.value = currentIndex.value === 0 ? images.value.length - 1 : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};
</script>
