<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Lista de Tareas</h2>
    <div class="flex gap-2 mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Nueva tarea..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="addTodo"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Agregar
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
      >
        <span
          :class="{ 'line-through text-gray-500': todo.completed }"
          class="flex-1"
        >
          {{ todo.text }}
        </span>
        <div class="flex gap-2">
          <button
            @click="toggleTodo(index)"
            :class="todo.completed ? 'bg-green-600' : 'bg-gray-400'"
            class="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition"
          >
            {{ todo.completed ? '✓' : '○' }}
          </button>
          <button
            @click="removeTodo(index)"
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
          >
            ✕
          </button>
        </div>
      </li>
    </ul>
    <p v-if="todos.length === 0" class="text-gray-500 text-center py-4">
      No hay tareas. ¡Agrega una nueva!
    </p>
    <p class="text-sm text-gray-600 mt-4">
      Total: {{ todos.length }} | Completadas: {{ completedCount }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const todos = ref([
  { text: 'Aprender Vuelo Framework', completed: false },
  { text: 'Crear una aplicación increíble', completed: false },
]);

const newTodo = ref('');

const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length;
});

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value.trim(), completed: false });
    newTodo.value = '';
  }
};

const toggleTodo = (index) => {
  todos.value[index].completed = !todos.value[index].completed;
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};
</script>
