<template>
    <div class="flex flex-col items-center justify-center bg-green-50 p-6">
        <p class="text-2xl font-semibold text-green-700 mb-4">Contador: <span class="font-bold text-green-900">{{ count
                }}</span></p>
        <button @click="increment"
            class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-200">
            Incrementar
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0 // Definimos el estado aquí
        }
    },
    methods: {
        increment() {
            this.count++; // Método para incrementar el contador
        }
    }
}
</script>