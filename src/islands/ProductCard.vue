<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto hover:shadow-xl transition-shadow duration-200">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
        <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
      </div>
      <div class="flex gap-2">
        <button
          @click="decrementQuantity"
          :disabled="quantity === 0"
          class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span class="flex-1 text-center py-2 font-semibold">{{ quantity }}</span>
        <button
          @click="incrementQuantity"
          :disabled="quantity >= product.stock"
          class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
      <button
        @click="addToCart"
        :disabled="quantity === 0"
        class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Agregar al Carrito
      </button>
      <div v-if="added" class="mt-2 text-center text-green-600 text-sm font-semibold">
        ✓ Agregado al carrito
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      name: 'Producto Ejemplo',
      description: 'Descripción del producto',
      price: 99.99,
      stock: 10,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    })
  }
});

const quantity = ref(0);
const added = ref(false);

const incrementQuantity = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (quantity.value > 0) {
    added.value = true;
    setTimeout(() => {
      added.value = false;
      quantity.value = 0;
    }, 2000);
  }
};
</script>
